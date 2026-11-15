import { requirePortal } from "@/server/portal";
import { routes } from "@/shared/config";
import { NoteBox, Pill, PortalPanel, PortalTitle, Sheet, pBtnLight, pInput } from "@/shared/ui";
import { PortalPage } from "./portal-page";

async function Body() {
  const { session, data } = await requirePortal(routes.portal.account);
  return (
    <>
      <PortalTitle title="계정" sub={`${session.name} · ${session.email}`} />
      <PortalPanel title="회사·병원 정보" sub="세금계산서와 청구서에 쓰입니다.">
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
        <p className="mt-3 text-xs text-neutral-500">
          정보를 바꾸려면 담당 PM에게 알려 주세요. 직접 수정 기능은 준비 중입니다.
        </p>
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
        <div className="mt-5 max-w-xl">
          <p className="mb-1.5 text-sm font-semibold">동료 초대</p>
          <div className="flex gap-2">
            <input
              aria-label="초대할 동료 이메일"
              placeholder="name@example.com"
              disabled
              className={`${pInput} disabled:bg-neutral-50`}
            />
            <button type="button" disabled className={`${pBtnLight} disabled:opacity-50`}>
              초대 메일 보내기
            </button>
          </div>
          <div className="mt-3">
            <NoteBox>
              초대 메일 기능은 준비 중입니다. 지금은 담당 PM에게 이메일을 알려 주시면 연결해
              드립니다.
            </NoteBox>
          </div>
        </div>
      </PortalPanel>
    </>
  );
}

export function AccountPage() {
  return (
    <PortalPage title="계정">
      <Body />
    </PortalPage>
  );
}
