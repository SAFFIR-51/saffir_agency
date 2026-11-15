/** 글자 위주 표. 좁은 화면에서는 가로로 스크롤된다. */
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
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        {caption ? (
          <caption className="mb-2 text-left text-foreground/60">{caption}</caption>
        ) : null}
        <thead>
          <tr className="border-b border-foreground/25">
            {columns.map((column) => (
              <th key={column} scope="col" className="py-2 pr-4 font-semibold whitespace-nowrap">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-foreground/10 align-top">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-2.5 pr-4 leading-relaxed">
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
