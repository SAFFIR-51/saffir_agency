import { faqForService } from "@/content/faq";
import { routes } from "@/shared/config";
import type { SolutionPageContent } from "@/shared/sections";
import type { JourneyIconName } from "../components/journey-icon";

/** 진행 흐름 목록 한 줄: 고객 흐름 단계를 가리키거나, 직접 쓴 항목 */
type JourneyItem =
  | { journeyIndex: number; icon: JourneyIconName }
  | { title: string; detail: string; icon: JourneyIconName };

/** 병원 솔루션 소개(/hospital) 문구. 이미지는 아직 없어서 자리만 표시한다. */
export const hospitalOverviewContent = {
  hero: {
    title: ["AI 검색부터 환자 관리까지", "병원 성장을 한 곳에서"],
    lead: "AI 검색 진단, 병원 홈페이지, 월 관리, 환자 관리를\n하나의 흐름으로 이어서 맡길 수 있습니다.",
    primary: "무료 진단하기",
    secondary: "패키지 상담",
    /** 히어로 아래 흐름 그림. 화면 속 값은 모두 예시다 (실제 병원·수치 아님). */
    flow: {
      sampleLabel: "예시 화면",
      ariaLabel: "AI 검색 진단에서 병원 홈페이지, 환자 관리로 이어지는 흐름 예시",
      diagnosis: {
        title: "AI 검색 진단",
        panel: "개선할 점 발견",
        hospital: "샘플 피부과",
        hospitalMeta: "홈페이지 진단 결과",
        items: ["진료 시간 정보가 없음", "진료 항목 설명이 부족함"],
      },
      website: {
        title: "병원 홈페이지",
        panel: "이렇게 고칩니다",
        groups: [
          { label: "진료 안내", tags: ["진료 항목별 페이지", "진료 시간"] },
          { label: "예약 연결", tags: ["네이버 예약", "카카오 채널"] },
          { label: "AI 검색", tags: ["구조화데이터 적용"] },
        ],
      },
      crm: {
        title: "환자 관리",
        panel: "진료 이후",
        rows: [
          { title: "리콜 안내", detail: "다음 진료 시기에 맞춰 문자 발송" },
          { title: "사후 관리", detail: "시술 후 주의사항 안내" },
          { title: "환자 분류", detail: "진료 항목별로 묶어서 관리" },
        ],
      },
    },
  },
  journey: {
    title: "사피어의 병원 성장 솔루션 4가지",
    description:
      "AI 검색 최적화 · 의료광고 검사 · 병원 홈페이지 · 환자 관리까지.\n환자가 찾고, 예약하고, 다시 오는 흐름을 한 번에 만듭니다.",
    /**
     * 단계마다 목록 4개. journeyIndex는 기획서 병원 고객 흐름(content/hospital)의 순서,
     * 나머지는 서비스 기획(병원 홈페이지·의료광고 검사기·CRM)에서 가져온 항목.
     */
    stages: [
      {
        title: "AI 검색에서 우리 병원이 보이게",
        items: [
          { journeyIndex: 0, icon: "diagnose" },
          {
            title: "분야별 진단 항목",
            detail: "8개 분야 50여 항목으로 AI 검색에 필요한 정보를 점검합니다.",
            icon: "list",
          },
          { journeyIndex: 1, icon: "signup" },
          { journeyIndex: 2, icon: "track" },
        ] as JourneyItem[],
        link: { label: "AI 검색 최적화 보기", href: routes.hospital.geo },
        image: "AI 검색 진단 화면",
      },
      {
        title: "광고 문구, 올리기 전에 먼저 확인",
        items: [
          {
            title: "문구 붙여넣기",
            detail: "광고·홈페이지 문구를 입력창에 붙여 넣으면 바로 검사합니다.",
            icon: "textbox",
          },
          {
            title: "위험 표현 표시",
            detail: "의료법 제56조에 걸릴 수 있는 표현을 찾아 표시합니다.",
            icon: "shield",
          },
          {
            title: "무료로 검사",
            detail: "무료 회원은 월 5회, 모니터링 이상 구독은 횟수 제한 없이 검사합니다.",
            icon: "repeat",
          },
          {
            title: "참고용 결과",
            detail: "법률 자문이 아니라, 올리기 전에 미리 확인하는 참고 도구입니다.",
            icon: "info",
          },
        ] as JourneyItem[],
        link: { label: "의료광고 검사기 보기", href: routes.hospital.adCheck },
        image: "의료광고 검사 화면",
      },
      {
        title: "홈페이지에서 예약·상담으로",
        items: [
          { journeyIndex: 3, icon: "website" },
          {
            title: "진료 항목별 페이지",
            detail: "진료 항목마다 페이지를 나눠 AI 검색이 읽기 쉽게 정리합니다.",
            icon: "pages",
          },
          {
            title: "예약·상담 연결",
            detail: "네이버 예약과 카카오 채널을 홈페이지에 연결합니다.",
            icon: "link",
          },
          { journeyIndex: 4, icon: "calendar" },
        ] as JourneyItem[],
        link: { label: "병원 홈페이지 보기", href: routes.hospital.website },
        image: "병원 홈페이지 화면",
      },
      {
        title: "진료가 끝난 뒤에도 이어지는 환자 관리",
        items: [
          { journeyIndex: 5, icon: "clipboard" },
          {
            title: "환자 분류",
            detail: "진료 항목과 방문 이력으로 환자를 나눠 관리합니다.",
            icon: "layers",
          },
          {
            title: "리콜·사후관리 메시지",
            detail: "다음 진료 시기와 시술 후 안내를 문자로 보냅니다.",
            icon: "message",
          },
          {
            title: "병원별 전용 서버·데이터 분리",
            detail: "병원마다 전용 서버에 따로 설치해 데이터를 나눠 둡니다.",
            icon: "server",
          },
        ] as JourneyItem[],
        link: { label: "병원 CRM 보기", href: routes.hospital.crm },
        image: "병원 CRM 화면",
      },
    ],
  },
  /** 진행 흐름 3단계 오른쪽 그림: 사진 + 예시 화면 카드 (모든 값은 예시) */
  journeyVisual: {
    search: {
      photo: "/hospital/journey-1.webp",
      ai: {
        label: "AI 검색 답변",
        text: "강남역 근처에서 저녁에 진료하는 피부과로 샘플 피부과가 있어요. 진료 시간과 진료 항목이 홈페이지에 정리돼 있고, 바로 예약할 수 있어요.",
      },
      patient: { label: "환자", text: "좋아요, 거기로 예약할게요." },
    },
    adCheck: {
      title: "의료광고 문구 검사",
      status: "검사 완료",
      parts: [
        { text: "시술 후 ", risky: false },
        { text: "부작용 없이", risky: true },
        { text: " 누구나 ", risky: false },
        { text: "100% 효과", risky: true },
        { text: "를 볼 수 있습니다.", risky: false },
      ],
      resultLabel: "위험 표현",
      note: "참고용 결과이며 법률 자문이 아닙니다.",
    },
    website: {
      photo: "/hospital/journey-2.webp",
      title: "예약 연결",
      status: "연결됨",
      when: { label: "환자가", text: "진료 항목 페이지에서 예약 버튼을 누르면" },
      then: { label: "바로", text: "네이버 예약 · 카카오 채널 상담으로 이어집니다" },
      checks: ["진료 항목별 페이지", "예약·상담 버튼", "구조화데이터"],
      checkStatus: "적용",
    },
    care: {
      title: "샘플 환자 A · 레이저 시술",
      status: "관리 중",
      rows: [
        {
          when: "시술 당일",
          title: "시술 후 주의사항 안내",
          detail: "세안·화장 시기 안내",
          channel: "문자",
        },
        {
          when: "3일 후",
          title: "경과 확인 메시지",
          detail: "불편한 점이 있으면 바로 상담",
          channel: "카카오",
        },
        {
          when: "2주 후",
          title: "재방문 안내",
          detail: "다음 진료 시기에 맞춰 발송",
          channel: "문자",
        },
        {
          when: "4주 후",
          title: "다음 진료 예약 확인",
          detail: "예약 일정 다시 안내",
          channel: "카카오",
        },
      ],
    },
  },
  /** 신뢰 섹션 (delight "고객의 신뢰" 벤토 배치 참고) */
  trust: {
    title: "믿고 맡길 수 있도록, 처음부터 끝까지",
    together: {
      title: "한 팀이 맡으면 흐름이 끊기지 않습니다",
      description:
        "AI 검색, 홈페이지, 환자 관리를 사피어가 함께 맡으면 어디서 들어온 문의인지부터 이후 관리까지 한 흐름으로 이어서 볼 수 있습니다.",
      steps: [
        { no: "01", name: "AI 검색 최적화" },
        { no: "02", name: "의료광고 검사" },
        { no: "03", name: "병원 홈페이지" },
        { no: "04", name: "병원 CRM" },
      ],
    },
    security: {
      title: "환자 정보는 병원별로 따로 지킵니다",
      description: "병원 CRM은 병원마다 전용 서버에 따로 설치합니다.",
      seals: [
        ["병원별", "전용 서버·DB"],
        ["데이터", "암호화"],
        ["역할별", "접근 권한"],
        ["정기", "백업 정책"],
      ],
    },
    messaging: {
      title: "리콜 문자도 규칙대로 보냅니다",
      description: "수신 동의를 확인하고, 늦은 밤에는 보내지 않습니다.",
      checks: ["수신 동의 확인", "야간 발송 제한"],
      result: "리콜 문자 발송",
    },
  },
  bundle: {
    title: "병원 성장 패키지",
    description: "AI 검색 관리와 환자 관리를 묶어 월 구독으로 이용합니다.",
    monthlyUnit: "/월",
    separateLabel: "따로 쓰면",
    vat: "금액은 VAT 포함입니다.",
    consult: "패키지 상담",
    pricing: "요금 안내 보기",
  },
  faq: { title: "자주 묻는 질문", more: "전체 질문 보기" },
  cta: {
    title: "우리 병원은 AI 검색에서 어떻게 보일까요?",
    description: "홈페이지 주소만 있으면 로그인 없이 바로 진단할 수 있습니다.",
    primary: "무료 진단하기",
    secondary: "상담 신청",
  },
};

