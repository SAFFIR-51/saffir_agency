import {
  boolean,
  integer,
  json,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 200 }).notNull().unique(),
  provider: varchar('provider', { length: 20 }).notNull(), // 'local' | 'google' | 'kakao' | 'naver'
  /** provider='local' 계정만 채워진다. scrypt$<salt>$<hash> 포맷 (auth/password.ts) */
  passwordHash: text('password_hash'),
  /** 아이디(이메일) 찾기에 쓰는 연락처. 숫자만 저장한다. */
  phone: varchar('phone', { length: 30 }),
  role: varchar('role', { length: 20 }).default('client').notNull(), // 'admin' | 'client'
  joinedAt: timestamp('joined_at').defaultNow().notNull(),
  lastActive: timestamp('last_active').defaultNow().notNull(),
});

/** 비밀번호 재설정 토큰 — 메일로 보낸 링크(/reset-password?token=…)의 1회용 티켓 */
export const passwordResets = pgTable('password_resets', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  token: varchar('token', { length: 64 }).notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  usedAt: timestamp('used_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 200 }).notNull(),
  phone: varchar('phone', { length: 30 }),
  company: varchar('company', { length: 100 }),
  projectType: varchar('project_type', { length: 50 }),
  budget: varchar('budget', { length: 50 }),
  targetDate: varchar('target_date', { length: 50 }),
  description: text('description'),
  meetingPreference: varchar('meeting_preference', { length: 50 }),
  attachmentUrl: text('attachment_url'),
  status: varchar('status', { length: 20 }).default('new').notNull(),
  receivedAt: timestamp('received_at').defaultNow().notNull(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  clientId: integer('client_id').references(() => users.id),
  status: varchar('status', { length: 20 }).default('active').notNull(),
  startDate: varchar('start_date', { length: 20 }),
  targetDate: varchar('target_date', { length: 20 }),
});

export const milestones = pgTable('milestones', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id')
    .references(() => projects.id, { onDelete: 'cascade' })
    .notNull(),
  ord: integer('ord').notNull(),
  title: varchar('title', { length: 200 }).notNull(),
  date: varchar('date', { length: 20 }),
  status: varchar('status', { length: 20 }).default('pending').notNull(),
});

export const deliverables = pgTable('deliverables', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id')
    .references(() => projects.id, { onDelete: 'cascade' })
    .notNull(),
  name: varchar('name', { length: 200 }).notNull(),
  size: varchar('size', { length: 50 }),
  type: varchar('type', { length: 20 }).notNull(), // 'PDF' | 'LINK'
  url: text('url'),
  date: varchar('date', { length: 20 }),
});

export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id')
    .references(() => projects.id, { onDelete: 'cascade' })
    .notNull(),
  title: varchar('title', { length: 200 }).notNull(),
  amount: integer('amount').notNull(),
  date: varchar('date', { length: 20 }),
  paidAt: timestamp('paid_at'),
  tossOrderId: varchar('toss_order_id', { length: 100 }).unique(),
});

export const works = pgTable('works', {
  id: serial('id').primaryKey(),
  milestoneId: integer('milestone_id')
    .references(() => milestones.id, { onDelete: 'cascade' })
    .notNull(),
  text: varchar('text', { length: 500 }).notNull(),
  done: boolean('done').default(false).notNull(),
});

export const invoices = pgTable('invoices', {
  id: serial('id').primaryKey(),
  paymentId: integer('payment_id')
    .references(() => payments.id, { onDelete: 'cascade' })
    .notNull(),
  invoiceNumber: varchar('invoice_number', { length: 50 }).notNull().unique(),
  clientCompany: varchar('client_company', { length: 200 }),
  clientContact: varchar('client_contact', { length: 100 }),
  notes: text('notes'),
  bankInfo: text('bank_info'),
  issuedAt: timestamp('issued_at').defaultNow().notNull(),
});

export const paymentLinks = pgTable('payment_links', {
  id: serial('id').primaryKey(),
  token: varchar('token', { length: 64 }).notNull().unique(),
  invoiceNumber: varchar('invoice_number', { length: 50 }).notNull(),
  clientCompany: varchar('client_company', { length: 200 }),
  clientContact: varchar('client_contact', { length: 100 }),
  items: json('items').notNull().$type<Array<{ id: string; name: string; quantity: number; unitPrice: number }>>(),
  notes: text('notes'),
  bankInfo: text('bank_info'),
  amount: integer('amount').notNull(),
  tossOrderId: varchar('toss_order_id', { length: 100 }).unique(),
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const invoiceItems = pgTable('invoice_items', {
  id: serial('id').primaryKey(),
  invoiceId: integer('invoice_id')
    .references(() => invoices.id, { onDelete: 'cascade' })
    .notNull(),
  name: varchar('name', { length: 200 }).notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: numeric('unit_price', { precision: 12, scale: 2 }).notNull(),
});

/** 공개 상품 주문 — /pricing 에서 접수, 토스로 결제.
 *  금액 필드는 전부 서버 카탈로그(orders/catalog.ts) 계산값이다. 클라이언트 입력을 넣지 않는다. */
export const productOrders = pgTable('product_orders', {
  id: serial('id').primaryKey(),
  token: varchar('token', { length: 64 }).notNull().unique(),
  orderNo: varchar('order_no', { length: 50 }).notNull().unique(),
  productId: varchar('product_id', { length: 50 }).notNull(),
  productName: varchar('product_name', { length: 200 }).notNull(),
  quantity: integer('quantity').notNull().default(1),
  unitPrice: integer('unit_price').notNull(),
  supplyAmount: integer('supply_amount').notNull(),
  vatAmount: integer('vat_amount').notNull(),
  amount: integer('amount').notNull(),
  customerName: varchar('customer_name', { length: 100 }).notNull(),
  customerEmail: varchar('customer_email', { length: 200 }).notNull(),
  customerPhone: varchar('customer_phone', { length: 50 }),
  company: varchar('company', { length: 200 }),
  memo: text('memo'),
  /** pending | paid | failed | canceled */
  status: varchar('status', { length: 20 }).notNull().default('pending'),
  tossOrderId: varchar('toss_order_id', { length: 100 }).unique(),
  tossPaymentKey: varchar('toss_payment_key', { length: 200 }),
  receiptUrl: text('receipt_url'),
  paidAt: timestamp('paid_at'),
  canceledAt: timestamp('canceled_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
