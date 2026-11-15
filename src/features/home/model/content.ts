/** 메인 화면 문구 */
export const homeContent = {
  /** 메인 화면 구성 (kolonworkwear.com 메인 배치 참고: 12칸 그리드, 영문 큰 제목 + 짧은 한글 설명) */
  layout: {
    /** 글자로 만드는 화면 (ANCORS·Goodai·IT 에이전시 레퍼런스: 큰 워드마크, 짧은 영문 태그, 흐르는 문장) */
    type: {
      wordmark: "SAFFIR",
      tagline: ["BUILT FOR YOUR WORK,", "A PARTNER THAT", "BUILDS AND RUNS WITH YOU"],
      intro: ["일하는 방식에 알맞게 만들고,", "운영까지 함께하는 사피어 테크놀로지입니다."],
    },
    /** 카드 아래 이야기 (v-w.co.kr 소개·서비스 A/B/C, ANCORS BEYOND·어두운 아카이브 참고) */
    manifesto: {
      lead: ["A build & care partner", "shaping how hospitals", "and businesses work."],
      sub: "병원과 기업의 일하는 방식을 설계하고, 오래 운영되게 만드는 파트너.",
      en: [
        "Every project begins with listening — how you work, what slows you down, and what you need next. We don’t start from a blank page. We assemble from modules we have already built and run.",
        "Launch is not the finish line. Dedicated servers and maintenance keep what we build working, long after delivery.",
      ],
      ko: [
        "모든 프로젝트는 듣는 것에서 시작합니다. 지금 어떻게 일하는지, 무엇이 막히는지, 다음에 무엇이 필요한지.",
        "빈 화면부터 짜지 않습니다. 이미 만들고 운영해 온 모듈을 조합해 빠르게 만듭니다.",
        "출시는 끝이 아닙니다. 전용 서버와 유지보수로 납품 이후에도 계속 돌아가게 합니다.",
      ],
    },
  },
  /** 카드 3장 설명 */
  entry: {
    hospital: {
      description:
        "병원 웹사이트를 개발해 진료 안내와 예약을 연결합니다.\n환자 관리와 재방문 안내까지 지원합니다.",
    },
    business: {
      description:
        "여러 판매 채널의 주문과 재고를 한곳에서 관리합니다.\n재고를 연동해 채널별 수량 수정 업무를 줄이세요.",
    },
    development: {
      description:
        "지금 쓰는 도구와 업무 흐름에 맞춰 필요한 기능을 만듭니다.\n진행 상황을 공유하고 출시 후 유지보수까지 이어갑니다.",
    },
  },
};
