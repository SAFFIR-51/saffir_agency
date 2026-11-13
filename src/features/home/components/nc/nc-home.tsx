import Link from "next/link";
import { developmentAreas, workflow } from "@/content/company";
import { portfolioGroups, portfolioItems, techLabels } from "@/content/portfolio";
import { listServices, serviceLines, type Service } from "@/content/services";
import { routes } from "@/shared/config";
import { IconArt, type IconArtKind } from "@/shared/ui";
import { ncContent as c } from "../../model/nc-content";
import { Cases } from "./cases";
import { NcHero } from "./nc-hero";
import { PromoRow } from "./promo-row";
import { Solutions, type SolutionPanel } from "./solutions";

/** 서비스 목록 아이콘 (단순 선 그림, 서비스마다 하나) */
function ServiceIcon({ id }: { id: Service["id"] | "development" }) {
  const p: Record<string, React.ReactNode> = {
    geo: (
      <>
        <circle cx="18" cy="18" r="9" />
        <path d="M25 25l7 7M14 18h8M18 14v8" />
      </>
    ),
    "ad-check": (
      <>
        <path d="M10 6h14l6 6v18H10z" />
        <path d="M14 20l4 4 8-8" />
      </>
    ),
    "hospital-website": (
      <>
        <rect x="6" y="8" width="28" height="22" rx="3" />
        <path d="M6 14h28M17 22h6M20 19v6" />
      </>
    ),
    crm: (
      <>
        <circle cx="15" cy="15" r="5" />
        <path d="M6 31c0-5 4-9 9-9s9 4 9 9M27 12h7M27 18h7M27 24h5" />
      </>
    ),
    connect: (
      <>
        <rect x="5" y="8" width="12" height="10" rx="2" />
        <rect x="23" y="22" width="12" height="10" rx="2" />
        <path d="M17 13h6v14h0" />
      </>
    ),
    erp: (
      <>
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <rect x="22" y="6" width="12" height="12" rx="2" />
        <rect x="6" y="22" width="12" height="12" rx="2" />
        <rect x="22" y="22" width="12" height="12" rx="2" />
      </>
    ),
    "ai-chatbot": (
      <>
        <rect x="7" y="10" width="26" height="18" rx="6" />
        <circle cx="15" cy="19" r="1.5" />
        <circle cx="25" cy="19" r="1.5" />
        <path d="M20 4v6M14 32l6-4 6 4" />
      </>
    ),
    development: (
      <>
        <path d="M14 12l-8 8 8 8M26 12l8 8-8 8M23 8l-6 24" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {p[id]}
    </svg>
  );
}

/**
 * 시안 5 메인 (NHN Cloud 메인 구성)
 * 첫 화면(줄어드는 그림) → 넘기는 카드·포트폴리오·바로가기 → 주요 솔루션(펼치는 패널)
 * → 주요 서비스(회색, 2열 목록) → 포트폴리오(넘기는 카드) → 처음이라면(파스텔 카드 4장)
 * → 문의 띠 → (푸터는 레이아웃)
 */
export function NcHome() {
  const hospital = listServices("hospital");
  const business = listServices("business");
  const pick = (ids: Service["id"][], list: Service[]) =>
    ids
      .flatMap((id) => list.filter((s) => s.id === id))
      .map((s) => ({
        title: s.name.replace(/^사피어 /, ""),
        text: s.message,
      }));

  const panels: SolutionPanel[] = [
    {
      key: "hospital",
      en: "Hospital",
      name: serviceLines.hospital.name,
      href: routes.hospital.root,
      tone: "blue",
      points: pick(["geo", "hospital-website", "crm"], hospital),
    },
    {
      key: "business",
      en: "Business",
      name: serviceLines.business.name,
      href: routes.solutions.root,
      tone: "violet",
      points: pick(["connect", "erp", "ai-chatbot"], business),
    },
    {
      key: "development",
      en: "Development",
      name: "맞춤 개발",
      href: routes.development.root,
      tone: "teal",
      points: [
        { title: "웹·앱부터 IoT까지", text: `${developmentAreas.join(", ")}를 만듭니다.` },
        {
          title: "정찰가 패키지",
          text: "범위가 정해진 개발은 정찰가 계약금으로 바로 시작합니다.",
        },
        { title: "납품 뒤 운영까지", text: workflow[2]?.detail ?? "" },
      ],
    },
  ];

  const services = [
    ...[...hospital, ...business].map((s) => ({
      key: s.id,
      icon: s.id,
      group: serviceLines[s.line].name,
      name: s.name,
      text: s.message,
      href: s.href,
    })),
    {
      key: "development",
      icon: "development" as const,
      group: "맞춤 개발",
      name: "사피어 맞춤 개발",
      text: `${developmentAreas.join(", ")}를 만들고 운영까지`,
      href: routes.development.root,
    },
  ];

  const cases = portfolioItems.slice(0, 12).map((item) => ({
    slug: item.slug,
    href: routes.portfolioDetail(item.slug),
    group: portfolioGroups[item.group],
    title: item.title,
    text: `${item.tech.map((t) => techLabels[t]).join(" · ")} 프로젝트`,
  }));

  return (
    <>
      <NcHero />
      <PromoRow />

      {/* 주요 솔루션 */}
      <section aria-labelledby="nc-sol-title" className="nc-sec nc-sec-sol">
        <h2 id="nc-sol-title" className="nc-h2 text-center">
          {c.solutions.title}
        </h2>
        <p className="nc-lead text-center">{c.solutions.lead}</p>
        <Solutions panels={panels} />
      </section>

      {/* 주요 서비스 */}
      <section aria-labelledby="nc-svc-title" className="nc-sec nc-sec-gray">
        <div className="nc-w1280">
          <h2 id="nc-svc-title" className="nc-h2">
            {c.services.title}
          </h2>
          <p className="nc-lead">{c.services.lead}</p>
          <ul className="nc-svc">
            {services.map((s) => (
              <li key={s.key}>
                <Link href={s.href}>
                  <span className="nc-svc-icon">
                    <ServiceIcon id={s.icon} />
                  </span>
                  <span className="nc-svc-body">
                    <small>{s.group}</small>
                    <strong>{s.name}</strong>
                    <span>{s.text}</span>
                  </span>
                  <svg className="nc-svc-arrow" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M3 12h17M14 6l6 6-6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
          <div className="nc-center">
            <Link href={c.services.all.href} className="nc-blue-btn">
              {c.services.all.label}
            </Link>
          </div>
        </div>
      </section>

      {/* 포트폴리오 */}
      <section aria-labelledby="nc-cases" className="nc-sec nc-sec-cases">
        <Cases title={c.cases.title} lead={c.cases.lead} cards={cases} />
        <div className="nc-center">
          <Link href={c.cases.all.href} className="nc-blue-btn">
            {c.cases.all.label}
          </Link>
        </div>
      </section>

      {/* 처음이라면 */}
      <section aria-labelledby="nc-info-title" className="nc-sec nc-sec-info">
        <div className="nc-w1280">
          <h2 id="nc-info-title" className="nc-h2">
            {c.info.title}
          </h2>
          <p className="nc-lead">{c.info.lead}</p>
          <ul className="nc-info">
            {c.info.cards.map((card) => (
              <li key={card.title}>
                <Link href={card.href} style={{ background: card.tone }}>
                  <strong>{card.title}</strong>
                  <span>
                    {card.text[0]}
                    <br />
                    {card.text[1]}
                  </span>
                  <svg className="nc-info-arrow" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M3 12h17M14 6l6 6-6 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  <IconArt
                    kind={card.icon as IconArtKind}
                    id={`info-${card.icon}`}
                    className="nc-info-obj"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 문의 띠 */}
      <section aria-labelledby="nc-cta-title" className="nc-cta">
        <div className="nc-w1280">
          <p className="nc-cta-label">{c.closing.label}</p>
          <h2 id="nc-cta-title">{c.closing.title}</h2>
          <Link href={c.closing.cta.href} className="nc-blue-btn">
            {c.closing.cta.label}
          </Link>
        </div>
        <span className="nc-cta-glass nc-cta-glass-1" aria-hidden />
        <span className="nc-cta-glass nc-cta-glass-2" aria-hidden />
      </section>
    </>
  );
}
