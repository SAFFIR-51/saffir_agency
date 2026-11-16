-- 문의·견적 요청을 어드민에서 관리한다.
-- 문의하기(contact)는 이메일을 받지 않으므로 email을 선택으로 바꾸고, 견적 요청(estimate) 항목과 처리 기록을 더한다.
-- status: new(새 문의) | replied(연락함) | closed(종료)  — 원래 어드민의 new/replied를 그대로 쓴다
ALTER TABLE inquiries ALTER COLUMN email DROP NOT NULL;
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS kind       VARCHAR(20)  NOT NULL DEFAULT 'contact';  -- contact | estimate
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS platforms  TEXT;          -- 견적: 플랫폼 (쉼표로)
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS readiness  VARCHAR(50);   -- 견적: 준비 상태
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS reference  TEXT;          -- 견적: 참고 사이트
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS assignee   VARCHAR(100);  -- 담당
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS memo       TEXT;          -- 내부 메모
ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP;
CREATE INDEX IF NOT EXISTS inquiries_received_idx ON inquiries(received_at DESC);
