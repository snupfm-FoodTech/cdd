package egovframework.com.config.sequence;

import java.util.regex.Pattern;

final class SequenceSyncSupport {

    private static final Pattern IDENTIFIER_PATTERN = Pattern.compile("[A-Za-z_][A-Za-z0-9_]*");

    private SequenceSyncSupport() {
    }

    static boolean shouldAdvance(long maxValue, long lastValue, boolean isCalled) {
        if (maxValue <= 0) {
            return false;
        }

        return lastValue < maxValue || (lastValue == maxValue && !isCalled);
    }

    static String quoteIdentifier(String identifier) {
        if (identifier == null || !IDENTIFIER_PATTERN.matcher(identifier).matches()) {
            throw new IllegalArgumentException("Unsafe SQL identifier: " + identifier);
        }

        return "\"" + identifier + "\"";
    }

    static String qualifiedName(String schema, String objectName) {
        return quoteIdentifier(schema) + "." + quoteIdentifier(objectName);
    }

    static String quoteLiteral(String literal) {
        return "'" + literal.replace("'", "''") + "'";
    }
}
