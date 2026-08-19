package egovframework.com.config.sequence;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
@ConditionalOnProperty(prefix = "app.sequence-sync", name = "enabled", havingValue = "true")
public class PostgreSqlSequenceSynchronizer implements ApplicationRunner {

    private static final Logger log = LoggerFactory.getLogger(PostgreSqlSequenceSynchronizer.class);

    private static final String AUTO_DISCOVERY_SQL = """
            SELECT
                tbl_ns.nspname AS table_schema,
                tbl.relname AS table_name,
                col.attname AS column_name,
                seq_ns.nspname AS sequence_schema,
                seq.relname AS sequence_name
            FROM pg_class seq
            INNER JOIN pg_depend dep ON dep.objid = seq.oid
                AND dep.deptype IN ('a', 'i')
            INNER JOIN pg_class tbl ON tbl.oid = dep.refobjid
                AND tbl.relkind IN ('r', 'p')
            INNER JOIN pg_namespace tbl_ns ON tbl_ns.oid = tbl.relnamespace
            INNER JOIN pg_attribute col ON col.attrelid = tbl.oid
                AND col.attnum = dep.refobjsubid
                AND NOT col.attisdropped
            INNER JOIN pg_namespace seq_ns ON seq_ns.oid = seq.relnamespace
            WHERE seq.relkind = 'S'
                AND tbl_ns.nspname = ?
            ORDER BY tbl_ns.nspname, tbl.relname, col.attnum
            """;

    private static final String ALL_SEQUENCES_SQL = """
            SELECT
                seq_ns.nspname AS sequence_schema,
                seq.relname AS sequence_name
            FROM pg_class seq
            INNER JOIN pg_namespace seq_ns ON seq_ns.oid = seq.relnamespace
            WHERE seq.relkind = 'S'
                AND seq_ns.nspname = ?
            ORDER BY seq_ns.nspname, seq.relname
            """;

    private final JdbcTemplate jdbcTemplate;
    private final SequenceSyncProperties properties;

    @Value("${Globals.DbType:}")
    private String dbType;

    public PostgreSqlSequenceSynchronizer(JdbcTemplate jdbcTemplate, SequenceSyncProperties properties) {
        this.jdbcTemplate = jdbcTemplate;
        this.properties = properties;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (!"postgresql".equalsIgnoreCase(dbType)) {
            log.info("Sequence sync skipped because Globals.DbType is [{}].", dbType);
            return;
        }

        List<SequenceTarget> targets = resolveTargets();
        if (targets.isEmpty()) {
            log.info("Sequence sync enabled but no targets were resolved.");
            return;
        }

        log.info("Resolved sequence targets. total={}, auto={}, manual={}.",
                new Object[]{
                        targets.size(),
                        targets.stream().filter(target -> "auto".equals(target.source())).count(),
                        targets.stream().filter(target -> "manual".equals(target.source())).count()
                });

        if (properties.isAuditCoverage()) {
            auditCoverage(targets);
        }

        int advancedCount = 0;
        int unchangedCount = 0;

        for (SequenceTarget target : targets) {
            SyncResult result = synchronize(target);
            if (result.advanced()) {
                advancedCount++;
                log.warn(
                        "Advanced sequence [{}] for {}.{}.{}, maxValue={}, previousLastValue={}, wasCalled={}.",
                        new Object[]{
                                target.sequenceQualifiedName(),
                                target.tableSchema(),
                                target.tableName(),
                                target.columnName(),
                                result.maxValue(),
                                result.lastValue(),
                                result.isCalled()
                        });
            } else {
                unchangedCount++;
                log.info(
                        "Sequence [{}] already aligned for {}.{}.{}, maxValue={}, lastValue={}, isCalled={}.",
                        new Object[]{
                                target.sequenceQualifiedName(),
                                target.tableSchema(),
                                target.tableName(),
                                target.columnName(),
                                result.maxValue(),
                                result.lastValue(),
                                result.isCalled()
                        });
            }
        }

        log.info("Sequence sync finished. targets={}, advanced={}, unchanged={}.",
                new Object[]{targets.size(), advancedCount, unchangedCount});
    }

    List<SequenceTarget> resolveTargets() {
        Map<String, SequenceTarget> mergedTargets = new LinkedHashMap<>();

        if (properties.isIncludeAutoDiscovered()) {
            for (SequenceTarget target : discoverAutoTargets()) {
                mergedTargets.put(target.key(), target);
            }
        }

        for (SequenceSyncProperties.ManualTarget manualTarget : properties.getManualTargets()) {
            SequenceTarget target = toManualTarget(manualTarget);
            mergedTargets.put(target.key(), target);
        }

        return List.copyOf(mergedTargets.values());
    }

    List<SequenceTarget> discoverAutoTargets() {
        String schema = defaultSchema(properties.getSchema());

        return jdbcTemplate.query(AUTO_DISCOVERY_SQL,
                new Object[]{schema},
                (rs, rowNum) -> new SequenceTarget(
                        rs.getString("table_schema"),
                        rs.getString("table_name"),
                        rs.getString("column_name"),
                        rs.getString("sequence_schema"),
                        rs.getString("sequence_name"),
                        null,
                        "auto"));
    }

    List<SequenceRef> listAllSequences() {
        String schema = defaultSchema(properties.getSchema());

        return jdbcTemplate.query(ALL_SEQUENCES_SQL,
                new Object[]{schema},
                (rs, rowNum) -> new SequenceRef(
                        rs.getString("sequence_schema"),
                        rs.getString("sequence_name")));
    }

