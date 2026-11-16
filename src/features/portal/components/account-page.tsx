import { dataSource } from "@/server/api";
import { requirePortal } from "@/server/portal";
import { routes } from "@/shared/config";
import {
  NoteBox,
  Pill,
  PortalPanel,
  PortalTitle,
  Sheet,
  pBtnDark,
  pBtnLight,
  pInput,
} from "@/shared/ui";
import { listInvites } from "@/server/invites";
import { cancelInviteAction, inviteColleagueAction, updateCompanyAction } from "../api/account";
import { PortalPage } from "./portal-page";

type Notice = { saved?: boolean; error?: string; invited?: string; inviteError?: string };

async function Body({ saved, error, invited, inviteError }: Notice) {
  const { session, data } = await requirePortal(routes.portal.account);
  const editable = dataSource() === "api";
  const canInvite = editable && session.kinds.includes("project");
  const pending = canInvite ? await listInvites() : [];
  const value = (v: string) => (v === "-" ? "" : v);
  return (
    <>
      <PortalTitle title="계정" sub={`${session.name} · ${session.email}`} />
      <PortalPanel title="회사·병원 정보" sub="세금계산서와 청구서에 쓰입니다.">
        {saved ? (
          <p role="status" className="mb-4 rounded-lg bg-neutral-100 px-4 py-3 text-sm">
            저장했습니다.
          </p>
        ) : null}
        {error ? (
          <p role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}
        {editable ? (
          <form action={updateCompanyAction} className="grid max-w-3xl gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="co-name" className="mb-1.5 block text-sm font-semibold">
                병원·회사 이름
              </label>
              <input
                id="co-name"
                name="organization"
                defaultValue={value(data.company.name)}
                maxLength={200}
                className={pInput}
              />
            </div>
            <div>
              <label htmlFor="co-biz" className="mb-1.5 block text-sm font-semibold">
                사업자등록번호
              </label>
              <input
                id="co-biz"
                name="businessNumber"
                defaultValue={value(data.company.businessNumber)}
                inputMode="numeric"
                placeholder="000-00-00000"
                className={pInput}
              />
            </div>
            <div>
              <label htmlFor="co-tax" className="mb-1.5 block text-sm font-semibold">
                세금계산서 받을 이메일
              </label>
              <input
                id="co-tax"
                name="taxEmail"
                type="email"
                defaultValue={value(data.company.taxEmail)}
                placeholder="tax@example.com"
                className={pInput}
              />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className={pBtnDark}>
                저장
              </button>
            </div>
          </form>
        ) : (
          <>
            <dl className="grid max-w-3xl border-t border-l border-neutral-300 text-sm sm:grid-cols-[12rem_minmax(0,1fr)]">
              {[
                ["이름", data.company.name],
                ["사업자등록번호", data.company.businessNumber],
                ["세금계산서 받을 이메일", data.company.taxEmail],
              ].map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="border-r border-b border-neutral-300 bg-[#f3f3f3] px-4 py-3 text-xs font-semibold text-neutral-700">
                    {k}
                  </dt>
                  <dd className="border-r border-b border-neutral-300 px-4 py-3">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-neutral-500">데모 계정은 정보를 바꿀 수 없습니다.</p>
          </>
        )}
      </PortalPanel>

      <PortalPanel title="담당자" sub="여러 명이 같은 고객사 계정을 씁니다.">
        <Sheet
          columns={["이름", "이메일", "역할"]}
          rows={data.members.map((m) => [
            m.name,
            m.email,
            <Pill key="r" tone={m.role === "관리자" ? "strong" : "default"}>
              {m.role}
            </Pill>,
          ])}
        />
        <div id="invite" className="mt-5 max-w-xl">
          <p className="mb-1.5 text-sm font-semibold">동료 초대</p>
          {invited ? (
            <p role="status" className="mb-3 rounded-lg bg-neutral-100 px-4 py-3 text-sm">
              {invited}에게 초대 메일을 보냈습니다. 7일 안에 링크로 가입하거나 로그인하면
              연결됩니다.
            </p>
          ) : null}
          {inviteError ? (
            <p role="alert" className="mb-3 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {inviteError}
            </p>
          ) : null}
          <form action={canInvite ? inviteColleagueAction : undefined} className="flex gap-2">
            <input
              name="email"
              type="email"
              required
              aria-label="초대할 동료 이메일"
              placeholder="name@example.com"
              disabled={!canInvite}
              className={`${pInput} disabled:bg-neutral-50`}
            />
            <button
              type="submit"
              disabled={!canInvite}
              className={`${pBtnLight} shrink-0 disabled:opacity-50`}
            >
              초대 메일 보내기
            </button>
          </form>
          {pending.length > 0 ? (
            <div className="mt-4">
              <p className="mb-1.5 text-xs font-semibold text-neutral-600">수락 대기 중</p>
              <ul className="flex flex-col gap-1.5 text-sm">
                {pending.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-3">
                    <span>
                      {p.email}
                      <span className="ml-1.5 text-xs text-neutral-500">
                        {p.invitedBy ? `${p.invitedBy} 초대 · ` : ""}
                        {p.expiresAt.slice(5, 10)}까지
                      </span>
                    </span>
                    <form action={cancelInviteAction.bind(null, p.id)}>
                      <button type="submit" className="text-xs text-neutral-400 hover:text-red-600">
                        취소
                      </button>
                    </form>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {canInvite ? null : (
            <div className="mt-3">
              <NoteBox>
                {editable
                  ? "고객사(프로젝트)에 연결된 계정만 동료를 초대할 수 있습니다. 담당 PM에게 문의해 주세요."
                  : "데모 계정은 초대 메일을 보낼 수 없습니다."}
              </NoteBox>
            </div>
          )}
        </div>
      </PortalPanel>
    </>
  );
}

export function AccountPage(notice: Notice) {
  return (
    <PortalPage title="계정">
      <Body {...notice} />
    </PortalPage>
  );
}
