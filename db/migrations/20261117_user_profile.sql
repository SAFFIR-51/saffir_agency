-- 회원가입 화면의 고객 유형·병원(회사)명·약관 동의·소식 수신 동의를 저장한다.
-- 반복 실행해도 안전 (IF NOT EXISTS)
ALTER TABLE users ADD COLUMN IF NOT EXISTS organization     VARCHAR(200);
ALTER TABLE users ADD COLUMN IF NOT EXISTS customer_type    VARCHAR(20);   -- 병원 | 기업
ALTER TABLE users ADD COLUMN IF NOT EXISTS terms_agreed_at  TIMESTAMP;     -- 이용약관·개인정보 동의 시각 (이메일 가입)
ALTER TABLE users ADD COLUMN IF NOT EXISTS marketing_opt_in BOOLEAN NOT NULL DEFAULT FALSE;
