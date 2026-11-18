# 백엔드 세팅 (saffir_web_v2)

v1(Next.js 16 화면)에 saffir_web의 백엔드(NestJS + PostgreSQL)를 가져와 한 저장소로 합쳤다.
saffir_web 원본은 그대로 두고 `git archive HEAD`로 커밋된 내용만 복사했다.

## 폴더

| 위치                                                                            | 내용                                                                                                                                            |
| ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/`                                                                          | 화면 (Next.js 16, App Router). 기존 v1 그대로                                                                                                   |
| `src/server/api/`                                                               | 화면에서 백엔드를 부르는 연결 층 (`apiFetch`, `apiHealthy`)                                                                                     |
| `server/`                                                                       | 백엔드 (NestJS 11 · Drizzle · PostgreSQL 17). saffir_web의 `server/` 그대로 (폴더·Dockerfile 이름도 원본과 같게 유지 → GitLab 배포 설정 재사용) |
| `db/`                                                                           | DB 스키마(`schema.sql`), 마이그레이션, 첫 실행 스크립트(`init.sh`)                                                                              |
| `docker-compose.dev.yml`                                                        | 개발: frontend(:3000) · server(:4000) · db(:5432)                                                                                               |
| `docker-compose.yml` · `docker-compose.prod.yml`                                | 운영: nginx(80/443) · web · server · db                                                                                                         |
| `Dockerfile.frontend` · `Dockerfile.server` · `Dockerfile.nginx` · `nginx.conf` | 이미지·프록시 설정                                                                                                                              |
| `.gitlab-ci.yml` · `ci/deploy.sh`                                               | 기존 GitLab 배포(EC2). 이 저장소를 어디에 올릴지 정한 뒤 맞춘다                                                                                 |

루트 `server/`·`db/`는 화면 쪽 검사(tsc · eslint · prettier · knip)에서 빠진다. 백엔드는 `server/` 안에서 따로 빌드한다. (화면 쪽 서버 코드는 `src/server/`로, 이름은 같지만 다른 폴더다)

## 로컬 실행

```bash
cp .env.example .env.local   # 화면용 (백엔드를 붙이려면 API_URL=http://localhost:4000)
cp .env.example .env         # Docker(백엔드)용. JWT_SECRET 등 채우기

