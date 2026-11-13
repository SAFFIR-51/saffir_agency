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
    <div className="overflow-x-auto rounded-[18px] bg-surface px-6 py-2 [section:nth-of-type(even)_&]:bg-background">
      <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
        {caption ? (
          <caption className="pt-4 pb-1 text-left text-sm text-muted">{caption}</caption>
        ) : null}
        <thead>
          <tr className="border-b border-divider">
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="py-3 pr-6 text-xs font-semibold whitespace-nowrap text-muted"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-divider/70 align-top last:border-b-0">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="py-4 pr-6 leading-relaxed">
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
