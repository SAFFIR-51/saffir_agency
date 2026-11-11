/** 로그인과 회원 유형 (기획서 "로그인과 고객 포털") */

export const loginPurposes = ["서비스 둘러보기", "고객이 된 뒤 작업 보고·조회·결제"];

export const loginNotes = [
  "솔루션 자체는 포털 안에서 쓰지 않습니다. CRM 등은 고객사 전용 서버에 설치되고, 포털에는 그 주소로 가는 바로가기만 둡니다.",
  "saffirgeo 로그인과 기존 포털 로그인은 하나로 합칩니다.",
];

export const memberTypes = [
  {
    type: "일반 회원",
    target: "무료 진단·광고 검사 사용자, 도입 검토 중인 병원·기업",
    access: "GEO 진단 리포트·기록, 광고 검사 기록, 솔루션 데모 신청·견적 요청 내역",
  },
  {
    type: "구독 고객",
    target: "GEO 유료 등급 구독 병원",
    access: "일반 회원 + AI 가시성, 점수 추이, 경쟁 병원 비교, 구독·결제 관리",
  },
  {
    type: "클라이언트",
    target: "외주 계약 고객, 솔루션 도입 고객",
    access: "포털 메뉴 전체",
  },
];

/** 무료 회원가입으로 열리는 것 (병원 고객 흐름 2단계) */
export const signupBenefits = ["전체 근거·수정 코드 열람", "진단 기록 저장"];
export const signupCollects = ["병원명", "연락처"];
