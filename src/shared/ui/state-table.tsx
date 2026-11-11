import { DataTable } from "./data-table";

export type ScreenState = { state: string; screen: string; next: string };

/** 한 화면의 상태별 모습 (진행 중, 결과, 실패 등). 와이어프레임에서 상태 화면을 표로 정의할 때 쓴다 */
export function StateTable({ states, caption }: { states: ScreenState[]; caption?: string }) {
  return (
    <DataTable
      columns={["상태", "보이는 것", "다음 행동"]}
      rows={states.map((s) => [s.state, s.screen, s.next])}
      caption={caption}
    />
  );
}
