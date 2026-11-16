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

## 정해야 할 것

1. **로그인을 어디서 할지**: 백엔드(JWT 쿠키, 구글 포함)로 합치는 것을 권장. 그러면 v2의 자체 OAuth(`/auth/[provider]`)와 서명 쿠키 세션은 백엔드 호출로 바꾼다.
2. **저장소·배포**: 이 폴더를 GitHub(saffir_agency) / GitLab(saffir_web) 어디에 둘지, 배포를 Vercel(화면) + 별도 서버(백엔드)로 나눌지, 기존처럼 EC2 Docker 하나로 갈지.
3. **파일 저장소**: 지금은 서버 디스크(`uploads` 볼륨). S3로 옮길지.

## 다음 순서

1. `server/`에 위 테이블 마이그레이션 + 모듈 추가 (clients → tasks/reports/meetings/requests → deliverables 승인)
2. `src/server/projects/store.ts` 함수 안쪽을 `apiFetch` 호출로 교체 (함수 모양은 유지 → 화면은 그대로)
3. 로그인·포털 데이터(`src/server/portal`)를 백엔드로 교체
4. 문의·견적·주문 결제를 백엔드로 교체
