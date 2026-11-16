# Server 개발 TODO

## 스키마 보완

- [ ] `works` 테이블 추가 — Milestone 세부 작업 (`text`, `done`, `milestone_id`)
- [ ] `invoices` 테이블 추가 — `invoice_number`, `client_company`, `client_contact`, `notes`, `bank_info`, `payment_id`
- [ ] `invoice_items` 테이블 추가 — `name`, `quantity`, `unit_price`, `invoice_id`

## 인증 (Auth)

- [ ] Google OAuth 연동 (`passport-google-oauth20`)
- [ ] 카카오 OAuth 연동
- [ ] 네이버 OAuth 연동
- [ ] JWT 발급 / 검증 (`@nestjs/jwt`)
- [ ] `AuthGuard` — 클라이언트 포털 보호
- [ ] `AdminGuard` — 어드민 API 보호

## API 모듈

- [ ] `projects` 모듈 — CRUD, 상태 변경
- [ ] `milestones` 모듈 — 마일스톤·세부작업 업데이트
- [ ] `deliverables` 모듈 — 파일 업로드(S3 or 로컬), 다운로드
- [ ] `payments` 모듈 — 결제 등록, 완료 처리
- [ ] `invoices` 모듈 — 청구서 생성, PDF 출력
- [ ] `users` 모듈 — 클라이언트 목록 조회 (어드민용)

## 인프라

- [ ] DB 마이그레이션 전략 결정 (`drizzle-kit migrate` vs `push`)
- [ ] 파일 업로드 스토리지 결정 (로컬 볼륨 vs S3 vs R2)
- [ ] 환경변수 검증 (`@nestjs/config` + Joi 또는 Zod)
- [ ] 요청 로깅 미들웨어
- [ ] 에러 핸들링 필터 (`ExceptionFilter`)
