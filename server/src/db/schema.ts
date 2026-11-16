import {
  boolean,
  index,
  primaryKey,
  unique,
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
  role: varchar('role', { length: 20 }).default('client').notNull(), // 'admin' | 'staff' | 'client'
  /** 병원(회사)명 · 고객 유형(병원 | 기업) — 회원가입 화면에서 받는다 */
  organization: varchar('organization', { length: 200 }),
  customerType: varchar('customer_type', { length: 20 }),
  /** 이용약관·개인정보 동의 시각, 소식 수신 동의 */
  termsAgreedAt: timestamp('terms_agreed_at'),
  marketingOptIn: boolean('marketing_opt_in').default(false).notNull(),
  /** 세금계산서·청구서용 (포털 계정에서 고객이 고친다) */
  businessNumber: varchar('business_number', { length: 20 }),
  taxEmail: varchar('tax_email', { length: 200 }),
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
  /** 문의하기는 이메일을 받지 않아 비어 있을 수 있다 */
  email: varchar('email', { length: 200 }),
  phone: varchar('phone', { length: 30 }),
  company: varchar('company', { length: 100 }),
  projectType: varchar('project_type', { length: 50 }),
  budget: varchar('budget', { length: 50 }),
  targetDate: varchar('target_date', { length: 50 }),
  description: text('description'),
  meetingPreference: varchar('meeting_preference', { length: 50 }),
  attachmentUrl: text('attachment_url'),
  status: varchar('status', { length: 20 }).default('new').notNull(), // new | replied | closed
  receivedAt: timestamp('received_at').defaultNow().notNull(),
  /** contact(문의하기) | estimate(견적 요청) */
  kind: varchar('kind', { length: 20 }).default('contact').notNull(),
  platforms: text('platforms'),
  readiness: varchar('readiness', { length: 50 }),
  reference: text('reference'),
  assignee: varchar('assignee', { length: 100 }),
  memo: text('memo'),
  updatedAt: timestamp('updated_at'),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  clientId: integer('client_id').references(() => users.id),
  status: varchar('status', { length: 20 }).default('active').notNull(),
  startDate: varchar('start_date', { length: 20 }),
  targetDate: varchar('target_date', { length: 20 }),
  // 프로젝트 관리 (20261116 마이그레이션)
  clientOrgId: integer('client_org_id').references(() => clients.id, { onDelete: 'set null' }),
  stage: varchar('stage', { length: 20 }).default('착수').notNull(),
  pm: varchar('pm', { length: 100 }),
  archivedAt: timestamp('archived_at'),
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
  stage: varchar('stage', { length: 20 }),
  shared: boolean('shared').default(true).notNull(),
  doneAt: varchar('done_at', { length: 20 }),
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
  // 승인 흐름: 작성 중 → 승인 요청 → 승인 완료 | 수정 요청
  stage: varchar('stage', { length: 20 }),
  version: varchar('version', { length: 30 }),
  note: text('note'),
  status: varchar('status', { length: 20 }).default('작성 중').notNull(),
  milestoneId: integer('milestone_id').references(() => milestones.id, { onDelete: 'set null' }),
  requestedAt: varchar('requested_at', { length: 20 }),
  decidedAt: varchar('decided_at', { length: 20 }),
  decidedBy: varchar('decided_by', { length: 100 }),
  feedback: text('feedback'),
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

// ───────── 프로젝트 관리 (db/migrations/20261116_project_management.sql) ─────────

/** 고객사. 담당자 여러 명(client_members)이 같은 고객사로 포털을 본다 */
export const clients = pgTable('clients', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const clientMembers = pgTable(
  'client_members',
  {
    clientId: integer('client_id')
      .references(() => clients.id, { onDelete: 'cascade' })
      .notNull(),
    userId: integer('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    role: varchar('role', { length: 20 }).default('member').notNull(),
  },
  (t) => [primaryKey({ columns: [t.clientId, t.userId] })],
);

/** 고객 포털 동료 초대 (7일, 1회용, 초대받은 이메일만) */
export const invites = pgTable('invites', {
  id: serial('id').primaryKey(),
  token: varchar('token', { length: 64 }).notNull().unique(),
  clientOrgId: integer('client_org_id')
    .references(() => clients.id, { onDelete: 'cascade' })
    .notNull(),
  email: varchar('email', { length: 200 }).notNull(),
  invitedBy: varchar('invited_by', { length: 100 }).default('').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  acceptedAt: timestamp('accepted_at'),
  acceptedUserId: integer('accepted_user_id').references(() => users.id, { onDelete: 'set null' }),
});

/** 팀원 (담당·PM 선택 목록) */
export const staff = pgTable('staff', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
  active: boolean('active').default(true).notNull(),
});

export const tasks = pgTable(
  'tasks',
  {
    id: serial('id').primaryKey(),
    projectId: integer('project_id')
      .references(() => projects.id, { onDelete: 'cascade' })
      .notNull(),
    title: varchar('title', { length: 300 }).notNull(),
    stage: varchar('stage', { length: 20 }),
    assignee: varchar('assignee', { length: 100 }),
    startDate: varchar('start_date', { length: 20 }),
    dueDate: varchar('due_date', { length: 20 }).notNull(),
    status: varchar('status', { length: 20 }).default('할 일').notNull(),
    shared: boolean('shared').default(true).notNull(),
    doneAt: varchar('done_at', { length: 20 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => [index('tasks_project_idx').on(t.projectId)],
);

export const reports = pgTable(
  'reports',
  {
    id: serial('id').primaryKey(),
    projectId: integer('project_id')
      .references(() => projects.id, { onDelete: 'cascade' })
      .notNull(),
    weekOf: varchar('week_of', { length: 20 }).notNull(),
    done: text('done').default('').notNull(),
    next: text('next').default('').notNull(),
    issues: text('issues').default('').notNull(),
    asks: text('asks').default('').notNull(),
    author: varchar('author', { length: 100 }),
    sharedAt: varchar('shared_at', { length: 20 }),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (t) => [unique().on(t.projectId, t.weekOf)],
);

export const meetings = pgTable('meetings', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id')
    .references(() => projects.id, { onDelete: 'cascade' })
    .notNull(),
  date: varchar('date', { length: 20 }).notNull(),
  title: varchar('title', { length: 200 }).notNull(),
  attendees: text('attendees').default('').notNull(),
  decisions: text('decisions').default('').notNull(),
  actions: text('actions').default('').notNull(),
  sharedAt: varchar('shared_at', { length: 20 }),
});

export const requests = pgTable('requests', {
  id: serial('id').primaryKey(),
  clientOrgId: integer('client_org_id')
    .references(() => clients.id, { onDelete: 'cascade' })
    .notNull(),
  projectId: integer('project_id').references(() => projects.id, { onDelete: 'set null' }),
  kind: varchar('kind', { length: 20 }).notNull(),
  title: varchar('title', { length: 200 }).notNull(),
  body: text('body').default('').notNull(),
  requestedBy: varchar('requested_by', { length: 100 }).default('').notNull(),
  status: varchar('status', { length: 20 }).default('접수').notNull(),
  priority: varchar('priority', { length: 20 }).default('보통').notNull(),
  assignee: varchar('assignee', { length: 100 }).default('').notNull(),
  reply: text('reply'),
  repliedAt: varchar('replied_at', { length: 20 }),
  memo: text('memo'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  clientOrgId: integer('client_org_id')
    .references(() => clients.id, { onDelete: 'cascade' })
    .notNull(),
  text: text('text').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const activities = pgTable(
  'activities',
  {
    id: serial('id').primaryKey(),
    projectId: integer('project_id')
      .references(() => projects.id, { onDelete: 'cascade' })
      .notNull(),
    who: varchar('who', { length: 100 }).notNull(),
    text: text('text').notNull(),
    at: timestamp('at').defaultNow().notNull(),
  },
  (t) => [index('activities_project_idx').on(t.projectId)],
);

/** GEO: 계정 하나에 사이트 하나. plan free(무료 진단) | pro(구독) */
export const geoSites = pgTable('geo_sites', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull()
    .unique(),
  siteUrl: varchar('site_url', { length: 300 }).notNull(),
  plan: varchar('plan', { length: 20 }).default('free').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const geoDiagnoses = pgTable('geo_diagnoses', {
  id: serial('id').primaryKey(),
  siteId: integer('site_id')
    .references(() => geoSites.id, { onDelete: 'cascade' })
    .notNull(),
  date: varchar('date', { length: 20 }).notNull(),
  score: integer('score').notNull(),
  areas: json('areas').$type<{ name: string; score: number }[]>().default([]).notNull(),
  priorities: json('priorities').$type<string[]>().default([]).notNull(),
  visibility: json('visibility').$type<{ ai: string; appeared: number; asked: number }[] | null>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const geoAdChecks = pgTable('geo_ad_checks', {
  id: serial('id').primaryKey(),
  siteId: integer('site_id')
    .references(() => geoSites.id, { onDelete: 'cascade' })
    .notNull(),
  date: varchar('date', { length: 20 }).notNull(),
  summary: varchar('summary', { length: 300 }).notNull(),
  risks: integer('risks').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
