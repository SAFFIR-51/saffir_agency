import "server-only";
import { ApiError, apiFetch } from "../api";

/**
 * 고객 포털 동료 초대 (백엔드 /api/pm/invites).
 * 초대 메일 링크(/invite?token=)로 가입하거나, 이미 계정이 있으면 로그인해 수락하면 그 고객사에 연결된다.
 */
export type InviteLookup =
  | { status: "invalid" }
  | {
      status: "valid" | "expired" | "used";
      email: string;
      client: string;
      invitedBy: string;
      hasAccount: boolean;
    };

export type PendingInvite = { id: string; email: string; invitedBy: string; expiresAt: string };

const isInviteToken = (v: string) => /^[a-f0-9]{64}$/.test(v);

/** 백엔드 오류 응답에서 한국어 메시지를 꺼낸다 */
function messageOf(e: unknown, fallback: string) {
  if (!(e instanceof ApiError)) return fallback;
  try {
    const body = JSON.parse(e.message) as { message?: string | string[] };
    return (Array.isArray(body.message) ? body.message.join(" ") : body.message) || fallback;
  } catch {
    return fallback;
  }
}

export async function lookupInvite(token: string): Promise<InviteLookup> {
  if (!isInviteToken(token)) return { status: "invalid" };
  return apiFetch<InviteLookup>(`/pm/invites/lookup/${token}`).catch(() => ({
    status: "invalid" as const,
  }));
}

export async function listInvites(clientOrgId?: string): Promise<PendingInvite[]> {
  const q = clientOrgId ? `?clientOrgId=${Number(clientOrgId)}` : "";
  const rows = await apiFetch<
    { id: number; email: string; invitedBy: string; expiresAt: string }[]
  >(`/pm/invites${q}`).catch(() => []);
  return rows.map((r) => ({ ...r, id: String(r.id) }));
}

export async function sendInvite(
  email: string,
  clientOrgId?: string,
): Promise<{ ok: true; status: "invited" | "linked" } | { ok: false; error: string }> {
  try {
    const res = await apiFetch<{ status: "invited" | "linked" }>("/pm/invites", {
      method: "POST",
      body: JSON.stringify({ email, ...(clientOrgId && { clientOrgId: Number(clientOrgId) }) }),
    });
    return { ok: true, status: res.status };
  } catch (e) {
    return {
      ok: false,
      error: messageOf(e, "초대를 보내지 못했습니다. 잠시 후 다시 시도해 주세요."),
    };
  }
}

export async function cancelInvite(id: string) {
  await apiFetch(`/pm/invites/${Number(id)}`, { method: "DELETE" }).catch(() => undefined);
}

export async function acceptInviteToken(
  token: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isInviteToken(token)) return { ok: false, error: "초대 주소가 올바르지 않습니다." };
  try {
    await apiFetch(`/pm/invites/accept/${token}`, { method: "POST" });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: messageOf(e, "초대를 수락하지 못했습니다.") };
  }
}
