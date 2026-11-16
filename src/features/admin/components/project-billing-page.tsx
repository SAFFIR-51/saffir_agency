import { short, todayKST } from "@/server/projects";
import { cn, formatKRW } from "@/shared/lib";
import { addPaymentAction, markPaymentPaidAction, removePaymentAction } from "../api/actions";
import { AdminPage } from "./admin-page";
import { loadProject, ProjectFrame } from "./project-frame";
import { Panel, btnDark, btnSmall, input, label, table, td, th } from "./ui";

/** 청구: 계약금·잔금·월 이용료 등. 만들면 고객 포털 '청구·결제'와 알림에 바로 보인다 */
async function Body({ projectId, error }: { projectId: string; error?: boolean }) {
  const { project, href } = await loadProject(projectId, "billing");
  const payments = project.payments ?? [];
  const today = todayKST();
  const sum = (list: typeof payments) => list.reduce((n, p) => n + p.amount, 0);
  const unpaid = payments.filter((p) => !p.paidAt);
  const paid = payments.filter((p) => p.paidAt);

  return (
    <ProjectFrame project={project} tab="billing" href={href}>
      <div className="mb-8 grid grid-cols-3 border border-neutral-300 text-sm">
        {[
          ["전체 청구", formatKRW(sum(payments))],
          ["받은 금액", formatKRW(sum(paid))],
          ["받을 금액", formatKRW(sum(unpaid))],
        ].map(([k, v]) => (
          <div key={k} className="border-r border-neutral-300 px-4 py-3 last:border-r-0">
            <p className="text-xs text-neutral-500">{k}</p>
            <p className="mt-1 text-lg font-bold tabular-nums">{v}</p>
          </div>
        ))}
      </div>

      <Panel
        title="청구 목록"
        sub="고객 포털 '청구·결제'에 그대로 보입니다. 토스로 결제하면 자동으로 결제 완료가 되고, 계좌이체는 여기서 직접 완료로 바꿉니다."
      >
        <div className="overflow-x-auto">
          <table className={table}>
            <thead>
              <tr>
                <th className={th}>청구 번호</th>
                <th className={th}>항목</th>
                <th className={th}>금액</th>
                <th className={th}>기한</th>
                <th className={th}>상태</th>
                <th className={th} />
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => {
                const late = !p.paidAt && p.due && p.due < today;
                return (
                  <tr key={p.id}>
                    <td className={cn(td, "whitespace-nowrap text-neutral-500 tabular-nums")}>
                      {p.invoiceNumber ?? "-"}
                    </td>
                    <td className={cn(td, "font-semibold")}>{p.title}</td>
                    <td className={cn(td, "whitespace-nowrap tabular-nums")}>
                      {formatKRW(p.amount)}
                    </td>
                    <td
                      className={cn(td, "whitespace-nowrap tabular-nums", late && "text-red-600")}
                    >
                      {p.due ? short(p.due) : "-"}
                      {late ? " 지남" : ""}
                    </td>
                    <td className={cn(td, "whitespace-nowrap")}>
                      {p.paidAt ? `결제 완료 ${short(p.paidAt)}` : "미결제"}
                    </td>
                    <td className={cn(td, "whitespace-nowrap")}>
                      {p.paidAt ? null : (
                        <div className="flex gap-1.5">
                          <form action={markPaymentPaidAction.bind(null, project.id, p.id)}>
                            <button type="submit" className={btnSmall}>
                              결제 완료로
                            </button>
                          </form>
                          <form action={removePaymentAction.bind(null, project.id, p.id)}>
                            <button
                              type="submit"
                              className={cn(btnSmall, "text-neutral-500 hover:text-red-600")}
                            >
                              삭제
                            </button>
                          </form>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={6} className={cn(td, "py-8 text-center text-neutral-500")}>
                    아직 청구가 없습니다.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-neutral-500">
          결제된 청구는 지울 수 없습니다. 금액을 잘못 넣었다면 결제 전에 지우고 다시 만들어 주세요.
        </p>
      </Panel>

      <Panel id="new" title="청구 만들기" sub="만들면 고객 포털 알림에 '새 청구'가 올라갑니다.">
        <form
          action={addPaymentAction.bind(null, project.id)}
          className="grid max-w-3xl gap-3 sm:grid-cols-[1fr_11rem_10rem_auto] sm:items-end"
        >
          {error ? (
            <p role="alert" className="text-sm text-red-600 sm:col-span-4">
              항목과 금액(1원 이상)을 확인해 주세요.
            </p>
          ) : null}
          <div>
            <label htmlFor="pay-title" className={label}>
              항목
            </label>
            <input
              id="pay-title"
              name="title"
              required
              maxLength={200}
              placeholder="예: 웹앱 MVP 잔금 (검수 후)"
              className={input}
            />
          </div>
          <div>
            <label htmlFor="pay-amount" className={label}>
              금액 (원, 부가세 포함)
            </label>
            <input
              id="pay-amount"
              name="amount"
              required
              inputMode="numeric"
              placeholder="3300000"
              className={cn(input, "tabular-nums")}
            />
          </div>
          <div>
            <label htmlFor="pay-due" className={label}>
              기한
            </label>
            <input id="pay-due" name="due" type="date" className={input} />
          </div>
          <button type="submit" className={btnDark}>
            청구 만들기
          </button>
        </form>
      </Panel>
    </ProjectFrame>
  );
}

export function ProjectBillingPage({ projectId, error }: { projectId: string; error?: boolean }) {
  return (
    <AdminPage>
      <Body projectId={projectId} error={error} />
    </AdminPage>
  );
}
