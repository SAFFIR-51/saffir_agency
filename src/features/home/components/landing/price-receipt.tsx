import { formatKRW } from "@/shared/lib";

export type ReceiptPrice = {
  /** 앞에 붙는 구분 (세팅 / 월 / 건당 등). 없으면 금액만 */
  label?: string;
  /** null이면 별도 견적 */
  value: number | null;
  /** true면 금액 뒤에 "~" (그 이상일 수 있음) */
  from?: boolean;
};

export type ReceiptRow = { name: string; includes?: string; prices: ReceiptPrice[] };
type ReceiptGroup = { title: string; rows: ReceiptRow[] };

type Props = {
  index: number;
  total: number;
  en: string;
  name: string;
  groups: ReceiptGroup[];
  /** 맨 아래 "시작 가격" 줄 */
  start: { label: string; value: number | null };
  notes: string[];
};

function Price({ price }: { price: ReceiptPrice }) {
  return (
    <span className="rc-price">
      {price.label ? <small>{price.label}</small> : null}
      {price.value === null ? "별도 견적" : `${formatKRW(price.value)}${price.from ? "~" : ""}`}
    </span>
  );
}

/**
 * 그룹의 시작 가격 (접힌 제목 아래 "~부터").
 * 첫 항목의 첫 금액과 같은 종류(세팅·월 등)끼리만 비교한다. 0원·별도 견적은 빼고.
 */
function groupStart(group: ReceiptGroup) {
  const kind = group.rows[0]?.prices[0]?.label;
  const values = group.rows
    .flatMap((row) => row.prices)
    .filter((price) => price.label === kind && price.value !== null && price.value > 0)
    .map((price) => price.value as number);
  if (values.length === 0) return "별도 견적";
  return `${kind ? `${kind} ` : ""}${formatKRW(Math.min(...values))}부터`;
}

/**
 * 영수증 모양 상세 요금표 한 장.
 * 위아래 톱니 가장자리, 점선 구분, 오른쪽 정렬 금액. 금액은 모두 VAT 포함.
 * 그룹(대제목)은 접혀 있고, 누르면 항목이 펼쳐진다.
 */
export function PriceReceipt({ index, total, en, name, groups, start, notes }: Props) {
  return (
    <article className="rc-shadow" aria-labelledby={`receipt-${index}`}>
      <div className="rc">
        <header className="rc-head">
          <p className="rc-brand" lang="en">
            Saffir Technology
          </p>
          <p className="rc-no" lang="en">
            Price list {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <h3 id={`receipt-${index}`} className="rc-title">
            <span lang="en">{en}</span>
            {name}
          </h3>
        </header>

        {groups.map((group) => (
          <details key={group.title} className="rc-group">
            <summary className="rc-group-title">
              <span className="rc-group-text">
                <span className="rc-group-name">{group.title}</span>
                <span className="rc-group-from">{groupStart(group)}</span>
              </span>
              <svg viewBox="0 0 12 8" aria-hidden="true">
                <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </summary>
            <ul>
              {group.rows.map((row) => (
                <li key={row.name} className="rc-row">
                  <div className="rc-item">
                    <span className="rc-name">{row.name}</span>
                    {row.includes ? <span className="rc-includes">{row.includes}</span> : null}
                  </div>
                  <div className="rc-prices">
                    {row.prices.map((price) => (
                      <Price key={`${price.label ?? ""}-${price.value}`} price={price} />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </details>
        ))}

        <div className="rc-total">
          <span lang="en">From</span>
          <span className="rc-total-label">{start.label}</span>
          <strong>
            {start.value === null ? (
              "별도 견적"
            ) : (
              <>
                {formatKRW(start.value)}
                <small>부터</small>
              </>
            )}
          </strong>
        </div>

        <footer className="rc-foot">
          {notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
          <span className="rc-code" aria-hidden="true" />
          <p className="rc-thanks" lang="en">
            Thank you
          </p>
        </footer>
      </div>
    </article>
  );
}
