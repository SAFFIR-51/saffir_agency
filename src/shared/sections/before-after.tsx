import type { ReactNode } from "react";

export function BeforeAfter({
  caption,
  comparison,
  children,
}: {
  caption: string;
  comparison: readonly { before: string; after: string }[];
  children: ReactNode;
}) {
  return (
    <>
      <div className="max-w-2xl space-y-4 text-base leading-relaxed text-neutral-700 lg:text-lg">
        {children}
      </div>
      <table className="mt-8 w-full table-fixed border-collapse border-t border-black text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-neutral-200 text-sm text-neutral-500">
            <th scope="col" className="w-1/2 py-3 pr-3 font-semibold sm:pr-6">
              지금은
            </th>
            <th scope="col" className="w-1/2 py-3 pl-3 font-semibold sm:pl-6">
              개선 후
            </th>
          </tr>
        </thead>
        <tbody>
          {comparison.map(({ before, after }) => (
            <tr key={before} className="border-b border-neutral-200 align-top leading-relaxed">
              <td className="py-4 pr-3 text-neutral-600 sm:py-6 sm:pr-6">{before}</td>
              <td className="py-4 pl-3 font-semibold sm:py-6 sm:pl-6">{after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
