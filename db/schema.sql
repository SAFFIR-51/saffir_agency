-- Saffir DB 초기 스키마
-- PostgreSQL이 빈 볼륨(신규 인스턴스)에서 시작할 때 자동 실행됩니다.
-- 기존 볼륨(데이터 있음) 또는 덤프 복원 시에는 실행되지 않습니다.

CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(200) NOT NULL UNIQUE,
  provider      VARCHAR(20)  NOT NULL,   -- 'local' | 'google' | 'kakao' | 'naver'
  password_hash TEXT,                    -- provider='local' 만 사용 (scrypt)
  phone         VARCHAR(30),             -- 아이디 찾기용
  role          VARCHAR(20)  NOT NULL DEFAULT 'client',
  joined_at     TIMESTAMP    NOT NULL DEFAULT NOW(),
  last_active   TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- 비밀번호 재설정 토큰 (1회용, 기본 1시간 만료)
CREATE TABLE IF NOT EXISTS password_resets (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token       VARCHAR(64)  NOT NULL UNIQUE,
  expires_at  TIMESTAMP    NOT NULL,
  used_at     TIMESTAMP,
  created_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS inquiries (
  id                  SERIAL PRIMARY KEY,
  name                VARCHAR(100) NOT NULL,
  email               VARCHAR(200) NOT NULL,
  phone               VARCHAR(30),
  company             VARCHAR(100),
  project_type        VARCHAR(50),
  budget              VARCHAR(50),
  target_date         VARCHAR(50),
  description         TEXT,
  meeting_preference  VARCHAR(50),
  attachment_url      TEXT,
  status              VARCHAR(20) NOT NULL DEFAULT 'new',
  received_at         TIMESTAMP   NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id           SERIAL PRIMARY KEY,
  name         VARCHAR(200) NOT NULL,
  client_id    INTEGER REFERENCES users(id),
  status       VARCHAR(20)  NOT NULL DEFAULT 'active',
  start_date   VARCHAR(20),
  target_date  VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS milestones (
  id          SERIAL PRIMARY KEY,
  project_id  INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  ord         INTEGER NOT NULL,
  title       VARCHAR(200) NOT NULL,
  date        VARCHAR(20),
  status      VARCHAR(20) NOT NULL DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS deliverables (
  id          SERIAL PRIMARY KEY,
  project_id  INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name        VARCHAR(200) NOT NULL,
  size        VARCHAR(50),
  type        VARCHAR(20)  NOT NULL,
  url         TEXT,
  date        VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS payments (
  id             SERIAL PRIMARY KEY,
  project_id     INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title          VARCHAR(200) NOT NULL,
  amount         INTEGER NOT NULL,
  date           VARCHAR(20),
  paid_at        TIMESTAMP,
  toss_order_id  VARCHAR(100) UNIQUE
);

CREATE TABLE IF NOT EXISTS works (
  id           SERIAL PRIMARY KEY,
  milestone_id INTEGER NOT NULL REFERENCES milestones(id) ON DELETE CASCADE,
  text         VARCHAR(500) NOT NULL,
  done         BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS invoices (
  id              SERIAL PRIMARY KEY,
  payment_id      INTEGER NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
  invoice_number  VARCHAR(50) NOT NULL UNIQUE,
  client_company  VARCHAR(200),
  client_contact  VARCHAR(100),
  notes           TEXT,
  bank_info       TEXT,
  issued_at       TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payment_links (
  id              SERIAL PRIMARY KEY,
  token           VARCHAR(64)  NOT NULL UNIQUE,
  invoice_number  VARCHAR(50)  NOT NULL,
  client_company  VARCHAR(200),
  client_contact  VARCHAR(100),
  items           JSON         NOT NULL,
  notes           TEXT,
  bank_info       TEXT,
  amount          INTEGER      NOT NULL,
  toss_order_id   VARCHAR(100) UNIQUE,
  paid_at         TIMESTAMP,
  created_at      TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS invoice_items (
  id          SERIAL PRIMARY KEY,
  invoice_id  INTEGER NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  name        VARCHAR(200) NOT NULL,
  quantity    INTEGER      NOT NULL,
  unit_price  NUMERIC(12, 2) NOT NULL
);

-- 공개 상품 주문 (/pricing → /checkout → 토스 결제)
-- 금액은 서버 카탈로그(server/src/orders/catalog.ts)에서만 계산한다.
CREATE TABLE IF NOT EXISTS product_orders (
  id                SERIAL PRIMARY KEY,
  token             VARCHAR(64)  NOT NULL UNIQUE,
  order_no          VARCHAR(50)  NOT NULL UNIQUE,
  product_id        VARCHAR(50)  NOT NULL,
  product_name      VARCHAR(200) NOT NULL,
  quantity          INTEGER      NOT NULL DEFAULT 1,
  unit_price        INTEGER      NOT NULL,
  supply_amount     INTEGER      NOT NULL,
  vat_amount        INTEGER      NOT NULL,
  amount            INTEGER      NOT NULL,
  customer_name     VARCHAR(100) NOT NULL,
  customer_email    VARCHAR(200) NOT NULL,
  customer_phone    VARCHAR(50),
  company           VARCHAR(200),
  memo              TEXT,
  status            VARCHAR(20)  NOT NULL DEFAULT 'pending',
  toss_order_id     VARCHAR(100) UNIQUE,
  toss_payment_key  VARCHAR(200),
  receipt_url       TEXT,
  paid_at           TIMESTAMP,
  canceled_at       TIMESTAMP,
  created_at        TIMESTAMP    NOT NULL DEFAULT NOW()
);
