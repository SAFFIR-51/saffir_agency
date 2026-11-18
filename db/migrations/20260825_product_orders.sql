-- 공개 상품 주문 테이블 추가 (2026-08-25)
--
-- db/init.sh 는 빈 볼륨(최초 기동)에서만 실행되므로, 이미 데이터가 있는 서버에는
-- 이 파일을 직접 적용해야 한다.
--
--   docker exec -i saffir_web-db-1 psql -U saffir -d saffir < db/migrations/20260825_product_orders.sql
--
-- 반복 실행해도 안전하다 (IF NOT EXISTS).

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
