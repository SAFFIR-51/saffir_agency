-- 데모 계정과 프로젝트 관리 예시 데이터 (로컬·심사용). 운영 DB에는 넣지 않는다.
-- 이름·회사는 모두 예시다 (실제 고객 아님). 비밀번호는 모두 saffir-demo-2026 (화면 데모 계정과 같음).
-- 실행: docker compose -f docker-compose.dev.yml exec -T db psql -U saffir -d saffir < db/seeds/demo.sql
-- 여러 번 실행해도 된다: 계정은 비밀번호·권한만 다시 맞추고, 예시 프로젝트는 '데모 커머스'가 없을 때만 넣는다.
-- src/server/projects/seed.ts(화면 데모 데이터)에서 만든 파일이다.
BEGIN;

INSERT INTO users (name, email, provider, password_hash, role) VALUES ('데모 실장', 'member@demo.saffir.co.kr', 'local', 'scrypt$a1cc40a504994842c4b4296c3873ecde$c104d6838ac7e81ff9f385a880cda8c023888a5d01a4429031c6bdc206bad66dac8c22982b5cc48039065921f53b0009acf51897954e4a3baeae6732076c4e7b', 'client')
  ON CONFLICT (email) DO UPDATE SET provider = 'local', password_hash = EXCLUDED.password_hash, role = EXCLUDED.role;
INSERT INTO users (name, email, provider, password_hash, role) VALUES ('데모 원장', 'geo@demo.saffir.co.kr', 'local', 'scrypt$7e8db9bdc06706f5ffc0b3ff3b736e2c$ead2df8c4decc58014ea69df6a44468e5f3a6d583bd922b4e4b8133119488c3f43727b1edd2ca89f9eea84cdca1ff868935d4378c6222a019b3925909d64fc99', 'client')
  ON CONFLICT (email) DO UPDATE SET provider = 'local', password_hash = EXCLUDED.password_hash, role = EXCLUDED.role;
INSERT INTO users (name, email, provider, password_hash, role) VALUES ('데모 팀장', 'project@demo.saffir.co.kr', 'local', 'scrypt$65a6c8bb4a647ed2fdf7fd5105aa07f4$39e1fe1d84a955b506da5f7f8cd779e8e233476daf31f8d9422351dade61c2e06df0ca52048b018830581e0d041139e843c1f63000af0d88a4aef78054f55aee', 'client')
  ON CONFLICT (email) DO UPDATE SET provider = 'local', password_hash = EXCLUDED.password_hash, role = EXCLUDED.role;
INSERT INTO users (name, email, provider, password_hash, role) VALUES ('데모 실장', 'solution@demo.saffir.co.kr', 'local', 'scrypt$5b857a25d96bacb2afcf9906a75cdb42$b280358bc3b58c5509506896c8865f6a033c2d68e764acbe04148d3a454e216b774eb2e2dae04554b670705a2d29936dddc9cd8068e8109d418df9fc24ee12f9', 'client')
  ON CONFLICT (email) DO UPDATE SET provider = 'local', password_hash = EXCLUDED.password_hash, role = EXCLUDED.role;
INSERT INTO users (name, email, provider, password_hash, role) VALUES ('데모 담당자', 'review@demo.saffir.co.kr', 'local', 'scrypt$5fd0e9d8f2caa68e697a7395c74fc050$5fb05888b5c165f3c82584cca691a74103796e9de24d00de361a8e2f5d3c160d53b2ea36c5fe20a72c38341dc264762e436b95f20cb9f82c31ab475ecf31fa25', 'client')
  ON CONFLICT (email) DO UPDATE SET provider = 'local', password_hash = EXCLUDED.password_hash, role = EXCLUDED.role;