export const hospitalWebsiteContent: SolutionPageContent = {
  path: routes.hospital.website,
  eyebrow: "병원 솔루션",
  name: "사피어 병원 홈페이지",
  message: "AI 검색에 강한 병원 홈페이지",
  problems: ["진단 점수가 낮은데 직접 고치기 어렵다", "예약·상담으로 이어지는 홈페이지가 필요하다"],
  features: [
    "기본형부터 AI 검색 최적화 기본 세팅 포함",
    "검색 등록, GA4, 네이버 예약·카카오 채널 연결",
    "진료항목별 페이지, 예약·상담 동선, 구조화데이터 (표준형)",
    "의료광고 문구 점검 (표준형)",
    "맞춤 디자인, 다국어, CRM 연동, 관리자 기능 확장 (프리미엄)",
    "납품 후 월 관리 구독",
  ],
  screens: ["제작 사례 화면"],
  cases: [
    { title: "피부과 웹", href: routes.portfolioDetail("derma-clinic-web") },
    { title: "내과 웹", href: routes.portfolioDetail("internal-clinic-web") },
    { title: "병원 컨설팅 웹", href: routes.portfolioDetail("hospital-consulting-web") },
  ],
  process: [
    { step: "상담", detail: "병원 상황을 듣고 맞는 패키지를 정합니다." },
    { step: "계약", detail: "패키지를 고르고 계약합니다. 기본형은 바로 결제할 수 있습니다." },
    { step: "제작", detail: "패키지별 기간에 맞춰 만듭니다." },
    { step: "납품", detail: "완성된 홈페이지를 넘겨드립니다." },
    { step: "관리", detail: "GEO 관리형 또는 단순 유지보수를 고릅니다." },
  ],
  faq: faqForService("hospital-website"),
  cta: { label: "제작 상담", href: routes.contactFor("hospital-website") },
  secondaryCta: { label: "기본형 결제", href: routes.order("web-basic") },
};

