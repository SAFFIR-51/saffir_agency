import { faqForService } from "@/content/faq";
import { routes } from "@/shared/config";
import type { SalesPageContent } from "@/shared/sections";

/**
 * 병원 CRM 세부 페이지 문구. 기획서: CRM 페이지에는 보안 설명을 꼭 넣는다.
 * 재진율 "성과" 문구는 데이터가 정해지기 전이라 쓰지 않고, 대시보드 기능만 말한다.
 */
export const crmSales: SalesPageContent = {
  path: routes.hospital.crm,
  name: "사피어 병원 CRM",
  message: "환자 분류, 리콜·사후관리 메시지, 재진율 대시보드를 병원 전용 서버에서 운영합니다.",
  parent: { label: "병원 솔루션", href: routes.hospital.root },
  headline: ["한 번 온 환자가", "다시 오게"],
  lead: "환자 분류, 리콜·사후관리 메시지, 재진율 대시보드를 병원마다 따로 둔 전용 서버에서 운영합니다.",
  points: ["병원별 전용 서버", "샘플 데이터로 데모 체험", "베이직은 데이터 이관 포함"],
  problems: [
    "예약·문의가 들어와도 환자 관리로 이어지지 않는다",
    "다시 와야 할 환자를 놓친다",
    "환자 데이터를 외부에 맡기기 불안하다",
  ],
  features: [
    { title: "환자 분류", detail: "진료·방문 이력에 따라 환자를 나눠 봅니다." },
    { title: "리콜·사후관리 메시지", detail: "다시 와야 할 때 알림톡·문자로 안내합니다." },
    { title: "재진율 대시보드", detail: "재방문 흐름을 한 화면에서 확인합니다." },
    { title: "병원 전용 서버", detail: "병원마다 서버와 데이터베이스를 따로 둡니다." },
  ],
  screens: ["재진율 대시보드 화면", "환자 분류·메시지 발송 화면"],
  cases: [
    { title: "병원 ERP 1", href: routes.portfolioDetail("hospital-erp-1") },
    { title: "병원 ERP 2", href: routes.portfolioDetail("hospital-erp-2") },
  ],
  process: [
    { step: "데모 신청", detail: "샘플 병원 데이터로 직접 써봅니다." },
    { step: "도입 신청", detail: "병원 규모에 맞는 요금제를 정합니다." },
    { step: "서버 세팅", detail: "병원 전용 서버를 만들고 기존 데이터를 옮깁니다." },
    { step: "운영", detail: "포털에서 서버 상태와 사용량을 확인합니다." },
  ],
  faq: faqForService("crm"),
  cta: { label: "데모 신청", href: routes.contactFor("crm-demo") },
  secondaryCta: { label: "도입 신청", href: routes.contactFor("crm-adopt") },
  closing: {
    title: "먼저 데모로 직접 써 보세요",
    text: "샘플 병원 데이터가 들어간 체험 계정을 드립니다.",
  },
};
