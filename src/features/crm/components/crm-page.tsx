import Link from "next/link";
import { installedSolutionRows } from "@/content/company";
import { crmDemo, crmSecurity } from "@/content/hospital";
import { messagePriceNote, messagePriceRows, solutionPlans } from "@/content/pricing";
import { routes } from "@/shared/config";
import { formatKRW } from "@/shared/lib";
import { SalesPage } from "@/shared/sections";
import { ArrowIcon, PlanCards } from "@/shared/ui";
import { crmSales } from "../model/sales-content";

/** 병원 CRM: 보안(기획서 필수) → 데모 → 요금(요금제 + 메시지 단가) → 제공 방식 */
export function CrmPage() {
  return (
    <SalesPage
      content={crmSales}
      slots={{
        afterFeatures: (
          <div className="sp-box">
            <p className="sp-box-title">환자 데이터는 병원마다 따로 지킵니다</p>
            <ul className="sp-box-grid">
              {crmSecurity.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="sp-box-note">{crmSecurity.messaging}</p>
            <Link href={routes.legal.security} className="sp-box-link">
              보안·데이터 정책 자세히 보기
              <ArrowIcon />
            </Link>
          </div>
        ),
        screens: (
          <ul className="sp-box-lines">
            {crmDemo.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ),
        pricing: (
          <>
            <PlanCards
              plans={solutionPlans.filter((p) => p.id.startsWith("crm-"))}
              setupLabel="세팅"
              monthlyLabel="월"
              actions={{ consultFallback: "crm-adopt", consultLabel: "도입 상담" }}
            />
            <div className="sp-box sp-box-plain">
              <p className="sp-box-title">메시지 발송 · 건당</p>
              <ul className="sp-unit">
                {messagePriceRows.map((m) => (
                  <li key={m.name}>
                    <span>{m.name}</span>
                    <strong>{formatKRW(m.unit)}</strong>
                  </li>
                ))}
              </ul>
              <p className="sp-box-note">{messagePriceNote}</p>
            </div>
          </>
        ),
        afterProcess: (
          <div className="sp-box sp-box-plain">
            <p className="sp-box-title">제공 방식</p>
            <dl className="sp-dl">
              {installedSolutionRows.map((r) => (
                <div key={r.item}>
                  <dt>{r.item}</dt>
                  <dd>{r.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        ),
      }}
    />
  );
}
