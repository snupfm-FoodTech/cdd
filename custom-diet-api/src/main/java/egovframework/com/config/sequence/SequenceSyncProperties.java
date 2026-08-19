package egovframework.com.config.sequence;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app.sequence-sync")
public class SequenceSyncProperties {

    private boolean enabled;

    private boolean includeAutoDiscovered = true;

    private boolean auditCoverage = true;

    private boolean failOnUncovered = false;

    private String schema = "public";

    private List<ManualTarget> manualTargets = new ArrayList<>();

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public boolean isIncludeAutoDiscovered() {
        return includeAutoDiscovered;
    }

    public void setIncludeAutoDiscovered(boolean includeAutoDiscovered) {
        this.includeAutoDiscovered = includeAutoDiscovered;
    }

    public String getSchema() {
        return schema;
    }

    public void setSchema(String schema) {
        this.schema = schema;
    }

    public boolean isAuditCoverage() {
        return auditCoverage;
    }

    public void setAuditCoverage(boolean auditCoverage) {
        this.auditCoverage = auditCoverage;
    }

    public boolean isFailOnUncovered() {
        return failOnUncovered;
    }

    public void setFailOnUncovered(boolean failOnUncovered) {
        this.failOnUncovered = failOnUncovered;
    }

    public List<ManualTarget> getManualTargets() {
        return manualTargets;
    }

    public void setManualTargets(List<ManualTarget> manualTargets) {
        this.manualTargets = manualTargets;
    }

    public static class ManualTarget {

        private String schema = "public";

        private String table;

        private String column;

        private String sequence;

        private String prefix;

        public String getSchema() {
            return schema;
        }

        public void setSchema(String schema) {
            this.schema = schema;
        }

        public String getTable() {
            return table;
        }

        public void setTable(String table) {
            this.table = table;
        }

        public String getColumn() {
            return column;
        }

        public void setColumn(String column) {
            this.column = column;
        }

        public String getSequence() {
            return sequence;
        }

        public void setSequence(String sequence) {
            this.sequence = sequence;
        }

        public String getPrefix() {
            return prefix;
        }

        public void setPrefix(String prefix) {
            this.prefix = prefix;
        }
    }
}
