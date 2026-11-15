const slots = Array.from({ length: 6 }, (_, i) => i);

/**
 * 포트폴리오 자리: 회색 칸이 끊김 없이 왼쪽으로 흐르고, 마우스를 올리면 멈춘다.
 * 같은 줄을 두 번 이어 붙이고 정확히 절반(-50%)만큼 움직여 이음매가 보이지 않게 한다.
 * 움직임 줄이기 설정에서는 흐르지 않고 손으로 넘겨 본다.
 */
export function PortfolioMarquee() {
  const row = (copy: number) => (
    <ul aria-hidden={copy > 0 || undefined} className="flex shrink-0 gap-2 pr-2">
      {slots.map((i) => (
        <li
          key={i}
          className="aspect-[4/3] w-[72vw] shrink-0 bg-[#f0f0f0] md:w-[38vw] lg:w-[28vw]"
        />
      ))}
    </ul>
  );

  return (
    <div
      role="region"
      aria-label="포트폴리오"
      className="group mt-10 overflow-hidden motion-reduce:overflow-x-auto lg:mt-14"
    >
      <style>{`@keyframes home-portfolio-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      <div className="flex w-max group-hover:[animation-play-state:paused] motion-safe:animate-[home-portfolio-marquee_48s_linear_infinite]">
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}
