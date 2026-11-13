import "./nc-ui.css";

/** 표 (NHN Cloud 요금표 모양: 회색 머리칸, 칸마다 선). 좁은 화면에서는 가로로 스크롤된다. */
export function DataTable({
  columns,
  rows,
  caption,
}: {
  columns: string[];
  rows: React.ReactNode[][];
  caption?: string;
}) {
  return (
    <div className="nc-table-wrap">
      <table className="nc-table">
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
