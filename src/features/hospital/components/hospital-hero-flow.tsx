import { hospitalOverviewContent } from "../model/content";

const { flow } = hospitalOverviewContent.hero;

/** 유리 카드: 제목 + 흰 패널 */
function GlassCard({
  title,
  panel,
  dotClassName,
  children,
}: {
  title: string;
  panel: string;
  dotClassName: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full rounded-3xl border border-white/70 bg-white/35 p-3 text-left shadow-[0_8px_32px_-12px_rgb(30_70_120/0.35)] backdrop-blur-md lg:p-4">
      <p className="px-1.5 pt-1 pb-3 text-lg leading-tight font-semibold tracking-[-0.02em] text-[#10233a] lg:text-xl">
        {title}
      </p>
      <div className="rounded-2xl bg-white p-4 lg:p-5">
        <p className="flex items-center gap-1.5 text-base font-medium tracking-[-0.02em] text-[#1c1c1c]">
          {panel}
          <span aria-hidden="true" className={`size-1.5 rounded-full ${dotClassName}`} />
        </p>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}

/** 카드 사이 연결선 (넓은 화면은 가로, 좁은 화면은 세로) */
function Connector() {
  return (
    <span
      aria-hidden="true"
      className="relative mx-auto block h-6 w-0.5 shrink-0 bg-white/90 after:absolute after:-bottom-1.5 after:left-1/2 after:size-3 after:-translate-x-1/2 after:rounded-full after:bg-white lg:mx-0 lg:h-0.5 lg:w-auto lg:flex-[0_0_6%] lg:self-center lg:after:top-1/2 lg:after:right-[-6px] lg:after:bottom-auto lg:after:left-auto lg:after:translate-x-0 lg:after:-translate-y-1/2"
    />
  );
}

/** 히어로 아래 그림: AI 검색 진단 → 병원 홈페이지 → 환자 관리 (모두 예시 값) */
export function HospitalHeroFlow({ className }: { className?: string }) {
  const { diagnosis, website, crm } = flow;
  return (
    <figure
      aria-label={flow.ariaLabel}
      className={`relative overflow-hidden rounded-2xl bg-[#a7c5d4] bg-[url(/hospital/hero-bg.webp)] bg-cover bg-bottom px-4 py-10 sm:px-8 lg:flex lg:aspect-[3/1] lg:items-center lg:justify-center lg:px-[8%] lg:py-0 ${className ?? ""}`}
    >
      <span className="absolute top-4 right-4 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-[#2b3d52] backdrop-blur">
        {flow.sampleLabel}
      </span>

      <div className="relative flex w-full flex-col items-stretch lg:flex-row lg:items-center">
        <GlassCard title={diagnosis.title} panel={diagnosis.panel} dotClassName="bg-[#f0443a]">
          <div className="rounded-xl bg-[#f5f5f4] px-3.5 py-3">
            <p className="text-base font-medium tracking-[-0.02em] text-[#1c1c1c]">
              {diagnosis.hospital}
            </p>
            <p className="text-sm text-[#737373]">{diagnosis.hospitalMeta}</p>
          </div>
          <ul className="mt-3 grid gap-1.5 text-sm text-[#5c5c5c]">
            {diagnosis.items.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </GlassCard>

        <Connector />

        <GlassCard title={website.title} panel={website.panel} dotClassName="bg-[#1fb26b]">
          <dl className="grid gap-2.5">
            {website.groups.map((group) => (
              <div key={group.label}>
                <dt className="text-sm text-[#8a8a8a]">{group.label}</dt>
                <dd className="mt-1 flex flex-wrap gap-1.5">
                  {group.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#e5e5e5] px-3 py-1 text-sm text-[#1c1c1c]"
                    >
                      {tag}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </GlassCard>

        <Connector />

        <GlassCard title={crm.title} panel={crm.panel} dotClassName="bg-[#2f7bf6]">
          <ul className="grid gap-1.5">
            {crm.rows.map((row) => (
              <li key={row.title} className="rounded-xl bg-[#f5f5f4] px-3.5 py-2.5">
                <p className="text-base font-medium tracking-[-0.02em] text-[#1c1c1c]">
                  {row.title}
                </p>
                <p className="text-sm text-[#737373]">{row.detail}</p>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </figure>
  );
}
