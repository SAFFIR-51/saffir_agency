-- GEO 진단 기록 (고객 포털 'GEO', 어드민 'GEO').
-- 진단은 사피어가 하고 결과를 어드민에서 입력한다. 계정 하나에 사이트 하나.
CREATE TABLE IF NOT EXISTS geo_sites (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER      NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  site_url    VARCHAR(300) NOT NULL,
  plan        VARCHAR(20)  NOT NULL DEFAULT 'free',   -- free(무료 진단) | pro(GEO 구독)
  created_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- 진단 한 번. 영역별 점수·개선 우선순위·AI 노출(구독)은 JSON
CREATE TABLE IF NOT EXISTS geo_diagnoses (
  id          SERIAL PRIMARY KEY,
  site_id     INTEGER     NOT NULL REFERENCES geo_sites(id) ON DELETE CASCADE,
  date        VARCHAR(20) NOT NULL,                 -- YYYY-MM-DD
  score       INTEGER     NOT NULL,
  areas       JSON        NOT NULL DEFAULT '[]',    -- [{ name, score }]
  priorities  JSON        NOT NULL DEFAULT '[]',    -- [string]
  visibility  JSON,                                 -- [{ ai, appeared, asked }] 구독 고객만
  created_at  TIMESTAMP   NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS geo_diagnoses_site_idx ON geo_diagnoses(site_id, date);

-- 의료광고 문구 점검
CREATE TABLE IF NOT EXISTS geo_ad_checks (
  id          SERIAL PRIMARY KEY,
  site_id     INTEGER      NOT NULL REFERENCES geo_sites(id) ON DELETE CASCADE,
  date        VARCHAR(20)  NOT NULL,
  summary     VARCHAR(300) NOT NULL,
  risks       INTEGER      NOT NULL DEFAULT 0,
  created_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);
