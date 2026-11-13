import { geoPlans, geoPricingHeadline } from "@/content/pricing";
import { routes } from "@/shared/config";
import { SalesPage } from "@/shared/sections";
import { ArrowIcon, PlanCards, TrackedLink, TryBox } from "@/shared/ui";
import { geoNextSteps, geoSales } from "../model/sales-content";

/** AI 검색 최적화: 첫 화면에서 바로 주소를 넣어 보게 하고, 진단 뒤 세 갈래를 보여 준다 */
export function GeoLandingPage() {
  return (
    <SalesPage
      content={geoSales}
      slots={{
        hero: (
          <TryBox
            id="diagnosis"
            title="무료 진단"
            label="병원 홈페이지 주소"
            placeholder="https://"
            inputType="url"
            button="무료 진단하기"
            notes={["로그인 없이 바로 결과를 봅니다.", "8개 분야 50여 항목을 확인합니다."]}
            pending="진단 기능은 준비 중입니다. 먼저 받아 보시려면 개선 상담을 남겨 주세요."
          />
        ),
        afterFeatures: (
          <div className="sp-next">
            <p className="sp-next-title">진단 뒤에는 이렇게 고르세요</p>
            <ul>
              {geoNextSteps.map((s) => (
                <li key={s.action}>
                  <h3>{s.title}</h3>
                  <p>{s.detail}</p>
                  <TrackedLink
                    href={s.href}
                    event="geo_result_cta_clicked"
                    eventProps={{ action: s.action }}
                  >
                    {s.label}
                    <ArrowIcon />
                  </TrackedLink>
                </li>
              ))}
            </ul>
          </div>
        ),
        pricingLead: geoPricingHeadline,
        pricing: (
          <PlanCards
            plans={geoPlans}
            actions={{
              consultFallback: "geo-fix",
              free: { label: "무료 진단", href: `${routes.hospital.geo}#diagnosis` },
            }}
          />
        ),
      }}
    />
  );
}
