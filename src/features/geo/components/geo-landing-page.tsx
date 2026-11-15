import { withCaseImages } from "@/content/portfolio";
import { formatKRW } from "@/shared/lib";
import { geoPlans, geoPricingHeadline } from "@/content/pricing";
import { routes } from "@/shared/config";
import { SolutionTemplate } from "@/shared/sections";
import {
  PlanTable,
  StateTable,
  Subheading,
  TrackedButtonLink,
  WireBox,
  WireInput,
} from "@/shared/ui";
import {
  geoContent,
  geoDiagnosisStates,
  geoLockedResult,
  geoResultActions,
} from "../model/content";

export function GeoLandingPage() {
  return (
    <SolutionTemplate
      content={{ ...geoContent, cases: withCaseImages(geoContent.cases) }}
      summary={[
        {
          label: "시작 요금",
          value: `월 ${formatKRW(Math.min(...geoPlans.flatMap((p) => (p.monthly ? [p.monthly] : []))))}부터`,
        },
        { label: "결제 방식", value: "월 구독 · 무료 진단" },
      ]}
      slots={{
        afterFeatures: <WireBox label="8개 분야 · 50여 항목 목록" />,
        screens: (
          <div id="diagnosis" className="space-y-5">
            <Subheading>무료 진단</Subheading>
            <WireInput label="홈페이지 주소" placeholder="https://" />
            <WireBox label="진단 결과 · 총점, 영역별 점수, 우선 개선 항목" size="lg" />
            <WireBox label={geoLockedResult} />
            <div className="flex flex-wrap gap-3">
              {geoResultActions.map((a) => (
                <TrackedButtonLink
                  key={a.action}
                  href={a.href}
                  event="geo_result_cta_clicked"
                  eventProps={{ action: a.action }}
                  variant={a.action === "signup" ? "primary" : "secondary"}
                >
                  {a.label}
                </TrackedButtonLink>
              ))}
            </div>
            <Subheading>진단 상태</Subheading>
            <StateTable states={geoDiagnosisStates} />
          </div>
        ),
        pricing: (
          <PlanTable
            plans={geoPlans}
            caption={geoPricingHeadline}
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