# 백엔드 + DB만 Docker로, 화면은 로컬
docker compose -f docker-compose.dev.yml up server db
npm run dev
```

- 화면 http://localhost:3000 · 백엔드 http://localhost:4000/api/health · DB localhost:5432
- 개발 중에는 `next.config.ts` rewrite가 `/api/*`, `/uploads/*`를 백엔드로 넘긴다 (운영은 nginx가 같은 일을 한다).
- 백엔드는 시작할 때 OAuth 키(구글·카카오·네이버)를 필수로 확인한다. 키가 없으면 아무 글자나 넣어 두면 뜬다(그 로그인만 안 됨).
- DB는 빈 볼륨으로 처음 뜰 때 `db/schema.sql`을 만든다. `db/dump.sql`을 두면 그걸로 복원한다.

## 데이터 출처 스위치 (데모 ↔ 백엔드)

| `API_URL`               | 동작                                                                     | 쓰는 곳                      |
| ----------------------- | ------------------------------------------------------------------------ | ---------------------------- |
| 비어 있음               | 데모 데이터 (코드 안 예시 + 서버 메모리). 백엔드 없이 모든 화면이 열린다 | Vercel 미리보기, 디자인 확인 |
| `http://localhost:4000` | 로컬 Docker 백엔드에서 실제 데이터                                       | 백엔드 연동 개발             |
| `http://server:4000`    | 같은 서버의 백엔드 컨테이너                                              | 운영 (EC2 Docker)            |

- 판단은 `src/server/api/mode.ts`의 `dataSource()` 한 곳에서만 한다.
- 화면은 스위치를 모른다. 각 도메인 함수(`src/server/<도메인>/`)가 안에서 데모/백엔드를 고른다.
  도메인마다 `demo.ts`(지금 코드)와 `api.ts`(`apiFetch` 호출)를 같은 모양의 **비동기 함수**로 두고, `index.ts`에서 `dataSource()`로 고른다.
- 어드민 왼쪽 아래에 지금 상태가 보인다: 데모 데이터 / 백엔드 연결됨 / 백엔드 응답 없음.
- 백엔드에 아직 API가 없는 도메인은 `api` 모드에서도 데모로 둔다 (도메인별로 하나씩 옮긴다).

## 확장 원칙

1. 화면 → `src/server/<도메인>` 함수 → (데모 | 백엔드). 백엔드를 옮기거나 바꿔도 화면 코드는 그대로.
2. 주소·키는 모두 환경변수. 로컬 → EC2 → (나중에 RDS·S3 등)은 `.env` 값만 바뀐다.
3. DB 변경은 마이그레이션 파일로만 (drizzle 마이그레이션으로 실행 기록 관리 예정).
4. 파일 저장은 함수 하나로 감싼다 (지금 서버 디스크 → 나중에 S3).
5. 로그인은 백엔드 하나 (JWT 쿠키). 화면은 쿠키만 넘긴다.
6. 백엔드 API 문서(Swagger)를 켜고 화면 타입을 맞춘다.

## 화면 ↔ 백엔드 대응

| 화면 (v2)                 | 지금 데이터                               | 백엔드 API (`/api/...`)                                                                                             | 테이블                                           |
| ------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| 로그인·회원가입·계정 찾기 | 데모 계정 + 서명 쿠키 (`src/server/auth`) | `auth/login` `auth/register` `auth/find-email` `auth/forgot-password` `auth/reset-password` `auth/me` `auth/logout` | users, password_resets                           |
| 카카오·네이버 간편 로그인 | v2 자체 OAuth (`/auth/[provider]`)        | `auth/kakao` `auth/naver` `auth/google` (+callback)                                                                 | users                                            |
| 문의·견적                 | 웹훅 저장 (`src/server/inquiry`)          | `inquiries` (POST/GET/PATCH status), `upload/inquiry`                                                               | inquiries                                        |
| 요금표 주문·결제          | 주문서 화면(결제 대기 안내)               | `orders/products` `orders` `orders/:token/toss/order` `.../confirm` `.../fail`                                      | product_orders                                   |
| 포털 청구·결제            | 데모 데이터                               | `payments` `payments/:id/toss/*` `invoices` `payment-links`                                                         | payments, invoices, invoice_items, payment_links |
| 포털·어드민 프로젝트      | 메모리 저장소 (`src/server/projects`)     | `projects` CRUD                                                                                                     | projects                                         |
| 마일스톤                  | 메모리                                    | `milestones` (+ `:id/works`)                                                                                        | milestones, works                                |
| 산출물                    | 메모리                                    | `deliverables` (POST/DELETE), `upload`                                                                              | deliverables                                     |
| 어드민 사용자             | 데모 계정                                 | `users` (GET, PATCH role)                                                                                           | users                                            |

## 백엔드에 없는 것 (추가할 테이블·API)

이번 어드민·포털 개편에서 생긴 기능은 지금 백엔드에 자리가 없다. `server/`에 모듈과 테이블을 추가해야 한다.

| 기능                      | 필요한 테이블                                                                                                             | 비고                                                              |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| 고객사 (여러 담당자 계정) | `clients`, `client_members(user_id, client_id, role)`                                                                     | 지금 `projects.client_id`는 사용자 1명을 가리킴 → 고객사로 바꾼다 |
| 프로젝트 단계·PM·보관     | `projects`에 `stage`, `pm`, `archived_at` 추가                                                                            | status는 그대로 둠                                                |
| 마일스톤 고객 공개·완료일 | `milestones`에 `stage`, `shared`, `done_at` 추가                                                                          |                                                                   |
| 작업                      | `tasks(project_id, title, stage, assignee, start, due, status, shared, done_at)`                                          | 기존 `works`(마일스톤 체크리스트)와 별도                          |
| 산출물 승인               | `deliverables`에 `version`, `note`, `status`, `milestone_id`, `requested_at`, `decided_at`, `decided_by`, `feedback` 추가 |                                                                   |
| 주간 보고                 | `reports(project_id, week_of, done, next, issues, asks, shared_at, author)`                                               |                                                                   |
| 회의록                    | `meetings(project_id, date, title, attendees, decisions, actions, shared_at)`                                             |                                                                   |
| 요청·장애 신고            | `requests(client_id, project_id, kind, title, body, from, status, priority, assignee, reply, memo)`                       |                                                                   |
| 알림                      | `notifications(client_id, text, created_at)`                                                                              | 메일·알림톡 발송은 그다음                                         |
| 변경 기록                 | `activities(project_id, who, text, at)`                                                                                   |                                                                   |
| 팀                        | `users.role`에 `staff` 추가 또는 `staff` 테이블                                                                           |                                                                   |

## 프로젝트 관리 API (`server/src/pm`, 2026-11-16 추가)

DB: `db/migrations/20261116_project_management.sql` (기존 테이블은 컬럼만 추가, 반복 실행 안전).
새로 띄우는 DB는 `db/init.sh`가 스키마 뒤에 `db/migrations/*.sql`을 날짜순으로 모두 적용한다.

권한: 내부 계정은 `users.role`이 `admin` 또는 `staff`. 고객은 `client_members`로 연결된 고객사 것만 본다.

```sql
UPDATE users SET role = 'staff' WHERE email = '...';   -- 팀원 계정 (다시 로그인해야 반영)
```

| 누가      | 메서드 · 경로 (`/api/pm/...`)                                                                                    | 내용                                                                                       |
| --------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 고객·내부 | `GET portal`                                                                                                     | 내 고객사, 프로젝트(공개 항목), 요청, 알림                                                 |
| 고객·내부 | `GET projects`, `GET projects/:id`                                                                               | 목록, 보드 (내부: 전체+기록 / 고객: 공개 항목만, 담당·메모 숨김)                           |
| 고객·내부 | `POST deliverables/:id/decision`                                                                                 | 승인 `{approve:true}` / 수정 요청 `{approve:false, feedback}`. 승인되면 연결 마일스톤 완료 |
| 고객·내부 | `GET requests`, `POST requests`                                                                                  | 요청 목록, 보내기 (장애 신고는 자동 긴급)                                                  |
| 내부      | `GET/POST/PATCH/DELETE clients`, `POST/DELETE clients/:id/members`                                               | 고객사, 포털 계정 연결(가입한 이메일)                                                      |
| 내부      | `GET/POST staff`, `PATCH/DELETE staff/:name`                                                                     | 팀원 (이름 바꾸면 PM·담당도 바뀜)                                                          |
| 내부      | `POST projects`, `PATCH/DELETE projects/:id`                                                                     | 새 프로젝트(단계별 마일스톤 자동), 단계·정보·보관                                          |
| 내부      | `POST projects/:id/milestones`, `PATCH/DELETE milestones/:id`                                                    | 마일스톤 (공개 일정 바꾸면 고객 알림)                                                      |
| 내부      | `POST projects/:id/tasks`, `PATCH/DELETE tasks/:id`                                                              | 작업                                                                                       |
| 내부      | `POST projects/:id/deliverables[?request=1]`, `PATCH deliverables/:id`, `POST deliverables/:id/request·withdraw` | 산출물, 승인 요청·거두기                                                                   |
| 내부      | `POST projects/:id/reports`, `PATCH reports/:id/share`                                                           | 주간 보고 저장(주마다 하나, `share:true`면 바로 공유)                                      |
| 내부      | `POST projects/:id/meetings`, `PATCH meetings/:id`, `PATCH meetings/:id/share`                                   | 회의록                                                                                     |
| 내부      | `PATCH requests/:id`                                                                                             | 상태·우선순위·담당·메모·답변 (상태 변경·답변은 고객 알림)                                  |

바꾼 내용은 `activities`(어드민 기록 탭)에, 고객에게 보일 일은 `notifications`(포털 홈 최근 알림)에 남는다.

확인한 것 (로컬 PostgreSQL + 실제 HTTP 호출): 고객사·멤버·팀원·프로젝트(마일스톤 6개 자동)·작업·산출물 승인 요청 → 고객 승인 → 마일스톤 완료, 의견 없는 수정 요청 거절, 보고 저장·공유, 고객 요청 → 내부 답변, 포털에 공개 항목만(비공개 작업·담당·메모 숨김), 다른 고객사 계정 403, 고객의 내부 API 호출 403, 기록·알림 생성.

보안 (2026-11-17 고침): 기존 `GET /api/projects/:id`는 로그인만 확인해 다른 고객 프로젝트도 보였고, `POST /api/payments/:id/toss/order·confirm`도 남의 청구를 결제창으로 열 수 있었다. 이제 `common/project-access.ts`의 `assertProjectAccess`로 내부 계정(admin·staff), 프로젝트 주인(`projects.client_id`), 소속 고객사(`client_members`)만 통과하고 나머지는 404. 프로젝트 목록도 staff는 전체를 본다.

남은 주의: `/uploads/*`(첨부·산출물 파일)는 로그인 없이 주소만 알면 열린다 (파일명은 추측하기 어렵게 만들어짐). 민감한 파일을 올리게 되면 S3 서명 URL 등으로 바꾼다.

## 정해야 할 것

1. **로그인을 어디서 할지**: 백엔드(JWT 쿠키, 구글 포함)로 합치는 것을 권장. 그러면 v2의 자체 OAuth(`/auth/[provider]`)와 서명 쿠키 세션은 백엔드 호출로 바꾼다.
2. **저장소·배포**: 이 폴더를 GitHub(saffir_agency) / GitLab(saffir_web) 어디에 둘지, 배포를 Vercel(화면) + 별도 서버(백엔드)로 나눌지, 기존처럼 EC2 Docker 하나로 갈지.
3. **파일 저장소**: 지금은 서버 디스크(`uploads` 볼륨). S3로 옮길지.

## 어드민 연결 방식 (`API_URL`이 있을 때)

- **로그인**: `/login`이 백엔드 `POST /api/auth/login`을 부르고, 받은 `access_token` 쿠키를 화면 도메인에 그대로 심는다. 세션은 `GET /api/auth/me`로 확인 (`src/server/auth/backend-session.ts`). role이 `admin`·`staff`면 어드민, 아니면 포털.
- **읽기**: 어드민 화면은 그리기 전에 `loadPm()`이 `/api/pm/clients·staff·projects·requests`를 받아 이번 요청의 사진으로 올린다 (`src/server/projects/remote.ts`). `listProjects()` 같은 읽기 함수는 그 사진을 읽으므로 화면 코드는 그대로다.
- **쓰기**: `features/admin/api/actions.ts`의 각 액션이 백엔드 모드면 `remote.*`(`remote-writes.ts`)로 `/api/pm/...`을 부르고 화면을 다시 그린다. 데모 모드는 기존 메모리 저장소.
- **주의**: React `cache()` 사진은 화면 렌더 중에만 살아 있다. 서버 액션 안에서 현재 값을 봐야 하면 `fetchPm()`으로 직접 받는다.
- **데모 계정(백엔드 모드)**: `db/seeds/demo.sql`이 화면 데모와 같은 6개 계정(비밀번호 `saffir-demo-2026`)과 예시 고객사·프로젝트·요청·알림을 넣는다. `docker-compose.dev.yml`은 `SEED_DEMO=1`이라 새 볼륨이면 자동으로 들어가고, 이미 있는 DB에는 `docker compose -f docker-compose.dev.yml exec -T db psql -U saffir -d saffir < db/seeds/demo.sql`. 여러 번 실행해도 안전. 운영 compose에는 넣지 않는다. 로그인 화면의 "데모 계정으로 둘러보기"는 백엔드 모드에서도 보인다(개발 환경 또는 `DEMO_LOGIN=1`).
- **회원 기능(백엔드 모드)**: 회원가입 `POST /api/auth/register`(고객 유형·병원명·필수 동의 시각·소식 수신 동의 저장, `20261117_user_profile.sql`), 아이디 찾기 `find-email`(이름+연락처, 이메일 가림), 비밀번호 찾기 `forgot-password`(1시간짜리 1회용 링크 메일, SMTP가 없으면 백엔드 로그에 링크), 재설정 `/reset-password?token=` → `reset-password`. 화면의 서버 액션은 `features/auth/api/account.ts`. 데모 모드에서는 "회원 서버 연결 후 열립니다" 안내만 보인다.
- **간편 로그인(백엔드 모드)**: `/auth/kakao`·`/auth/naver`가 같은 도메인의 `/api/auth/{provider}`로 넘기고, 백엔드가 로그인 후 `/dashboard`로 보낸다. 카카오·네이버·구글 개발자 콘솔에 Redirect URI `{CALLBACK_BASE_URL}/api/auth/{provider}/callback`을 등록해야 한다 (로컬은 `CALLBACK_BASE_URL=http://localhost:3000`, 운영은 `https://saffir.co.kr`).
- **문의·견적 요청**: 공개 폼 → `saveInquiry()` → `POST /api/inquiries`(kind contact|estimate, `20261118_inquiries.sql`로 이메일 선택·견적 항목·담당·메모 추가). 어드민 `/admin/inquiries`에서 상태(new 새 문의 / replied 연락함 / closed 종료)·담당·내부 메모 관리, 메뉴 숫자는 새 문의 수. 백엔드 목록 API는 내부 계정(admin·staff)만. 데모 모드는 메모리에 예시 2건 + 들어온 문의.
- **내 정보 `GET /api/auth/me`**: 토큰 내용 대신 DB 현재 값(이름·권한·연락처·병원명·고객사 연결 여부)을 준다. 화면 세션은 병원명을 회사명으로, 고객사에 연결된 계정이면 프로젝트 메뉴까지, 아니면 일반 회원 메뉴만 보여 준다. (데모 계정은 화면 데모와 같은 메뉴)
- **포털 청구·결제**: `GET /api/pm/billing` — 볼 수 있는 프로젝트(주인·소속 고객사)의 청구(`payments`, 청구서 번호가 있으면 그 번호)와 내 이메일로 결제 완료한 상품 주문(`product_orders`). 화면은 `loadPortalBilling()`(remote.ts)으로 포털 청구 목록·영수증 표를 채운다. 결제하기 버튼은 토스 연결 단계에서 연다. 어드민은 프로젝트의 **청구** 탭(`/admin/projects/:id/billing`)에서 청구 만들기(고객 알림 "새 청구")·결제 완료로(계좌이체)·삭제(결제 전만) — `POST /api/pm/projects/:id/payments`, `POST /api/pm/payments/:id/paid`, `DELETE /api/pm/payments/:id`, 모두 변경 기록에 남는다. 데모 모드도 같은 화면(메모리 저장)이고 포털에 바로 반영된다. 데모 시드에 자사몰 MVP 계약금(완료)·잔금(미결제)을 넣었다.
- **GEO 진단 기록**: 진단은 사피어가 하고 결과를 어드민 **GEO**(`/admin/geo`)에서 입력한다. 테이블 `geo_sites`(계정 하나에 사이트 하나, plan free|pro) · `geo_diagnoses`(종합·영역 4개·개선 우선순위·AI 노출) · `geo_ad_checks`(의료광고 문구 점검), `20261119_geo.sql`. API: 고객 `GET /api/geo/me`, 내부 `GET/POST /api/geo/sites`, `PATCH/DELETE /api/geo/sites/:id`, `POST /api/geo/sites/:id/diagnoses|ad-checks`, `DELETE /api/geo/diagnoses/:id|ad-checks/:id`. plan이 pro면 `/auth/me`의 geoPlan으로 포털에 구독 메뉴가 열리고, 무료는 문구 점검 5회. 데모 모드의 어드민 GEO는 안내만 (포털엔 예시). 데모 시드의 AI 노출은 ChatGPT·Gemini·Perplexity만 (네이버 AI 표기는 확인 전이라 뺐다).
- **포털 계정(회사·병원 정보)**: `PATCH /api/auth/me`(병원·회사 이름, 사업자등록번호 10자리 → 000-00-00000로 저장, 세금계산서 이메일, `20261120_user_company.sql`). `/auth/me`는 같은 고객사 계정 목록(colleagues)도 준다 → 포털 '담당자' 표. 데모 모드는 읽기만.
- **동료 초대**: `invites` 테이블(`20261121_invites.sql`, 7일·1회용·초대받은 이메일만). 고객은 포털 계정에서 이메일로 초대 → 메일 링크 `/invite?token=` → 처음이면 `/signup?invite=`(이메일 고정, 가입하면 고객사 연결), 계정이 있으면 로그인 후 "참여하기". 이미 가입한 사람도 고객 초대는 본인이 수락해야 연결된다. 어드민 고객사 화면에서 가입 전 이메일을 연결하면 초대 메일을 보낸다(가입한 계정은 바로 연결). API: `GET /api/pm/invites/lookup/:token`(공개), `GET|POST /api/pm/invites`, `DELETE /api/pm/invites/:id`, `POST /api/pm/invites/accept/:token`. SMTP가 없으면 링크가 백엔드 로그에 찍힌다.
- **산출물 파일**: 어드민 산출물 올리기·새 버전에 파일 첨부(백엔드 모드). 서버 액션 → `POST /api/upload`(내부 계정, 50MB, PDF·문서·이미지·ZIP) → `/uploads/<무작위 이름>`을 산출물 링크로. `next.config.ts`의 serverActions.bodySizeLimit 50mb, nginx client_max_body_size 50m. 파일은 주소만 알면 열린다(로그인 확인 없음).
- **방문자 IP**: 화면 서버가 백엔드를 대신 부르므로 `X-Forwarded-For`로 방문자 IP를 넘기고, 백엔드는 `trust proxy`(사설망)로 받는다. 이게 없으면 로그인 분당 10회 같은 제한이 모든 방문자에게 한꺼번에 걸린다.
- **내부 계정 만들기(로컬)**: 회원가입 후 `update users set role='staff' where email='...'`.
- **포털(`/dashboard`)**: `requirePortal()`이 `GET /api/pm/portal`(고객 쿠키, 공개 항목만)을 받아 프로젝트·산출물·일정·작업·보고·회의록·요청·알림을 채운다. 고객의 요청 보내기는 `POST /api/pm/requests`, 산출물 승인·수정 요청은 `POST /api/pm/deliverables/:id/decision`. 진단(GEO)·청구·회원 정보는 백엔드 테이블이 생기기 전까지 빈 값.

## 다음 순서

1. ~~`server/`에 위 테이블 마이그레이션 + 모듈 추가~~ → 완료 (`server/src/pm`)
2. ~~어드민을 백엔드로~~ → 완료. 아래 "어드민 연결 방식" 참고
3. ~~포털 프로젝트 데이터, 회원가입·찾기·간편 로그인~~ → 완료. 남은 것: 포털 데이터(`src/server/portal`)를 백엔드로 교체
4. 문의·견적·주문 결제를 백엔드로 교체