    SequenceTarget toManualTarget(SequenceSyncProperties.ManualTarget manualTarget) {
        String table = requireText(manualTarget.getTable(), "app.sequence-sync.manual-targets[].table");
        String column = requireText(manualTarget.getColumn(), "app.sequence-sync.manual-targets[].column");
        String sequence = requireText(manualTarget.getSequence(), "app.sequence-sync.manual-targets[].sequence");

        return new SequenceTarget(
                defaultSchema(manualTarget.getSchema()),
                table,
                column,
                defaultSchema(manualTarget.getSchema()),
                sequence,
                normalizePrefix(manualTarget.getPrefix()),
                "manual");
    }

    SyncResult synchronize(SequenceTarget target) {
        long maxValue = findMaxValue(target);
        SequenceState state = readSequenceState(target);

        if (SequenceSyncSupport.shouldAdvance(maxValue, state.lastValue(), state.isCalled())) {
            setSequenceValue(target, maxValue);
            return new SyncResult(true, maxValue, state.lastValue(), state.isCalled());
        }

        return new SyncResult(false, maxValue, state.lastValue(), state.isCalled());
    }

    long findMaxValue(SequenceTarget target) {
        String qualifiedTableName = SequenceSyncSupport.qualifiedName(target.tableSchema(), target.tableName());
        String quotedColumn = SequenceSyncSupport.quoteIdentifier(target.columnName());

        if (!StringUtils.hasText(target.prefix())) {
            Long maxValue = (Long) jdbcTemplate.queryForObject(
                    "SELECT COALESCE(MAX(CAST(" + quotedColumn + " AS BIGINT)), 0) FROM " + qualifiedTableName,
                    Long.class);
            return Objects.requireNonNullElse(maxValue, 0L);
        }

        int startIndex = target.prefix().length() + 1;
        Long maxValue = (Long) jdbcTemplate.queryForObject("""
                SELECT COALESCE(MAX(
                    CASE
                        WHEN %s IS NULL THEN NULL
                        WHEN LEFT(%s, ?) = ?
                            AND SUBSTRING(%s FROM ?) ~ '^[0-9]+$'
                        THEN CAST(SUBSTRING(%s FROM ?) AS BIGINT)
                        ELSE NULL
                    END
                ), 0)
                FROM %s
                """.formatted(quotedColumn, quotedColumn, quotedColumn, quotedColumn, qualifiedTableName),
                new Object[]{
                        target.prefix().length(),
                        target.prefix(),
                        startIndex,
                        startIndex
                },
                Long.class);

        return Objects.requireNonNullElse(maxValue, 0L);
    }

    SequenceState readSequenceState(SequenceTarget target) {
        Map<String, Object> state = jdbcTemplate.queryForMap(
                "SELECT last_value, is_called FROM "
                        + SequenceSyncSupport.qualifiedName(target.sequenceSchema(), target.sequenceName()));

        long lastValue = ((Number) state.get("last_value")).longValue();
        boolean isCalled = (Boolean) state.get("is_called");
        return new SequenceState(lastValue, isCalled);
    }

    void setSequenceValue(SequenceTarget target, long value) {
        String regclassLiteral = target.sequenceQualifiedName();
        jdbcTemplate.queryForObject(
                "SELECT setval(" + SequenceSyncSupport.quoteLiteral(regclassLiteral) + "::regclass, ?, true)",
                new Object[]{value},
                Long.class);
    }

    void auditCoverage(List<SequenceTarget> targets) {
        List<SequenceRef> allSequences = listAllSequences();
        Set<String> coveredSequenceNames = targets.stream()
                .map(SequenceTarget::sequenceQualifiedName)
                .map(name -> name.toLowerCase(Locale.ROOT))
                .collect(Collectors.toSet());

        List<String> uncoveredSequences = allSequences.stream()
                .map(SequenceRef::qualifiedName)
                .filter(name -> !coveredSequenceNames.contains(name.toLowerCase(Locale.ROOT)))
                .toList();

        log.info("Sequence coverage audit. schema={}, totalSequences={}, coveredSequences={}, uncoveredSequences={}.",
                new Object[]{
                        defaultSchema(properties.getSchema()),
                        allSequences.size(),
                        coveredSequenceNames.size(),
                        uncoveredSequences.size()
                });

        if (uncoveredSequences.isEmpty()) {
            return;
        }

        if (properties.isFailOnUncovered()) {
            throw new IllegalStateException("Uncovered sequences detected: " + uncoveredSequences);
        }

        log.warn("Uncovered sequences detected: {}", uncoveredSequences.toArray(new Object[0]));
    }

    private String defaultSchema(String schema) {
        return StringUtils.hasText(schema) ? schema.trim() : "public";
    }

    private String normalizePrefix(String prefix) {
        return StringUtils.hasText(prefix) ? prefix.trim() : null;
    }

    private String requireText(String value, String propertyName) {
        if (!StringUtils.hasText(value)) {
            throw new IllegalStateException(propertyName + " must not be blank when sequence sync is enabled.");
        }

        return value.trim();
    }

    record SequenceTarget(
            String tableSchema,
            String tableName,
            String columnName,
            String sequenceSchema,
            String sequenceName,
            String prefix,
            String source) {

        String key() {
            return (tableSchema + "." + tableName + "." + columnName).toLowerCase(Locale.ROOT);
        }

        String sequenceQualifiedName() {
            return sequenceSchema + "." + sequenceName;
        }
    }

    record SequenceRef(String sequenceSchema, String sequenceName) {

        String qualifiedName() {
            return sequenceSchema + "." + sequenceName;
        }
    }

    record SequenceState(long lastValue, boolean isCalled) {
    }

    record SyncResult(boolean advanced, long maxValue, long lastValue, boolean isCalled) {
    }
}
