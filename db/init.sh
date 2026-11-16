#!/bin/bash
# PostgreSQL 빈 볼륨(신규 기동)에서만 실행됩니다.
# db/dump.sql 이 있으면 덤프 복원, 없으면 스키마 신규 생성.
set -e

DUMP=/db/dump.sql
SCHEMA=/db/schema.sql

if [ -f "$DUMP" ]; then
  echo "[DB] dump.sql 감지 → 덤프 복원 중..."
  psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" < "$DUMP"
  echo "[DB] 덤프 복원 완료"
else
  echo "[DB] dump.sql 없음 → 신규 스키마 생성 중..."
  psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" < "$SCHEMA"
  echo "[DB] 스키마 생성 완료"
fi
