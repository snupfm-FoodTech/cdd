Task statement
- Connect to the live PostgreSQL database using the provided read-only account.
- Identify all existing sequences and classify how each is used.
- Design and apply a safer startup validation/update strategy for sequences.

Desired outcome
- Evidence-backed inventory of live DB sequences.
- Clear classification: auto-discovered, manual/trigger-based, or unmanaged.
- Code updated to match the live DB reality.

Known facts/evidence
- Repository DDL defines one trigger-based custom sequence: mst_mat.mat_cd -> mat_cd_seq.
- Current implementation auto-discovers owned PostgreSQL sequences and manually registers mst_mat.mat_cd.
- User reports the live DB currently has 20 sequences.

Constraints
- Team mode requested via $team.
- Current shell environment does not have tmux installed.
- Provided DB credentials are read-only.

Unknowns/open questions
- Which of the 20 live sequences are owned by columns and which are standalone?
- Whether there are trigger/function-based sequence usages beyond mst_mat.
- Whether the current implementation under-covers live DB usage.

Likely codebase touchpoints
- src/main/java/egovframework/com/config/sequence/
- src/main/resources/application.properties
- DATABASE/*.sql
