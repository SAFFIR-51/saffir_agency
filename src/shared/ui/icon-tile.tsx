import { IconArt } from "./icon-art";

/** 아이콘 + 이름 타일 (보유 모듈 등). 아이콘은 직접 그린 3D 느낌 블록 그림 */
export function IconTile({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-[#e2e5eb] bg-white p-5 text-[17px] font-semibold">
      <IconArt kind="module" id={`tile-${label}`} className="h-12 w-[60px] shrink-0" />
      <span>{label}</span>
    </div>
  );
}
