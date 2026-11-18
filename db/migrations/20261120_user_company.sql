-- 포털 '계정'의 회사·병원 정보 (세금계산서·청구서에 쓰임). 고객이 직접 고친다
ALTER TABLE users ADD COLUMN IF NOT EXISTS business_number VARCHAR(20);   -- 사업자등록번호 000-00-00000
ALTER TABLE users ADD COLUMN IF NOT EXISTS tax_email       VARCHAR(200);  -- 세금계산서 받을 이메일
