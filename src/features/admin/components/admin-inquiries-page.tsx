import type { Route } from "next";
import Link from "next/link";
import {
  INQUIRY_KIND_LABEL,
  INQUIRY_STATUS_LABEL,
  type Inquiry,
  type InquiryKind,
  type InquiryStatus,
  inquiryCounts,
  listInquiries,
} from "@/server/inquiry";
import { listStaff, requireStaff } from "@/server/projects";
import { routes } from "@/shared/config";
import { cn } from "@/shared/lib";
import { Picker, toOptions } from "@/shared/ui";
import { updateInquiryAction } from "../api/inquiry-actions";
import { AdminPage } from "./admin-page";
import { AdminTitle, Panel, btnDark, label, linkName, table, td, textarea, th } from "./ui";

type Filter = { status?: InquiryStatus; kind?: InquiryKind; id?: string };

const STATUS_ORDER: InquiryStatus[] = ["new", "replied", "closed"];

function href(filter: Filter, patch: Partial<Filter>) {
  const next = { ...filter, ...patch };
  const q = new URLSearchParams();
  if (next.status) q.set("status", next.status);
  if (next.kind) q.set("kind", next.kind);
  if (next.id) q.set("id", next.id);
  const query = q.toString();
  return `${routes.admin.inquiries}${query ? `?${query}` : ""}` as Route;
}

function StatusChip({ status }: { status: InquiryStatus }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full px-2.5 text-xs font-semibold whitespace-nowrap",
        status === "new" && "bg-black text-white",
        status === "replied" && "border border-neutral-300 bg-white text-black",
        status === "closed" && "bg-neutral-100 text-neutral-500",
      )}
    >
      {INQUIRY_STATUS_LABEL[status]}
    </span>
  );
}

function Tabs({
  items,
}: {
  items: { label: string; href: Route; active: boolean; count?: number }[];
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <Link
          key={t.label}
          href={t.href}
          aria-current={t.active ? "page" : undefined}
          className={cn(
            "inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold",
            t.active
              ? "bg-black text-white"
              : "border border-neutral-300 bg-white hover:border-black",
          )}
        >
          {t.label}
          {t.count !== undefined ? (
            <span className={cn("tabular-nums", t.active ? "text-white/70" : "text-neutral-500")}>
              {t.count}
            </span>
          ) : null}
        </Link>
      ))}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  if (!v) return null;
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-3 border-b border-neutral-200 py-2.5 text-sm">
      <dt className="text-neutral-500">{k}</dt>
      <dd className="break-words whitespace-pre-wrap">{v}</dd>
    </div>
  );
}

function Detail({ item, back }: { item: Inquiry; back: string }) {
  return (
    <Panel
      id="detail"
      title={`${INQUIRY_KIND_LABEL[item.kind]} #${item.id} · ${item.company || item.name}`}
      sub={`${item.receivedAt} 접수`}
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <dl>
          <Row k="담당자" v={item.name} />
          <Row k="회사·병원" v={item.company} />
          <Row k="연락처" v={item.phone} />
          <Row k="이메일" v={item.email} />
          <Row k={item.kind === "estimate" ? "개발 분야" : "문의 유형"} v={item.type} />
          <Row k="플랫폼" v={item.platforms} />
          <Row k="준비 상태" v={item.readiness} />
          <Row k="예산" v={item.budget} />
          <Row k="희망 일정" v={item.schedule} />
          <Row k="참고 사이트" v={item.reference} />
          <Row k={item.kind === "estimate" ? "요구사항" : "문의 내용"} v={item.body} />
          <div className="mt-4 flex flex-wrap gap-2">
            {item.phone ? (
              <a href={`tel:${item.phone}`} className={`${linkName} text-sm`}>
                전화 걸기
              </a>
            ) : null}
            {item.email ? (
              <a href={`mailto:${item.email}`} className={`${linkName} text-sm`}>
                메일 쓰기
              </a>
            ) : null}
          </div>
        </dl>

        <form
          action={updateInquiryAction.bind(null, item.id, back)}
          className="flex flex-col gap-4 rounded-xl border border-neutral-300 p-5"
        >
          <div>
            <label htmlFor="iq-status" className={label}>
              상태
            </label>
            <Picker
              id="iq-status"
              name="status"
              defaultValue={item.status}
              options={STATUS_ORDER.map((s) => ({ value: s, label: INQUIRY_STATUS_LABEL[s] }))}
            />
          </div>
          <div>
            <label htmlFor="iq-assignee" className={label}>
              담당
            </label>
            <Picker
              id="iq-assignee"
              name="assignee"
              defaultValue={item.assignee}
              options={toOptions(
                [...new Set([...listStaff(), ...(item.assignee ? [item.assignee] : [])])],
                "미지정",
              )}
            />
          </div>
          <div>
            <label htmlFor="iq-memo" className={label}>
              내부 메모 (고객에게 안 보임)
            </label>
            <textarea
              id="iq-memo"
              name="memo"
              rows={5}
              defaultValue={item.memo}
              placeholder="예: 11/16 전화 상담, 견적서 보내기로 함"
              className={textarea}
            />
          </div>
          <button type="submit" className={btnDark}>
            저장
          </button>
        </form>
      </div>
    </Panel>
  );
}

