import "./nc-ui.css";

/** 항목·내용 목록. 두 칸짜리 표 대신 쓴다 (왼쪽 회색 항목, 오른쪽 내용) */
export function InfoList({ rows }: { rows: React.ReactNode[][] }) {
  return (
    <dl className="nc-info-list">
      {rows.map(([label, value], i) => (
        <div key={i} className="contents">
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
