import { portfolioGroups, portfolioItems } from "@/content/portfolio";
import { routes, site } from "@/shared/config";

/**
 * /llms.txt: AI가 사이트를 빠르게 파악하도록 요약과 주요 페이지를 Markdown으로 준다 (llmstxt.org 형식).
 * 효과가 입증된 표준은 아니라 보조 수단이다. 본문 페이지가 더 중요하다.
 * 요청 정보를 쓰지 않으므로 빌드할 때 한 번 만들어진다 (정적).
 */

const url = (path: string) => `${site.domain}${path === "/" ? "" : path}`;
const link = (title: string, path: string, note: string) => `- [${title}](${url(path)}): ${note}`;

function body() {
  const b = site.business;
  const cases = portfolioItems
    .filter((item) => !item.hideFromGallery)
    .map((item) =>
      link(
        item.title,
        routes.portfolioDetail(item.slug),
        `${portfolioGroups[item.group]}${item.summary ? `. ${item.summary}` : ""}`,
      ),
    );
  return [
    `# ${site.name} (${site.legalName})`,
    "",
    `> ${site.description} 병원 솔루션(병원 홈페이지, 병원 CRM, AI 검색 최적화), 비즈니스 솔루션(커머스 연동, 업무 통합 ERP), 웹·앱 맞춤 개발을 합니다.`,
    "",
    "## 병원 솔루션",
    link(
      "AI 검색 최적화(GEO)",
      routes.hospital.geo,
      "AI 답변에서 병원이 어떻게 소개되는지 진단하고 홈페이지 개선 항목을 알려 줍니다",
    ),
    link("병원 홈페이지", routes.hospital.website, "AI 검색에 강한 병원 홈페이지 제작과 운영"),
    link("병원 CRM", routes.hospital.crm, "환자 분류, 알림톡·문자 리콜 안내, 병원 전용 서버"),
    "",
    "## 비즈니스 솔루션",
    link(
      "커머스 연동",
      routes.solutions.connect,
      "스마트스토어·쿠팡·카페24 등 마켓 주문·재고를 한 화면에",
    ),
    link("업무 통합 ERP", routes.solutions.erp, "재고·발주·정산을 한 시스템에서"),
    "",
    "## 맞춤 개발",
    link(
      "맞춤 개발 소개",
      routes.development.process,
      "웹·앱·쇼핑몰·AI·IoT 개발, 기획부터 운영까지",
    ),
    link("견적 요청", routes.development.estimate, "영업일 기준 1~2일 안에 범위와 견적 회신"),
    "",
    "## 요금·회사",
    link(
      "요금 안내",
      routes.pricing,
      "솔루션 세팅비·월 이용료·메시지 단가·개발 패키지를 정찰가로 공개",
    ),
    link("회사 소개", routes.about, "일하는 방식과 걸어온 길"),
    link("자주 묻는 질문", routes.faq, "설치 위치, 데이터 소유, 보안, 결제"),
    link("문의", routes.contact, "도입 상담·견적·제휴"),
    "",
    "## 포트폴리오",
    ...cases,
    "",
    "## 회사 정보",
    `- 상호: ${site.legalName} / 대표: ${b.ceo} / 사업자등록번호: ${b.registrationNumber}`,
    `- 주소: ${b.address}`,
    `- 연락: ${b.email}, ${b.phone}`,
    "",
  ].join("\n");
}

export function GET() {
  return new Response(body(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