async function Body({ filter }: { filter: Filter }) {
  await requireStaff(routes.admin.inquiries);
  const [items, counts] = await Promise.all([
    listInquiries({ status: filter.status, kind: filter.kind }),
    inquiryCounts(),
  ]);
  const total = counts.new + counts.replied + counts.closed;
  const selected = filter.id ? items.find((x) => x.id === filter.id) : undefined;
  const back = href(filter, {});

  return (
    <>
      <AdminTitle
        title="문의"
        sub="사이트의 문의하기·견적 요청으로 들어온 내용입니다. 1~2일 안에 연락하기로 안내하고 있습니다."
      />
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Tabs
          items={[
            {
              label: "전체",
              href: href(filter, { status: undefined, id: undefined }),
              active: !filter.status,
              count: total,
            },
            ...STATUS_ORDER.map((s) => ({
              label: INQUIRY_STATUS_LABEL[s],
              href: href(filter, { status: s, id: undefined }),
              active: filter.status === s,
              count: counts[s],
            })),
          ]}
        />
        <Tabs
          items={[
            {
              label: "모든 유형",
              href: href(filter, { kind: undefined, id: undefined }),
              active: !filter.kind,
            },
            ...(["contact", "estimate"] as const).map((k) => ({
              label: INQUIRY_KIND_LABEL[k],
              href: href(filter, { kind: k, id: undefined }),
              active: filter.kind === k,
            })),
          ]}
        />
      </div>

      <div className="overflow-x-auto">
        <table className={table}>
          <thead>
            <tr>
              <th className={th}>받은 날</th>
              <th className={th}>구분</th>
              <th className={th}>회사·병원</th>
              <th className={th}>담당자</th>
              <th className={th}>연락처</th>
              <th className={th}>유형·분야</th>
              <th className={th}>상태</th>
              <th className={th}>담당</th>
            </tr>
          </thead>
          <tbody>
            {items.map((x) => (
              <tr key={x.id} className={cn(x.id === filter.id && "bg-neutral-50")}>
                <td className={cn(td, "whitespace-nowrap tabular-nums")}>
                  {x.receivedAt.slice(5)}
                </td>
                <td className={cn(td, "whitespace-nowrap")}>{INQUIRY_KIND_LABEL[x.kind]}</td>
                <td className={td}>
                  <Link href={href(filter, { id: x.id })} className={cn(linkName, "font-semibold")}>
                    {x.company || "(회사명 없음)"}
                  </Link>
                </td>
                <td className={cn(td, "whitespace-nowrap")}>{x.name}</td>
                <td className={cn(td, "whitespace-nowrap tabular-nums")}>{x.phone || "-"}</td>
                <td className={td}>{x.type || "-"}</td>
                <td className={td}>
                  <StatusChip status={x.status} />
                </td>
                <td className={cn(td, "whitespace-nowrap")}>{x.assignee || "-"}</td>
              </tr>
            ))}
            {items.length === 0 ? (
              <tr>
                <td colSpan={8} className={cn(td, "py-10 text-center text-neutral-500")}>
                  해당하는 문의가 없습니다.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {selected ? <Detail item={selected} back={back} /> : null}
    </>
  );
}

export function AdminInquiriesPage(filter: Filter) {
  return (
    <AdminPage>
      <Body filter={filter} />
    </AdminPage>
  );
}
