/** 병원 고객 흐름 (기획서 "병원 고객 흐름") */
export const hospitalJourney = [
  {
    step: "무료 진단",
    detail: "홈페이지 주소를 넣으면 로그인 없이 총점, 영역별 점수, 우선 개선 항목을 봅니다.",
    service: "AI 검색 최적화",
  },
  {
    step: "무료 회원가입",
    detail: "전체 근거와 수정 코드를 보고, 진단 기록을 저장합니다.",
    service: "AI 검색 최적화",
  },
  {
    step: "월간 추적",
    detail: "매달 재진단과 AI 가시성 측정을 받습니다 (모니터링·프로).",
    service: "AI 검색 최적화",
  },
  {
    step: "홈페이지 개선",
    detail: "직접 고치기 어렵거나 점수가 낮으면 제작·리뉴얼을 맡깁니다.",
    service: "병원 홈페이지",
  },
  {
    step: "월 관리",
    detail: "납품 후 GEO 관리형 또는 유지보수로 관리합니다.",
    service: "AI 검색 최적화 · 병원 홈페이지",
  },
  {
    step: "환자 관리",
    detail: "홈페이지로 들어온 예약·문의를 환자 관리와 재방문으로 이어갑니다.",
    service: "병원 CRM",
  },
];

export const hospitalDifferentiator = {
  title: "한 곳에 맡기면 성과가 이어집니다",
  description:
    "AI 검색, 홈페이지, 환자 관리를 사피어가 함께 맡으면 AI 검색으로 들어온 신환이 실제로 내원했는지, 재진율이 얼마인지 이어서 볼 수 있습니다.",
};

/** CRM 보안 (기획서: 병원 CRM 페이지에는 보안 설명을 꼭 넣는다) */
export const crmSecurity = {
  items: ["병원별 전용 서버·DB", "암호화", "접근 권한", "백업 정책"],
  messaging: "리콜 문자: 수신 동의 확인, 야간 발송 제한",
};

/** CRM 데모 (기획서 "로그인과 고객 포털" 마지막 단락) */
export const crmDemo = [
  "샘플 병원 데이터가 들어간 데모 환경에서 직접 써볼 수 있습니다.",
  "데모를 신청하면 기한이 있는 체험 계정을 드립니다.",
];
