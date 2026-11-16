-- 고객 포털 동료 초대. 초대 메일의 링크(/invite?token=)로 가입·로그인하면 그 고객사에 연결된다.
-- 링크는 7일, 한 번만, 초대받은 이메일로만 쓸 수 있다.
CREATE TABLE IF NOT EXISTS invites (
  id                SERIAL PRIMARY KEY,
  token             VARCHAR(64)  NOT NULL UNIQUE,
  client_org_id     INTEGER      NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  email             VARCHAR(200) NOT NULL,
  invited_by        VARCHAR(100) NOT NULL DEFAULT '',
  created_at        TIMESTAMP    NOT NULL DEFAULT NOW(),
  expires_at        TIMESTAMP    NOT NULL,
  accepted_at       TIMESTAMP,
  accepted_user_id  INTEGER      REFERENCES users(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS invites_client_idx ON invites(client_org_id);
