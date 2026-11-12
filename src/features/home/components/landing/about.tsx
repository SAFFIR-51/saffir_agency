import { landing } from "../../model/landing-content";
import { Cate, ColorSlot, ImageLeadText, MoreLink, RevealText, Wrap } from "./parts";

const c = landing.about;

/**
 * 회사 소개 두 덩어리.
 * 첫째: 왼쪽 정사각 이미지 아래 끝 두 줄 옆에서 글이 시작해 넓게 이어진다
 * 둘째: 오른쪽 넓은 이미지 + 아래 글
 */
export function LandingAbout() {
  return (
    <section className="pt-[clamp(80px,11vw,180px)]">
      <Wrap>
        <Cate className="mb-6 lg:text-right">{c.label}</Cate>
        <ImageLeadText width={35} ratio={1} color={c.first.color} label={c.first.image}>
          {c.first.text}
        </ImageLeadText>
        <div className="mt-[clamp(80px,12vw,200px)] lg:ml-auto lg:w-[61%]">
          <ColorSlot
            color={c.second.color}
            label={c.second.image}
            className="aspect-[645/300] w-full"
          />
          <RevealText className="mt-5">{c.second.text}</RevealText>
          <div className="mt-10">
            <MoreLink href={c.link.href}>{c.link.label}</MoreLink>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
