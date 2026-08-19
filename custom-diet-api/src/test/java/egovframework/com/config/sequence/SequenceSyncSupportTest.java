package egovframework.com.config.sequence;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class SequenceSyncSupportTest {

    @Test
    void shouldAdvanceWhenSequenceIsBehindMaxValue() {
        assertTrue(SequenceSyncSupport.shouldAdvance(15L, 10L, true));
    }

    @Test
    void shouldAdvanceWhenLastValueMatchesButSequenceWasNeverCalled() {
        assertTrue(SequenceSyncSupport.shouldAdvance(15L, 15L, false));
    }

    @Test
    void shouldNotAdvanceWhenSequenceAlreadyAhead() {
        assertFalse(SequenceSyncSupport.shouldAdvance(15L, 20L, true));
    }

    @Test
    void shouldRejectUnsafeIdentifier() {
        assertThrows(IllegalArgumentException.class,
                () -> SequenceSyncSupport.quoteIdentifier("mst_mat;drop table mst_mat"));
    }

    @Test
    void shouldQuoteQualifiedIdentifier() {
        assertEquals("\"public\".\"mat_cd_seq\"", SequenceSyncSupport.qualifiedName("public", "mat_cd_seq"));
    }
}
