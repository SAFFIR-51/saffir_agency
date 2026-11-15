import { requirePortal } from "@/server/portal";
import { canSeePortalMenu, portalMenuAudienceLabel, routes } from "@/shared/config";
import { PortalNoAccess } from "@/shared/layout";
import {
  NoteBox,
  Picker,
  Pill,
  PortalPanel,
  PortalTitle,
  Sheet,
  pBtnDark,
  pInput,
  pLabel,
  pLink,
  pTextarea,
  toOptions,
} from "@/shared/ui";
import { sendRequest } from "../api/create-request";
import { PortalPage } from "./portal-page";

const TITLE = "요청·문의";
const statusTone = { 접수: "strong", 확인: "default", "처리 중": "default", 완료: "done" } as const;

async function Body({ sent, error }: { sent?: string; error?: boolean }) {
  const { session, data } = await requirePortal(routes.portal.requests);
  if (!canSeePortalMenu(routes.portal.requests, session.kinds)) {
    return (
      <PortalNoAccess title={TITLE} audience={portalMenuAudienceLabel(routes.portal.requests)} />
    );
  }
  return (
    <>
      <PortalTitle
        title={TITLE}
        sub="수정 요청과 장애 신고를 보내고 처리 상태를 봅니다. 장애 신고는 먼저 처리합니다."
        actions={
          data.requestTargets.length > 0 ? (
            <a href="#new" className={pBtnDark}>
              새 요청
            </a>
          ) : null
        }
      />
      {sent ? (
        <div className="mb-8">
          <NoteBox>
            <span role="status">
              <b>{sent}</b> 요청을 받았습니다. 담당자가 확인하면 이곳에 답변이 올라옵니다.
            </span>
          </NoteBox>
        </div>
      ) : null}

      <PortalPanel title="보낸 요청" sub="접수 → 확인 → 처리 중 → 완료">
        <Sheet
          columns={["번호", "유형", "제목", "보낸 날", "상태", "답변"]}
          empty="보낸 요청이 없습니다."
          firstIsHeader={false}
          rows={data.requests.map((r) => [
            <span key="i" className="whitespace-nowrap text-neutral-500 tabular-nums">
              {r.id}
            </span>,
            <span
              key="k"
              className={r.kind === "장애 신고" ? "font-semibold text-red-600" : undefined}
            >
              {r.kind}
            </span>,
            <span key="t" className="font-semibold">
              {r.title}
            </span>,
            <span key="d" className="tabular-nums">
              {r.date}
            </span>,
            <Pill key="s" tone={statusTone[r.status]}>
              {r.status}
            </Pill>,
            r.reply ?? <span className="text-neutral-400">답변 전</span>,
          ])}
        />
      </PortalPanel>

      <PortalPanel id="new" title="새 요청 보내기">
        {data.requestTargets.length > 0 ? (
          <form action={sendRequest} className="grid max-w-3xl gap-4 sm:grid-cols-2">
            {error ? (
              <p role="alert" className="text-sm text-red-600 sm:col-span-2">
                모든 칸을 입력해 주세요.
              </p>
            ) : null}
            {data.requestTargets.length > 1 ? (
              <div>
                <label htmlFor="req-target" className={pLabel}>
                  대상
                </label>
                <Picker
                  id="req-target"
                  name="target"
                  defaultValue="0"
                  options={data.requestTargets.map((t, i) => ({
                    value: String(i),
                    label: t.label,
                  }))}
                />
              </div>
            ) : (
              <input type="hidden" name="target" value="0" />
            )}
            <div>
              <label htmlFor="req-kind" className={pLabel}>
                유형
              </label>
              <Picker
                id="req-kind"
                name="kind"
                defaultValue="수정 요청"
                options={toOptions(["수정 요청", "장애 신고", "문의"])}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="req-title" className={pLabel}>
                제목
              </label>
              <input id="req-title" name="title" required maxLength={120} className={pInput} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="req-body" className={pLabel}>
                내용
              </label>
              <textarea
                id="req-body"
                name="body"
                required
                rows={6}
                placeholder={
                  "어느 화면에서, 무엇을, 어떻게 바꾸면 좋을지 적어 주세요.\n장애라면 언제부터 어떤 문제가 있는지 알려 주세요."
                }
                className={pTextarea}
              />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className={pBtnDark}>
                요청 보내기
              </button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-neutral-500">
            계약한 프로젝트·솔루션이 있으면 이곳에서 요청을 보낼 수 있습니다. 그 전에는{" "}
            <a href={routes.contact} className={pLink}>
              문의하기
            </a>
            를 이용해 주세요.
          </p>
        )}
      </PortalPanel>
    </>
  );
}

export function RequestsPage({ sent, error }: { sent?: string; error?: boolean }) {
  return (
    <PortalPage title={TITLE}>
      <Body sent={sent} error={error} />
    </PortalPage>
  );
}
