import type { Route } from "next";
import Link from "next/link";
import {
  geoPlans,
  geoPricingHeadline,
  hospitalGrowthBundle,
  hospitalWebsiteNotes,
  hospitalWebsitePlans,
  messagePriceNote,
  messagePriceRows,
  outsourcingDeposits,
  outsourcingNotes,
  paymentTypes,
  serverTierNotes,
  serverTiers,
  solutionPlans,
  type Plan,
} from "@/content/pricing";
import { isContactTopic, routes, type ContactTopic } from "@/shared/config";
import { formatKRW } from "@/shared/lib";
import { SubpageSection, underlineLink } from "@/shared/sections";
import { TrackPageView } from "@/shared/ui";
import { PricingFilter } from "./pricing-filter";

/**
 * 요금 안내: 제목 없이 바로 엑셀식 요금표. 버튼만 토스 색(바로 결제 = 토스 파랑, 상담 = 토스 회색).
 * 토스페이먼츠 심사에서 보는 것: 상품명·금액·VAT 포함·제공 내용, 바로 결제 버튼과 결제 수단,
 * 환불 규정·이용약관 링크를 한 화면에서 확인할 수 있게 둔다. 토스 로고·이름은 쓰지 않는다.
 */

const smallButton =
  "inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-semibold tracking-[-0.02em] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3182f6] motion-safe:transition-colors";
const tossBlue = "bg-[#3182f6] text-white hover:bg-[#1b64da]";
const tossGray = "bg-[#f2f4f6] text-[#4e5968] hover:bg-[#e5e8eb]";
const cell = "border border-neutral-300 px-4 py-3.5 align-middle";
const head = `${cell} bg-[#f3f3f3] py-3 text-left text-sm font-semibold whitespace-nowrap`;

function price(value: number | null | undefined) {
  if (value === undefined) return "-";
  if (value === null) return "별도 견적";
  if (value === 0) return "무료";
  return formatKRW(value);
}

type Action = {
  consult: ContactTopic;
  consultLabel?: string;
  free?: { label: string; href: Route };
};

/** 버튼 규칙: 바로 결제 상품은 토스 파란 버튼(주문서로), 나머지는 토스 회색 버튼(상담, 문의 유형 미리 선택) */
function PlanAction({ plan, action }: { plan: Plan; action: Action }) {
  if (action.free && plan.monthly === 0) {
    return (
      <Link href={action.free.href} className={`${smallButton} ${tossGray}`}>
        {action.free.label}
      </Link>
    );
  }
  if (plan.checkout) {
    return (
      <Link href={routes.order(plan.id)} className={`${smallButton} ${tossBlue}`}>
        {plan.monthly ? "구독하기" : "결제하기"}
      </Link>
    );
  }
  const topic = isContactTopic(plan.consult) ? plan.consult : action.consult;
  return (
    <Link href={routes.contactFor(topic)} className={`${smallButton} ${tossGray}`}>
      {action.consultLabel ?? "상담"}
    </Link>
  );
}

