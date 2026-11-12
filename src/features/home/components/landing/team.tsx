import { cn } from "@/shared/lib";
import { landing } from "../../model/landing-content";
import { ColorSlot, RevealText, Wrap } from "./parts";
import { RiseLetters } from "./rise-letters";

const c = landing.team;

const icons: Record<string, React.ReactNode> = {
  plan: <path d="M4 26h24M8 22V10l8-5 8 5v12M13 22v-6h6v6" />,
  design: <path d="M5 6h22v16H5zM11 26h10M16 22v4M9 18l6-8 3 4 2-2 3 6" />,
  build: <path d="M4 7h24v18H4zM4 12h24M9 17l3 3-3 3M15 23h6" />,
  run: <path d="M16 4a12 12 0 1 0 12 12M16 9v7l5 3M24 4v6h6" />,
};

/** 카드 위치: 윗줄 1·2열, 아랫줄 2·3열 */
const placement = [
  "lg:col-start-1 lg:row-start-1",
  "lg:col-start-2 lg:row-start-1",
  "lg:col-start-2 lg:row-start-2",
  "lg:col-start-3 lg:row-start-2",
];

/** 검은 띠: 글자가 올라오는 큰 제목, 장식 도형, 일하는 방식 카드 4장 */
/** 줄마다 글자 순번 시작값 (줄을 이어서 올리기 위해) */
const lineStarts = c.titleLines.map((_, i) => c.titleLines.slice(0, i).join("").length);

export function LandingTeam() {
  return (
    <section className="relative mt-[clamp(100px,12vw,200px)] overflow-hidden bg-black py-[clamp(64px,10vw,120px)] text-white">
      <Wrap>
        <h2 className="lt-team-title">
          {c.titleLines.map((line, lineIndex) => {
            const start = lineStarts[lineIndex] ?? 0;
            const isLast = lineIndex === c.titleLines.length - 1;
            return (
              <span
                key={line}
                className={isLast ? "flex items-center justify-between gap-6" : "block"}
              >
                {line.includes("✱") ? (
                  <span>
                    <RiseLetters text={line.split("✱")[0]?.trim() ?? ""} startIndex={start} />{" "}
                    <svg
                      aria-hidden
                      viewBox="0 0 40 40"
                      className="inline-block size-[0.8em] fill-[#f6a5c0] align-[-0.08em]"
                    >
                      {[0, 45, 90, 135].map((deg) => (
                        <ellipse
                          key={deg}
                          cx="20"
                          cy="20"
                          rx="6.5"
                          ry="19"
                          transform={`rotate(${deg} 20 20)`}
                        />
                      ))}
                    </svg>{" "}
                    <RiseLetters text={line.split("✱")[1]?.trim() ?? ""} startIndex={start + 6} />
                  </span>
                ) : (
                  <RiseLetters text={line} startIndex={start} />
                )}
                {isLast ? (
                  <span
                    aria-hidden
                    className="mr-[4%] aspect-square w-[clamp(56px,10vw,160px)] shrink-0 rounded-full border-[clamp(10px,1.6vw,26px)] border-(--landing-signal)"
                  />
                ) : null}
              </span>
            );
          })}
        </h2>

        {/* 장식 도형은 글자와 겹치지 않게 빈 칸에만 둔다 */}
        <div className="mt-[clamp(32px,6vw,90px)] grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div aria-hidden className="relative hidden h-[clamp(160px,22vw,340px)] lg:block">
            <span className="absolute top-0 left-[28%] aspect-square h-full bg-[#d3ef4f] [clip-path:polygon(50%_0,57%_33%,85%_15%,67%_43%,100%_50%,67%_57%,85%_85%,57%_67%,50%_100%,43%_67%,15%_85%,33%_57%,0_50%,33%_43%,15%_15%,43%_33%)]" />
            <span className="absolute bottom-[18%] left-0 h-1.5 w-[clamp(30px,5vw,80px)] rounded-full bg-[#6c63ff]" />
          </div>
          <div className="flex flex-wrap items-end justify-end gap-[clamp(16px,3vw,36px)]">
            <span
              aria-hidden
              className="aspect-square w-[clamp(36px,6vw,96px)] self-start bg-[#3d3d3d] [clip-path:polygon(50%_0,62%_38%,100%_50%,62%_62%,50%_100%,38%_62%,0_50%,38%_38%)]"
            />
            <ColorSlot
              color={c.archColor}
              label={c.archImage}
              className="aspect-[164/242] w-[clamp(110px,14.5vw,230px)] rounded-t-full"
            />
            <p className="lt-team-sub w-[clamp(200px,25vw,420px)]">{c.sub}</p>
          </div>
        </div>
        <div aria-hidden className="relative mt-[clamp(24px,4vw,60px)] h-[clamp(80px,12vw,200px)]">
          <span className="absolute top-0 left-[38%] grid w-[clamp(60px,11vw,170px)] grid-cols-3 gap-[8%]">
            {Array.from({ length: 9 }, (_, i) => (
              <span key={i} className="aspect-square rounded-full bg-[#6c63ff]" />
            ))}
          </span>
          <span className="absolute right-[8%] bottom-0 aspect-[3/2] h-[80%] -rotate-12 rounded-[50%] bg-[#5ccf9e]" />
        </div>

        <ul className="mt-[clamp(48px,8vw,140px)] grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-0 lg:gap-y-[clamp(40px,5vw,80px)]">
          {c.cards.map((card, i) => (
            <li
              key={card.icon}
              className={cn("landing-fade lg:px-[clamp(20px,3vw,57px)]", placement[i])}
            >
              <svg
                aria-hidden
                viewBox="0 0 32 32"
                className="size-9 fill-none stroke-white stroke-[1.4]"
              >
                {icons[card.icon]}
              </svg>
              <h3 className="lt-team-card-title mt-4">
                {card.title.map((t) => (
                  <span key={t} className="block">
                    {t}
                  </span>
                ))}
              </h3>
              <div className="mt-6 border-t border-white/40 pt-6">
                <RevealText tone="light" size="lt-team-card-text">
                  {card.text}
                </RevealText>
                <ul className="lt-team-list mt-8 space-y-1.5 text-[#999]">
                  {card.list.map((item) => (
                    <li key={item}>- {item}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}