INSERT INTO users (name, email, provider, password_hash, role) VALUES ('데모 PM', 'staff@demo.saffir.co.kr', 'local', 'scrypt$3136cab8cd101a9c92e7d56abcf354f3$3326a9555544dbe275762827d690fe2beed87b14cf3cd258255ab3ed966824ec1079c69b71959769782d0782839df62eec96fd09eb9ec05a55b493a70696ea20', 'staff')
  ON CONFLICT (email) DO UPDATE SET provider = 'local', password_hash = EXCLUDED.password_hash, role = EXCLUDED.role;

-- 화면 데모와 같은 병원·회사명 (비어 있을 때만)
UPDATE users SET organization = '데모 치과의원', customer_type = '병원' WHERE email = 'member@demo.saffir.co.kr' AND organization IS NULL;
UPDATE users SET organization = '데모 피부과의원', customer_type = '병원' WHERE email = 'geo@demo.saffir.co.kr' AND organization IS NULL;
UPDATE users SET organization = '데모 커머스', customer_type = '기업' WHERE email = 'project@demo.saffir.co.kr' AND organization IS NULL;
UPDATE users SET organization = '데모 내과의원', customer_type = '병원' WHERE email = 'solution@demo.saffir.co.kr' AND organization IS NULL;
UPDATE users SET organization = '데모 종합병원', customer_type = '병원' WHERE email = 'review@demo.saffir.co.kr' AND organization IS NULL;

DO $$
DECLARE
  cid jsonb := '{}'; pid jsonb := '{}'; mid jsonb := '{}'; v INTEGER;
