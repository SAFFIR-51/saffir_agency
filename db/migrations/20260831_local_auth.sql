-- 로컬(아이디·비밀번호) 로그인 추가 (2026-08-31)
--
-- db/init.sh 는 빈 볼륨(최초 기동)에서만 실행되므로, 이미 데이터가 있는 서버에는
-- 이 파일을 직접 적용해야 한다.
--
--   docker exec -i saffir_web-db-1 psql -U saffir -d saffir < db/migrations/20260831_local_auth.sql
--
-- 반복 실행해도 안전하다 (IF NOT EXISTS).

ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS phone VARCHAR(30);

CREATE TABLE IF NOT EXISTS password_resets (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token       VARCHAR(64)  NOT NULL UNIQUE,
  expires_at  TIMESTAMP    NOT NULL,
  used_at     TIMESTAMP,
  created_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS password_resets_user_id_idx ON password_resets (user_id);
