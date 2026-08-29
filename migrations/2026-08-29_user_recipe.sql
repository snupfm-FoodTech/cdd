-- 사용자 레시피 생성 기능 (2026-08-29)
--
-- 기존에는 usr_fd_mgmt 가 "마스터 음식의 이름/조리법 덮어쓰기" 기록만 담당했고,
-- 사용자가 재료를 직접 구성한 새 음식을 만들 방법이 없었다.
-- 사용자가 만든 음식은 mst_fd 에 들어가되 own_usr_id 로 소유자를 표시해,
-- 전체 레시피 목록/음식 검색/자동 추천 등 공용 경로에서는 제외한다.

BEGIN;

-- 1) 소유자 구분 컬럼 (NULL = 마스터 데이터, 값 있음 = 해당 사용자가 만든 레시피)
ALTER TABLE mst_fd ADD COLUMN IF NOT EXISTS own_usr_id INTEGER;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'mst_fd_own_usr_id_fkey'
    ) THEN
        ALTER TABLE mst_fd
            ADD CONSTRAINT mst_fd_own_usr_id_fkey
            FOREIGN KEY (own_usr_id) REFERENCES usr_mgmt(usr_id) ON DELETE CASCADE;
    END IF;
END
$$;

-- 공용 쿼리의 anti-join 대상이 되므로 소유된 행만 담는 부분 인덱스로 충분하다.
CREATE INDEX IF NOT EXISTS xie1mst_fd_own_usr_id
    ON mst_fd (own_usr_id)
    WHERE own_usr_id IS NOT NULL;

-- 2) 사용자 레시피 코드 자동 생성 (mst_mat.mat_cd 의 generate_mat_cd 패턴과 동일)
CREATE SEQUENCE IF NOT EXISTS usr_fd_cd_seq START 1;

CREATE OR REPLACE FUNCTION generate_usr_fd_cd() RETURNS trigger AS $$
BEGIN
    NEW.fd_cd := 'UF' || TO_CHAR(nextval('usr_fd_cd_seq'), 'FM00000000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_usr_fd_cd ON mst_fd;
CREATE TRIGGER set_usr_fd_cd
    BEFORE INSERT ON mst_fd
    FOR EACH ROW
    WHEN (new.fd_cd IS NULL)
    EXECUTE FUNCTION generate_usr_fd_cd();

COMMIT;