/** 요금표 한 장: 상품 | 포함 내용 | 금액 열(1회·월) | 신청 */
function PlanSheet({
  caption,
  plans,
  setupLabel,
  monthlyLabel = "월 요금",
  action,
}: {
  caption: string;
  plans: Plan[];
  setupLabel?: string;
  monthlyLabel?: string;
  action?: Action;
}) {
  const hasSetup = plans.some((p) => p.setup !== undefined);
  const hasMonthly = plans.some((p) => p.monthly !== undefined);
  return (
    <>
      {/* 휴대폰: 상품마다 한 장씩 (이름·금액·버튼이 한눈에) */}
      <ul aria-label={caption} className="flex flex-col border-t border-neutral-300 md:hidden">
        {plans.map((p) => (
          <li key={p.id} className="border-b border-neutral-300 py-5">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-base leading-[1.4] font-bold">{p.name}</h3>
              <dl className="shrink-0 text-right">
                {hasSetup && p.setup !== undefined ? (
                  <div>
                    <dt className="text-xs text-neutral-500">{setupLabel ?? "1회"}</dt>
                    <dd className="font-bold tabular-nums">{price(p.setup)}</dd>
                  </div>
                ) : null}
                {hasMonthly && p.monthly !== undefined ? (
                  <div className={hasSetup && p.setup !== undefined ? "mt-1" : undefined}>
                    <dt className="text-xs text-neutral-500">{monthlyLabel}</dt>
                    <dd className="font-bold tabular-nums">{price(p.monthly)}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
            <p className="mt-2 text-sm leading-[1.6] text-neutral-700">{p.includes}</p>
            {p.note && <p className="mt-1 text-xs text-neutral-500">{p.note}</p>}
            {action ? (
              <div className="mt-4 [&>a]:h-11 [&>a]:w-full">
                <PlanAction plan={p} action={action} />
              </div>
            ) : null}
          </li>
        ))}
      </ul>

      {/* 태블릿·데스크톱: 엑셀식 표 */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-[0.9375rem] leading-[1.5]">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              <th scope="col" className={`${head} w-[18%]`}>
                상품
              </th>
              <th scope="col" className={head}>
                포함 내용
              </th>
              {hasSetup && (
                <th scope="col" className={`${head} w-[13%] text-right!`}>
                  {setupLabel ?? "1회"}
                </th>
              )}
              {hasMonthly && (
                <th scope="col" className={`${head} w-[13%] text-right!`}>
                  {monthlyLabel}
                </th>
              )}
              {action && (
                <th scope="col" className={`${head} w-[9rem] text-center!`}>
                  신청
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {plans.map((p) => (
              <tr key={p.id} className="hover:bg-[#fafafa]">
                <th scope="row" className={`${cell} text-left font-semibold`}>
                  {p.name}
                </th>
                <td className={`${cell} text-neutral-700`}>
                  {p.includes}
                  {p.note && <span className="mt-1 block text-sm text-neutral-500">{p.note}</span>}
                </td>
                {hasSetup && (
                  <td className={`${cell} text-right font-semibold whitespace-nowrap tabular-nums`}>
                    {price(p.setup)}
                  </td>
                )}
                {hasMonthly && (
                  <td className={`${cell} text-right font-semibold whitespace-nowrap tabular-nums`}>
                    {price(p.monthly)}
                  </td>
                )}
                {action && (
                  <td className={`${cell} text-center`}>
                    <PlanAction plan={p} action={action} />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/** 요금 묶음: 굵은 한글 이름 + 한 줄 설명 + 표 */
function Group({
  id,
  name,
  note,
  children,
}: {
  id: string;
  name: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-group={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-28 pt-12 md:pt-16 lg:pt-20"
    >
      <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <h2
          id={`${id}-title`}
          className="text-xl leading-[1.3] font-bold tracking-[-0.03em] lg:text-[1.375rem]"
        >
          {name}
        </h2>
        {note && <p className="text-sm text-neutral-600">{note}</p>}
      </div>
      {children}
    </section>
  );
}

const groups = [
  { id: "geo", name: "AI 검색 최적화" },
  { id: "solutions", name: "구축형 솔루션" },
  { id: "hospital-website", name: "병원 홈페이지" },
  { id: "bundle", name: "병원 성장 패키지" },
  { id: "development", name: "맞춤 개발" },
  { id: "server", name: "서버 운영비" },
  { id: "message", name: "메시지 발송" },
  { id: "payment", name: "결제 안내" },
];

export function PricingSheet() {
  const bundle = hospitalGrowthBundle;
  return (
    <div className="bg-white pb-28 text-black lg:pb-40">
      <TrackPageView event="pricing_viewed" />
      <h1 className="sr-only">요금 안내</h1>

      {/* 포트폴리오(ALL WORK)와 같은 시작 높이·제목 */}
      <SubpageSection
        id="pricing-title"
        first
        en="Pricing"
        sub={[
          "모든 금액은 VAT 포함입니다.",
          "파란 버튼 상품은 주문서에서 바로 결제하고, 나머지는 상담 후 결제합니다.",
        ]}
      >
        <PricingFilter groups={groups}>
          <Group id="geo" name="AI 검색 최적화 · 월 구독" note={geoPricingHeadline}>
            <PlanSheet
              caption="AI 검색 최적화 요금"
              plans={geoPlans}
              action={{
                consult: "geo-fix",
                free: { label: "무료 진단", href: `${routes.hospital.geo}#diagnosis` as Route },
              }}
            />
          </Group>

          <Group id="solutions" name="구축형 솔루션" note="고객사 전용 서버에 세팅합니다.">
            <PlanSheet
              caption="구축형 솔루션 요금"
              plans={solutionPlans}
              setupLabel="도입 세팅비"
              monthlyLabel="월 이용료"
              action={{ consult: "crm-adopt", consultLabel: "도입 상담" }}
            />
          </Group>

          <Group
            id="hospital-website"
            name="병원 홈페이지 제작"
            note={hospitalWebsiteNotes.join(" ")}
          >
            <PlanSheet
              caption="병원 홈페이지 제작 요금"
              plans={hospitalWebsitePlans}
              setupLabel="제작비"
              action={{ consult: "hospital-website", consultLabel: "제작 상담" }}
            />
          </Group>

          <Group id="bundle" name={bundle.name} note={bundle.benefit}>
            <PlanSheet
              caption="병원 성장 패키지 요금"
              plans={[
                {
                  id: "hospital-bundle",
                  consult: "hospital-bundle",
                  name: bundle.name,
                  includes: bundle.includesLabel,
                  monthly: bundle.monthly,
                },
              ]}
              action={{ consult: "hospital-bundle", consultLabel: "패키지 상담" }}
            />
          </Group>

          <Group id="development" name="맞춤 개발 정찰가" note={outsourcingNotes.join(" ")}>
            <PlanSheet
              caption="맞춤 개발 정찰가"
              plans={outsourcingDeposits}
              setupLabel="계약금"
              action={{ consult: "hospital-website" }}
            />
            <p className="mt-3 text-sm">
              <Link href={routes.development.estimate} className={underlineLink}>
                맞춤 개발 견적 요청
              </Link>
            </p>
          </Group>

          <Group id="server" name="서버 운영비" note={serverTierNotes.join(" ")}>
            <PlanSheet caption="서버 운영비" plans={serverTiers} />
          </Group>

          <Group id="message" name="메시지 발송 (병원 CRM)" note={messagePriceNote}>
            <PlanSheet
              caption="메시지 발송 단가"
              monthlyLabel="건당"
              plans={messagePriceRows.map((m) => ({
                id: m.name,
                name: m.name,
                includes: "병원 CRM 리콜·사후관리 메시지",
                monthly: m.unit,
              }))}
            />
          </Group>

          <Group id="payment" name="결제 안내" note="토스페이먼츠로 결제합니다.">
            <dl className="flex flex-col border-t border-neutral-300 md:hidden">
              {paymentTypes.map((p) => (
                <div key={p.type} className="border-b border-neutral-300 py-4 text-sm">
                  <dt className="text-base font-bold">{p.type}</dt>
                  <dd className="mt-2 grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-3 gap-y-1 text-neutral-700">
                    <span className="text-neutral-500">대상</span>
                    <span>{p.products}</span>
                    <span className="text-neutral-500">결제 위치</span>
                    <span>{p.where}</span>
                    <span className="text-neutral-500">결제 수단</span>
                    <span>{p.toss}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full border-collapse text-[0.9375rem] leading-[1.5]">
                <caption className="sr-only">결제 방식</caption>
                <thead>
                  <tr>
                    {["결제 유형", "대상 상품", "결제 위치", "결제 수단"].map((h) => (
                      <th key={h} scope="col" className={head}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paymentTypes.map((p) => (
                    <tr key={p.type}>
                      <th scope="row" className={`${cell} text-left font-semibold`}>
                        {p.type}
                      </th>
                      <td className={`${cell} text-neutral-700`}>{p.products}</td>
                      <td className={`${cell} text-neutral-700`}>{p.where}</td>
                      <td className={`${cell} text-neutral-700`}>{p.toss}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
              <Link href={routes.legal.refund as Route} className={underlineLink}>
                취소 및 환불 규정
              </Link>
              <Link href={routes.legal.terms as Route} className={underlineLink}>
                이용약관
              </Link>
              <Link href={routes.legal.privacy as Route} className={underlineLink}>
                개인정보처리방침
              </Link>
            </p>
          </Group>
        </PricingFilter>
      </SubpageSection>
    </div>
  );
}
