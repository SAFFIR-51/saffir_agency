/** 글자 위주 표. 흰 바탕 + 얇은 선, 좁은 화면에서는 가로로 스크롤된다. */
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
    <div className="overflow-x-auto rounded-lg border border-line bg-surface">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        {caption ? (
          <caption className="border-b border-line px-4 py-3 text-left text-[13px] text-subtle">
            {caption}
          </caption>
        ) : null}
        <thead className="bg-gray-50">
          <tr className="border-b border-line">
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="px-4 py-3 text-[13px] font-semibold whitespace-nowrap text-muted"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="align-top">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={
                    cellIndex === 0
                      ? "px-4 py-3.5 leading-relaxed font-medium text-foreground"
                      : "px-4 py-3.5 leading-relaxed text-muted"
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
