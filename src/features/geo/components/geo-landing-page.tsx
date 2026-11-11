import Link from "next/link";
import { geoPlans, geoPricingHeadline } from "@/content/pricing";
import { SolutionTemplate } from "@/shared/sections";
import { BulletList, Note, PlanTable, Subheading, Todo } from "@/shared/ui";
import { geoContent, geoResultOutline } from "../model/content";

export function GeoLandingPage() {
  return (
    <SolutionTemplate
      content={geoContent}
      slots={{
        afterFeatures: <Todo>8개 분야 이름과 50여 항목 목록</Todo>,
        demo: (
          <div id="diagnosis" className="space-y-4">
            <Todo>홈페이지 주소 입력창 (진단 기능 연결 예정)</Todo>
            <Subheading>진단 결과 화면</Subheading>
            <BulletList items={geoResultOutline.result} />
            <Subheading>결과 화면 버튼</Subheading>
            <BulletList
              items={geoResultOutline.nextActions.map((a) => (
                <Link key={a.label} href={a.href} className="underline underline-offset-4">
                  {a.label}
                </Link>
              ))}
            />
          </div>
        ),
        pricing: (
          <>
            <Note>
              <p>{geoPricingHeadline}</p>
            </Note>
            <PlanTable plans={geoPlans} />
          </>
        ),
      }}
    />
  );
}
