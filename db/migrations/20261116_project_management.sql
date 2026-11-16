-- 프로젝트 관리(어드민·고객 포털 개편) 테이블 추가 (2026-11-16)
--
-- 기존 데이터는 건드리지 않고 테이블·컬럼만 더한다. 반복 실행해도 안전하다 (IF NOT EXISTS).
-- 운영 서버 적용:
--   docker exec -i saffir_web-db-1 psql -U saffir -d saffir < db/migrations/20261116_project_management.sql

-- 고객사 (병원·회사). 담당자 여러 명이 같은 고객사로 포털을 본다
CREATE TABLE IF NOT EXISTS clients (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(200) NOT NULL,
  created_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS client_members (
  client_id   INTEGER     NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  user_id     INTEGER     NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role        VARCHAR(20) NOT NULL DEFAULT 'member',   -- 'owner' | 'member'
  PRIMARY KEY (client_id, user_id)
);

-- 팀원 (담당·PM 선택 목록). 로그인 계정과 연결하면 user_id
CREATE TABLE IF NOT EXISTS staff (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL UNIQUE,
  user_id     INTEGER      REFERENCES users(id) ON DELETE SET NULL,
  active      BOOLEAN      NOT NULL DEFAULT TRUE
);

-- 프로젝트: 고객사·단계·PM·보관
ALTER TABLE projects ADD COLUMN IF NOT EXISTS client_org_id INTEGER REFERENCES clients(id) ON DELETE SET NULL;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS stage        VARCHAR(20) NOT NULL DEFAULT '착수';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS pm           VARCHAR(100);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS archived_at  TIMESTAMP;

-- 마일스톤: 단계·고객 공개·완료일
ALTER TABLE milestones ADD COLUMN IF NOT EXISTS stage   VARCHAR(20);
ALTER TABLE milestones ADD COLUMN IF NOT EXISTS shared  BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE milestones ADD COLUMN IF NOT EXISTS done_at VARCHAR(20);

-- 산출물: 버전·설명·승인 흐름
ALTER TABLE deliverables ADD COLUMN IF NOT EXISTS stage        VARCHAR(20);
ALTER TABLE deliverables ADD COLUMN IF NOT EXISTS version      VARCHAR(30);
ALTER TABLE deliverables ADD COLUMN IF NOT EXISTS note         TEXT;
ALTER TABLE deliverables ADD COLUMN IF NOT EXISTS status       VARCHAR(20) NOT NULL DEFAULT '작성 중';
ALTER TABLE deliverables ADD COLUMN IF NOT EXISTS milestone_id INTEGER REFERENCES milestones(id) ON DELETE SET NULL;
ALTER TABLE deliverables ADD COLUMN IF NOT EXISTS requested_at VARCHAR(20);
ALTER TABLE deliverables ADD COLUMN IF NOT EXISTS decided_at   VARCHAR(20);
ALTER TABLE deliverables ADD COLUMN IF NOT EXISTS decided_by   VARCHAR(100);
ALTER TABLE deliverables ADD COLUMN IF NOT EXISTS feedback     TEXT;

-- 작업
CREATE TABLE IF NOT EXISTS tasks (
  id          SERIAL PRIMARY KEY,
  project_id  INTEGER      NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title       VARCHAR(300) NOT NULL,
  stage       VARCHAR(20),
  assignee    VARCHAR(100),
  start_date  VARCHAR(20),
  due_date    VARCHAR(20)  NOT NULL,
  status      VARCHAR(20)  NOT NULL DEFAULT '할 일',  -- 할 일 | 진행 중 | 검토 | 완료 | 보류
  shared      BOOLEAN      NOT NULL DEFAULT TRUE,
  done_at     VARCHAR(20),
  created_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS tasks_project_idx ON tasks(project_id);

-- 주간 보고 (프로젝트·주마다 하나)
CREATE TABLE IF NOT EXISTS reports (
  id          SERIAL PRIMARY KEY,
  project_id  INTEGER     NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  week_of     VARCHAR(20) NOT NULL,   -- 그 주 월요일 YYYY-MM-DD
  done        TEXT        NOT NULL DEFAULT '',
  next        TEXT        NOT NULL DEFAULT '',
  issues      TEXT        NOT NULL DEFAULT '',
  asks        TEXT        NOT NULL DEFAULT '',
  author      VARCHAR(100),
  shared_at   VARCHAR(20),
  updated_at  TIMESTAMP   NOT NULL DEFAULT NOW(),
  UNIQUE (project_id, week_of)
);

-- 회의록
CREATE TABLE IF NOT EXISTS meetings (
  id          SERIAL PRIMARY KEY,
  project_id  INTEGER      NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  date        VARCHAR(20)  NOT NULL,
  title       VARCHAR(200) NOT NULL,
  attendees   TEXT         NOT NULL DEFAULT '',
  decisions   TEXT         NOT NULL DEFAULT '',
  actions     TEXT         NOT NULL DEFAULT '',
  shared_at   VARCHAR(20)
);

-- 요청·장애 신고·문의 (고객 포털 ↔ 어드민 요청함)
CREATE TABLE IF NOT EXISTS requests (
  id            SERIAL PRIMARY KEY,
  client_org_id INTEGER      NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  project_id    INTEGER      REFERENCES projects(id) ON DELETE SET NULL,
  kind          VARCHAR(20)  NOT NULL,                 -- 수정 요청 | 장애 신고 | 문의
  title         VARCHAR(200) NOT NULL,
  body          TEXT         NOT NULL DEFAULT '',
  requested_by  VARCHAR(100) NOT NULL DEFAULT '',
  status        VARCHAR(20)  NOT NULL DEFAULT '접수',  -- 접수 | 확인 | 처리 중 | 완료
  priority      VARCHAR(20)  NOT NULL DEFAULT '보통',  -- 긴급 | 높음 | 보통 | 낮음
  assignee      VARCHAR(100) NOT NULL DEFAULT '',
  reply         TEXT,
  replied_at    VARCHAR(20),
  memo          TEXT,
  created_at    TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- 고객 알림 (포털 홈 '최근 알림')
CREATE TABLE IF NOT EXISTS notifications (
  id            SERIAL PRIMARY KEY,
  client_org_id INTEGER   NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  text          TEXT      NOT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

-- 변경 기록 (어드민 전용)
CREATE TABLE IF NOT EXISTS activities (
  id          SERIAL PRIMARY KEY,
  project_id  INTEGER      NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  who         VARCHAR(100) NOT NULL,
  text        TEXT         NOT NULL,
  at          TIMESTAMP    NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS activities_project_idx ON activities(project_id, at DESC);
