/**
 * 커밋 메시지 형식: <type>: <설명>
 * 예) feat: GEO 진단 결과 화면 추가 / fix: 요금표 금액 오류 수정
 * type: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
 */
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // 한글·영문 약어(GEO, CRM)로 시작하는 제목 허용
    "subject-case": [0],
  },
};

export default config;