BEGIN
  IF EXISTS (SELECT 1 FROM clients WHERE name = '데모 커머스') THEN RETURN; END IF;
  INSERT INTO staff (name) VALUES ('데모 PM') ON CONFLICT (name) DO NOTHING;
  INSERT INTO staff (name) VALUES ('데모 디자이너') ON CONFLICT (name) DO NOTHING;
  INSERT INTO staff (name) VALUES ('데모 개발자') ON CONFLICT (name) DO NOTHING;
  INSERT INTO staff (name) VALUES ('데모 QA') ON CONFLICT (name) DO NOTHING;
  UPDATE staff SET user_id = (SELECT id FROM users WHERE email = 'staff@demo.saffir.co.kr') WHERE name = '데모 PM';
  INSERT INTO clients (name) VALUES ('데모 커머스') RETURNING id INTO v; cid := cid || jsonb_build_object('c-commerce', v);
  INSERT INTO client_members (client_id, user_id) SELECT v, id FROM users WHERE email = 'project@demo.saffir.co.kr' ON CONFLICT DO NOTHING;
  INSERT INTO client_members (client_id, user_id) SELECT v, id FROM users WHERE email = 'review@demo.saffir.co.kr' ON CONFLICT DO NOTHING;
  INSERT INTO clients (name) VALUES ('데모 내과의원') RETURNING id INTO v; cid := cid || jsonb_build_object('c-clinic', v);
  INSERT INTO client_members (client_id, user_id) SELECT v, id FROM users WHERE email = 'solution@demo.saffir.co.kr' ON CONFLICT DO NOTHING;
  INSERT INTO client_members (client_id, user_id) SELECT v, id FROM users WHERE email = 'review@demo.saffir.co.kr' ON CONFLICT DO NOTHING;
  INSERT INTO projects (name, client_org_id, status, start_date, target_date, stage, pm, archived_at) VALUES ('자사몰 웹앱 MVP', (cid->>'c-commerce')::int, 'active', '2026-09-15', '2026-12-20', '개발', '데모 PM', NULL) RETURNING id INTO v; pid := pid || jsonb_build_object('demo-mvp', v);
  INSERT INTO milestones (project_id, ord, title, date, status, stage, shared, done_at) VALUES ((pid->>'demo-mvp')::int, 1, '착수 미팅', '2026-09-15', 'done', '착수', TRUE, '2026-09-15') RETURNING id INTO v; mid := mid || jsonb_build_object('demo-mvp/m1', v);
  INSERT INTO milestones (project_id, ord, title, date, status, stage, shared, done_at) VALUES ((pid->>'demo-mvp')::int, 2, '화면 정의서 확정', '2026-09-30', 'done', '기획', TRUE, '2026-10-02') RETURNING id INTO v; mid := mid || jsonb_build_object('demo-mvp/m2', v);
  INSERT INTO milestones (project_id, ord, title, date, status, stage, shared, done_at) VALUES ((pid->>'demo-mvp')::int, 3, '디자인 시안 확정', '2026-10-20', 'done', '디자인', TRUE, '2026-10-22') RETURNING id INTO v; mid := mid || jsonb_build_object('demo-mvp/m3', v);
  INSERT INTO milestones (project_id, ord, title, date, status, stage, shared, done_at) VALUES ((pid->>'demo-mvp')::int, 4, '개발 1차 테스트 주소 전달', '2026-11-07', 'done', '개발', TRUE, '2026-11-07') RETURNING id INTO v; mid := mid || jsonb_build_object('demo-mvp/m4', v);
  INSERT INTO milestones (project_id, ord, title, date, status, stage, shared, done_at) VALUES ((pid->>'demo-mvp')::int, 5, '개발 2차 테스트 주소 전달', '2026-11-21', 'pending', '개발', TRUE, NULL) RETURNING id INTO v; mid := mid || jsonb_build_object('demo-mvp/m5', v);
  INSERT INTO milestones (project_id, ord, title, date, status, stage, shared, done_at) VALUES ((pid->>'demo-mvp')::int, 6, '개발 완료', '2026-11-28', 'pending', '개발', TRUE, NULL) RETURNING id INTO v; mid := mid || jsonb_build_object('demo-mvp/m6', v);
  INSERT INTO milestones (project_id, ord, title, date, status, stage, shared, done_at) VALUES ((pid->>'demo-mvp')::int, 7, '검수 완료', '2026-12-12', 'pending', '검수', TRUE, NULL) RETURNING id INTO v; mid := mid || jsonb_build_object('demo-mvp/m7', v);
  INSERT INTO milestones (project_id, ord, title, date, status, stage, shared, done_at) VALUES ((pid->>'demo-mvp')::int, 8, '오픈', '2026-12-20', 'pending', '운영', TRUE, NULL) RETURNING id INTO v; mid := mid || jsonb_build_object('demo-mvp/m8', v);
  INSERT INTO tasks (project_id, title, stage, assignee, start_date, due_date, status, shared, done_at) VALUES ((pid->>'demo-mvp')::int, '회원가입·로그인', '개발', '데모 개발자', NULL, '2026-10-31', '완료', TRUE, '2026-10-30');
  INSERT INTO tasks (project_id, title, stage, assignee, start_date, due_date, status, shared, done_at) VALUES ((pid->>'demo-mvp')::int, '상품 목록·상세', '개발', '데모 개발자', NULL, '2026-11-07', '완료', TRUE, '2026-11-06');
  INSERT INTO tasks (project_id, title, stage, assignee, start_date, due_date, status, shared, done_at) VALUES ((pid->>'demo-mvp')::int, '장바구니·주문 화면', '개발', '데모 개발자', NULL, '2026-11-14', '완료', TRUE, '2026-11-13');
  INSERT INTO tasks (project_id, title, stage, assignee, start_date, due_date, status, shared, done_at) VALUES ((pid->>'demo-mvp')::int, '결제 모듈 연동', '개발', '데모 개발자', NULL, '2026-11-14', '완료', TRUE, '2026-11-14');
  INSERT INTO tasks (project_id, title, stage, assignee, start_date, due_date, status, shared, done_at) VALUES ((pid->>'demo-mvp')::int, '회원 등급 할인', '개발', '데모 개발자', NULL, '2026-11-19', '진행 중', TRUE, NULL);
  INSERT INTO tasks (project_id, title, stage, assignee, start_date, due_date, status, shared, done_at) VALUES ((pid->>'demo-mvp')::int, '관리자 주문 관리', '개발', '데모 개발자', NULL, '2026-11-21', '할 일', TRUE, NULL);
  INSERT INTO tasks (project_id, title, stage, assignee, start_date, due_date, status, shared, done_at) VALUES ((pid->>'demo-mvp')::int, '배송 업체 API 연동', '개발', '데모 개발자', NULL, '2026-11-20', '보류', TRUE, NULL);
  INSERT INTO tasks (project_id, title, stage, assignee, start_date, due_date, status, shared, done_at) VALUES ((pid->>'demo-mvp')::int, '상품 상세 리뷰 정렬 (REQ-031)', '개발', '데모 개발자', NULL, '2026-11-18', '검토', TRUE, NULL);
  INSERT INTO tasks (project_id, title, stage, assignee, start_date, due_date, status, shared, done_at) VALUES ((pid->>'demo-mvp')::int, '개발 서버 비용 정리', '개발', '데모 PM', NULL, '2026-11-20', '할 일', FALSE, NULL);
  INSERT INTO tasks (project_id, title, stage, assignee, start_date, due_date, status, shared, done_at) VALUES ((pid->>'demo-mvp')::int, '검수 체크리스트 작성', '검수', '데모 QA', NULL, '2026-11-27', '할 일', TRUE, NULL);
  INSERT INTO deliverables (project_id, name, type, url, date, stage, version, note, status, milestone_id, requested_at, decided_at, decided_by, feedback) VALUES ((pid->>'demo-mvp')::int, '화면 정의서', 'LINK', NULL, '2026-10-02', '기획', 'v1.2', '회원·상품·주문·관리자 화면 42개', '승인 완료', (mid->>'demo-mvp/m2')::int, '2026-09-30', '2026-10-02', '데모 팀장', NULL);
  INSERT INTO deliverables (project_id, name, type, url, date, stage, version, note, status, milestone_id, requested_at, decided_at, decided_by, feedback) VALUES ((pid->>'demo-mvp')::int, '디자인 시안', 'LINK', NULL, '2026-10-22', '디자인', 'v2', '메인·상품 상세·장바구니', '승인 완료', (mid->>'demo-mvp/m3')::int, '2026-10-20', '2026-10-22', '데모 팀장', NULL);
  INSERT INTO deliverables (project_id, name, type, url, date, stage, version, note, status, milestone_id, requested_at, decided_at, decided_by, feedback) VALUES ((pid->>'demo-mvp')::int, '개발 1차 테스트 주소', 'LINK', NULL, '2026-11-07', '개발', '1차', '회원가입, 상품 목록·상세', '승인 요청', (mid->>'demo-mvp/m4')::int, '2026-11-07', NULL, NULL, NULL);
  INSERT INTO deliverables (project_id, name, type, url, date, stage, version, note, status, milestone_id, requested_at, decided_at, decided_by, feedback) VALUES ((pid->>'demo-mvp')::int, '개발 2차 테스트 주소', 'LINK', NULL, '2026-11-14', '개발', '2차', '장바구니, 주문, 결제', '작성 중', (mid->>'demo-mvp/m5')::int, NULL, NULL, NULL, NULL);
  INSERT INTO reports (project_id, week_of, done, next, issues, asks, author, shared_at) VALUES ((pid->>'demo-mvp')::int, '2026-11-09', '장바구니·주문 화면 개발
결제 모듈 연동', '회원 등급 할인
관리자 주문 관리', '배송 업체 API 키를 받지 못해 배송 연동이 보류 중입니다.', '배송 업체 API 키 전달 부탁드립니다.', '데모 PM', '2026-11-14');
  INSERT INTO reports (project_id, week_of, done, next, issues, asks, author, shared_at) VALUES ((pid->>'demo-mvp')::int, '2026-11-02', '상품 목록·상세 개발
개발 1차 테스트 주소 전달', '장바구니·주문', '', '1차 테스트 주소 확인 후 승인 부탁드립니다.', '데모 PM', '2026-11-07');
  INSERT INTO reports (project_id, week_of, done, next, issues, asks, author, shared_at) VALUES ((pid->>'demo-mvp')::int, '2026-10-26', '개발 환경 구성
회원가입·로그인', '상품 목록·상세', '', '', '데모 PM', '2026-10-31');
  INSERT INTO meetings (project_id, date, title, attendees, decisions, actions, shared_at) VALUES ((pid->>'demo-mvp')::int, '2026-11-12', '주간 정례 미팅', '데모 팀장, 데모 매니저 / 데모 PM, 데모 개발자', '회원 등급 3단계로 확정
배송비 정책은 다음 주 결정', '고객: 배송 업체 API 키 전달 (11-18)
사피어: 회원 등급 할인 반영 (11-19)', '2026-11-12');
  INSERT INTO meetings (project_id, date, title, attendees, decisions, actions, shared_at) VALUES ((pid->>'demo-mvp')::int, '2026-10-22', '디자인 확정 미팅', '데모 팀장 / 데모 PM, 데모 디자이너', '시안 v2로 확정
메인 배너 2종 추가', '사피어: 배너 2종 시안 (10-24)', '2026-10-22');
  INSERT INTO activities (project_id, who, text, at) VALUES ((pid->>'demo-mvp')::int, '데모 PM', '46주차 보고를 고객에게 공유했습니다.', '2026-11-14 18:10'::timestamp);
  INSERT INTO activities (project_id, who, text, at) VALUES ((pid->>'demo-mvp')::int, '데모 PM', '회의록 ''주간 정례 미팅''을 공유했습니다.', '2026-11-12 16:30'::timestamp);
  INSERT INTO activities (project_id, who, text, at) VALUES ((pid->>'demo-mvp')::int, '데모 PM', '산출물 ''개발 1차 테스트 주소 1차'' 승인을 요청했습니다.', '2026-11-07 17:05'::timestamp);
  INSERT INTO projects (name, client_org_id, status, start_date, target_date, stage, pm, archived_at) VALUES ('병원 CRM 도입·세팅', (cid->>'c-clinic')::int, 'active', '2026-08-18', '2026-12-31', '운영', '데모 PM', NULL) RETURNING id INTO v; pid := pid || jsonb_build_object('demo-crm', v);
  INSERT INTO milestones (project_id, ord, title, date, status, stage, shared, done_at) VALUES ((pid->>'demo-crm')::int, 1, '도입 범위 확정', '2026-08-18', 'done', '착수', TRUE, '2026-08-18') RETURNING id INTO v; mid := mid || jsonb_build_object('demo-crm/c1', v);
  INSERT INTO milestones (project_id, ord, title, date, status, stage, shared, done_at) VALUES ((pid->>'demo-crm')::int, 2, '환자 데이터 이관', '2026-08-25', 'done', '개발', TRUE, '2026-08-27') RETURNING id INTO v; mid := mid || jsonb_build_object('demo-crm/c2', v);
  INSERT INTO milestones (project_id, ord, title, date, status, stage, shared, done_at) VALUES ((pid->>'demo-crm')::int, 3, '직원 교육', '2026-08-29', 'done', '검수', TRUE, '2026-08-29') RETURNING id INTO v; mid := mid || jsonb_build_object('demo-crm/c3', v);
  INSERT INTO milestones (project_id, ord, title, date, status, stage, shared, done_at) VALUES ((pid->>'demo-crm')::int, 4, '운영 시작', '2026-09-01', 'done', '운영', TRUE, '2026-09-01') RETURNING id INTO v; mid := mid || jsonb_build_object('demo-crm/c4', v);
  INSERT INTO milestones (project_id, ord, title, date, status, stage, shared, done_at) VALUES ((pid->>'demo-crm')::int, 5, '11월 운영 점검', '2026-11-28', 'pending', '운영', TRUE, NULL) RETURNING id INTO v; mid := mid || jsonb_build_object('demo-crm/c5', v);
  INSERT INTO milestones (project_id, ord, title, date, status, stage, shared, done_at) VALUES ((pid->>'demo-crm')::int, 6, '12월 운영 점검', '2026-12-31', 'pending', '운영', TRUE, NULL) RETURNING id INTO v; mid := mid || jsonb_build_object('demo-crm/c6', v);
  INSERT INTO tasks (project_id, title, stage, assignee, start_date, due_date, status, shared, done_at) VALUES ((pid->>'demo-crm')::int, '리콜 문자 미발송 원인 확인 (REQ-044)', '운영', '데모 개발자', NULL, '2026-11-13', '진행 중', TRUE, NULL);
  INSERT INTO tasks (project_id, title, stage, assignee, start_date, due_date, status, shared, done_at) VALUES ((pid->>'demo-crm')::int, '11월 메시지 발송 리포트', '운영', '데모 PM', NULL, '2026-11-28', '할 일', TRUE, NULL);
  INSERT INTO tasks (project_id, title, stage, assignee, start_date, due_date, status, shared, done_at) VALUES ((pid->>'demo-crm')::int, '서버 사용량 점검', '운영', '데모 개발자', NULL, '2026-11-25', '할 일', FALSE, NULL);
  INSERT INTO requests (id, client_org_id, project_id, kind, title, body, requested_by, status, priority, assignee, reply, replied_at, memo, created_at) VALUES (44, (cid->>'c-clinic')::int, (pid->>'demo-crm')::int, '장애 신고', '리콜 문자 예약이 일부 발송되지 않음', '11월 10일 예약한 리콜 문자 중 일부가 발송되지 않았습니다.', '데모 실장', '확인', '긴급', '데모 개발자', '원인을 확인 중입니다. 오늘 안에 다시 알려 드리겠습니다.', '2026-11-11', '발송 큐 재시도 로그 확인 필요', '2026-11-11'::timestamp) ON CONFLICT (id) DO NOTHING;
  INSERT INTO requests (id, client_org_id, project_id, kind, title, body, requested_by, status, priority, assignee, reply, replied_at, memo, created_at) VALUES (31, (cid->>'c-commerce')::int, (pid->>'demo-mvp')::int, '수정 요청', '상품 상세 리뷰 정렬을 최신순으로', '리뷰가 오래된 순으로 보여서 최신순 기본 정렬로 바꿔 주세요.', '데모 팀장', '처리 중', '보통', '데모 개발자', '2차 테스트 주소에 반영 예정입니다.', '2026-11-10', NULL, '2026-11-10'::timestamp) ON CONFLICT (id) DO NOTHING;
  INSERT INTO requests (id, client_org_id, project_id, kind, title, body, requested_by, status, priority, assignee, reply, replied_at, memo, created_at) VALUES (27, (cid->>'c-commerce')::int, (pid->>'demo-mvp')::int, '수정 요청', '로그인 화면 문구 수정', '''로그인 유지'' 문구를 ''자동 로그인''으로 바꿔 주세요.', '데모 매니저', '완료', '낮음', '데모 개발자', '반영했습니다.', '2026-11-05', NULL, '2026-11-04'::timestamp) ON CONFLICT (id) DO NOTHING;
  -- 청구 (포털 '청구·결제'). 화면 데모와 같은 금액
  INSERT INTO payments (project_id, title, amount, date, paid_at) VALUES ((pid->>'demo-mvp')::int, '웹앱 MVP 계약금', 2200000, '2026-09-15', '2026-09-15 10:00'::timestamp);
  INSERT INTO payments (project_id, title, amount, date) VALUES ((pid->>'demo-mvp')::int, '웹앱 MVP 잔금 (검수 후)', 3300000, '2026-12-20');
  PERFORM setval(pg_get_serial_sequence('requests', 'id'), GREATEST((SELECT MAX(id) FROM requests), 1));
  INSERT INTO notifications (client_org_id, text, created_at) VALUES ((cid->>'c-commerce')::int, '46주차 작업 보고가 올라왔습니다.', '2026-11-14'::timestamp);
  INSERT INTO notifications (client_org_id, text, created_at) VALUES ((cid->>'c-commerce')::int, '개발 1차 테스트 주소를 확인하고 승인해 주세요.', '2026-11-07'::timestamp);
  INSERT INTO notifications (client_org_id, text, created_at) VALUES ((cid->>'c-clinic')::int, '장애 신고 REQ-044에 답변이 달렸습니다.', '2026-11-11'::timestamp);
END $$;

-- GEO 진단 기록 (포털 GEO). 화면 데모와 같은 점수. 사이트가 처음 연결될 때만 넣는다
DO $$
DECLARE
  sid INTEGER;
  sub_areas JSON := '[{"name":"검색 노출 기본","score":85},{"name":"구조화데이터","score":72},{"name":"진료 정보 콘텐츠","score":70},{"name":"신뢰 신호","score":81}]';
  sub_pri JSON := '["진료과목 페이지에 FAQ 구조화데이터 추가","의료진 소개에 자격·경력 표시","오시는 길 페이지 주소 표기 통일"]';
  sub_vis JSON := '[{"ai":"ChatGPT","appeared":9,"asked":20},{"ai":"Gemini","appeared":7,"asked":20},{"ai":"Perplexity","appeared":11,"asked":20}]';
  acct TEXT;
BEGIN
  -- 무료 진단 회원
  INSERT INTO geo_sites (user_id, site_url, plan)
    SELECT id, 'https://dental.demo.saffir.co.kr', 'free' FROM users WHERE email = 'member@demo.saffir.co.kr'
    ON CONFLICT (user_id) DO NOTHING RETURNING id INTO sid;
  IF sid IS NOT NULL THEN
    INSERT INTO geo_diagnoses (site_id, date, score, areas, priorities) VALUES (sid, '2026-11-03', 58,
      '[{"name":"검색 노출 기본","score":70},{"name":"구조화데이터","score":35},{"name":"진료 정보 콘텐츠","score":55},{"name":"신뢰 신호","score":62}]',
      '["병원 정보 구조화데이터 추가","진료 항목별 페이지 분리","모바일 속도 개선"]');
    INSERT INTO geo_ad_checks (site_id, date, summary, risks) VALUES (sid, '2026-11-03', '임플란트 할인 문구', 3);
  END IF;

  -- GEO 구독 (구독 회원, 심사용 계정)
  FOREACH acct IN ARRAY ARRAY['geo@demo.saffir.co.kr', 'review@demo.saffir.co.kr'] LOOP
    sid := NULL;
    INSERT INTO geo_sites (user_id, site_url, plan)
      SELECT id, 'https://derma.demo.saffir.co.kr', 'pro' FROM users WHERE email = acct
      ON CONFLICT (user_id) DO NOTHING RETURNING id INTO sid;
    IF sid IS NOT NULL THEN
      INSERT INTO geo_diagnoses (site_id, date, score, areas, priorities) VALUES
        (sid, '2026-08-01', 61, '[]', '[]'),
        (sid, '2026-09-01', 68, '[]', '[]'),
        (sid, '2026-10-01', 74, '[]', '[]');
      INSERT INTO geo_diagnoses (site_id, date, score, areas, priorities, visibility)
        VALUES (sid, '2026-11-01', 78, sub_areas, sub_pri, sub_vis);
      INSERT INTO geo_ad_checks (site_id, date, summary, risks) VALUES
        (sid, '2026-10-20', '의료진 소개 문구', 0),
        (sid, '2026-11-05', '레이저 시술 이벤트 문구', 2);
    END IF;
  END LOOP;
END $$;

COMMIT;