/**
 * 병원 솔루션 소개(/hospital) 세부 페이지 구성 문구 (ANCORS 세부 페이지 문법 참고, 컴포넌트는 사피어식).
 * 흐름·솔루션·신뢰·패키지·FAQ 내용은 위 hospitalOverviewContent와 content/hospital을 그대로 쓴다.
 */
export const hospitalLandingContent = {
  hero: {
    tagline: ["AI SEARCH, WEBSITE AND PATIENT CARE", "IN ONE FLOW"],
    title: "Hospital Solution",
  },
  /** 화면 아래 고정 알약 메뉴 (병원 솔루션 묶음) */
  subnav: {
    label: "병원 솔루션 메뉴",
    items: [
      { label: "소개", href: routes.hospital.root },
      { label: "AI 검색 최적화", href: routes.hospital.geo },
      { label: "의료광고 검사기", href: routes.hospital.adCheck },
      { label: "병원 홈페이지", href: routes.hospital.website },
      { label: "병원 CRM", href: routes.hospital.crm },
    ],
  },
  journey: {
    title: "Patient Journey",
    sub: ["처음 진단부터 진료 이후까지, 여섯 단계를 한 흐름으로 잇습니다."],
  },

  solutions: { title: "Four Solutions" },
  together: { title: "One Team, One Flow" },
  security: {
    title: "Patient Data Protection",
    cards: [
      {
        label: "SERVER",
        name: "병원별 전용 서버·DB",
        text: "병원마다 전용 서버에 따로 설치해 데이터를 나눠 둡니다.",
      },
      { label: "ENCRYPTION", name: "데이터 암호화", text: "저장하는 환자 정보를 암호화합니다." },
      {
        label: "ACCESS",
        name: "역할별 접근 권한",
        text: "직원 역할에 따라 볼 수 있는 정보를 나눕니다.",
      },
      { label: "BACKUP", name: "정기 백업 정책", text: "정해진 주기로 데이터를 백업합니다." },
      {
        label: "MESSAGE",
        name: "리콜 문자 발송 규칙",
        text: "수신 동의를 확인하고, 늦은 밤에는 보내지 않습니다.",
      },
    ],
  },
  bundle: { title: "Growth Package" },
  faq: { title: "Questions & Answers" },
};
