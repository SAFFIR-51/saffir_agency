import { serviceLines } from "@/content/services";
import { routes } from "@/shared/config";
import { homeContent } from "../model/content";
import { EntryCard } from "./entry-card";
import { TypeHero } from "./home-typography";
import { Manifesto } from "./home-story";

const { entry } = homeContent;

/** 12칸 그리드 (kolonworkwear.com: 최대 너비 없이 꽉 차게, 좌우 40 · 모바일 20, 칸 사이 16 · 모바일 12) */
const grid = "grid grid-cols-4 gap-x-3 px-5 md:grid-cols-12 md:gap-x-4 lg:px-10";
/**
 * 카드 높이 360px: 첫 화면에는 카드 윗부분(약 152px)만 보이고, 아래쪽 글자(약 170px)는 화면 밖에서 시작한다.
 * 카드 안 글자 위계를 페이지에 맞춘다: 섹션 제목 48 > 카드 제목 28 > 본문 15 > 버튼 15.
 * EntryCard는 그대로 두고, 메인에서 쓸 때만 덮어쓴다.
 */
const cardType =
  "rounded-none! [&_h2]:text-[1.75rem]! [&_h2]:leading-[1.2]! [&_h2]:font-medium! " +
  /* 카드 안 예시 화면 없이, 제목·설명과 + 버튼을 카드 아래쪽에 (+는 설명 마지막 줄과 같은 선) */
  "min-h-80! pb-7! lg:min-h-0! lg:h-[22.5rem]! lg:pb-10! [&>div:first-of-type]:mt-auto! [&>div:first-of-type]:flex-row! [&>div:first-of-type]:items-end! [&>div:first-of-type]:justify-between! " +
  /* 버튼은 배경 없이 + 하나만, 제목과 같은 색·같은 줄 높이. 글자·화살표는 숨김(화면 낭독기에는 "○○ 더보기") */
  "[&_a]:h-[2.1rem]! [&_a]:w-auto! [&_a]:bg-transparent! [&_a]:text-inherit! [&_a]:rounded-none! [&_a>span:last-of-type]:sr-only [&_a_svg]:hidden [&_a]:after:inline-block [&_a]:after:text-[2rem] [&_a]:after:leading-none [&_a]:after:font-light [&_a]:after:content-['+'] [&_a]:after:motion-safe:transition-transform [&:hover_a]:after:rotate-90 " +
  /* 카드 전체를 누를 수 있게: 링크의 before를 카드 전체로 펼친다 */
  "[&>div:first-of-type]:static! [&_a]:static! [&_a]:before:absolute [&_a]:before:inset-0 [&_a]:before:z-10 [&_a]:before:content-['']";
const cardText = "mt-3! text-[0.9375rem]! leading-[1.5]! lg:mt-4!";
function Cards() {
  return (
    <section aria-label="사피어 서비스 세 갈래" className="pt-10 lg:pt-14">
      <div className={`${grid} gap-2!`}>
        {/* 세 갈래 카드: 병원 · 비즈니스 · 맞춤 개발 (EntryCard) */}
        <EntryCard
          title={serviceLines.hospital.name}
          href={routes.hospital.root}
          moreLabel="더보기"
          description={entry.hospital.description}
          preview={<></>}
          className={`col-span-4 ${cardType} bg-home-card-hospital bg-[url(/home/hospital-card.webp)] text-white`}
          descriptionClassName={cardText}
        />
        <EntryCard
          title={serviceLines.business.name}
          href={routes.solutions.root}
          moreLabel="더보기"
          description={entry.business.description}
          descriptionClassName={`${cardText} text-white/85`}
          preview={<></>}
          className={`col-span-4 ${cardType} bg-home-card-business bg-[linear-gradient(180deg,rgb(20_20_30/0)_45%,rgb(20_20_30/0.45)_100%),url(/home/business-card.webp)] text-white`}
        />
        <EntryCard
          title="맞춤 개발"
          href={routes.development.root}
          moreLabel="더보기"
          description={entry.development.description}
          descriptionClassName={`${cardText} text-white/85`}
          preview={<></>}
          className={`col-span-4 ${cardType} bg-[#bcdde6] bg-[linear-gradient(180deg,rgb(20_20_30/0)_45%,rgb(20_20_30/0.45)_100%),url(/home/development-card.webp)] text-white`}
        />
      </div>
    </section>
  );
}

/** 메인 화면: 헤더·폰트·첫 화면·세 카드는 그대로, 카드 아래는 v-w.co.kr · ANCORS 구성 */
export function HomePage() {
  return (
    <div className="bg-white pb-28 text-black lg:pb-40">
      <TypeHero />
      <Cards />
      <Manifesto />
    </div>
  );
}
