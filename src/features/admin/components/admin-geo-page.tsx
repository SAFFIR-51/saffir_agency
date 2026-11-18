import type { Route } from "next";
import Link from "next/link";
import { dataSource } from "@/server/api";
import {
  GEO_AREAS,
  GEO_PLAN_LABEL,
  type GeoSiteDetail,
  getGeoSite,
  listGeoSites,
} from "@/server/geo";
import { requireStaff, short, todayKST } from "@/server/projects";
import { routes } from "@/shared/config";
import { cn } from "@/shared/lib";
import { Picker } from "@/shared/ui";
import {
  addGeoDiagnosisAction,
  removeGeoDiagnosisAction,
  removeGeoSiteAction,
  updateGeoSiteAction,
  upsertGeoSiteAction,
} from "../api/geo-actions";
import { AdminPage } from "./admin-page";
import {
  AdminTitle,
  Panel,
  btnDark,
  btnLight,
  btnSmall,
  input,
  label,
  linkName,
  table,
  td,
  textarea,
  th,
} from "./ui";

const errors: Record<string, string> = {
  site: "이메일과 사이트 주소를 입력해 주세요.",
  nouser: "그 이메일로 가입한 계정이 없습니다. 먼저 회원가입을 안내해 주세요.",
  diagnosis: "진단일과 점수(0~100)를 모두 넣어 주세요.",
};

const planOptions = (["free", "pro"] as const).map((p) => ({
  value: p,
  label: GEO_PLAN_LABEL[p],
}));

function Alert({ code }: { code?: string }) {
  if (!code || !errors[code]) return null;
  return (
    <p role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
      {errors[code]}
    </p>
  );
}

function Detail({ site, error }: { site: GeoSiteDetail; error?: string }) {
  const latest = site.diagnoses[0];
  const today = todayKST();
  return (
    <>
      <Panel
        id="detail"
        title={`${site.organization || site.name} · ${site.siteUrl}`}
        sub={`${site.name} · ${site.email} · ${GEO_PLAN_LABEL[site.plan]}`}
        action={
          <Link href={routes.admin.geo} className={btnSmall}>
            목록으로
          </Link>
        }
      >
        <form
          action={updateGeoSiteAction.bind(null, site.id)}
          className="grid max-w-3xl gap-3 sm:grid-cols-[1fr_10rem_auto] sm:items-end"
        >
          <div>
            <label htmlFor="gs-url" className={label}>
              사이트 주소
            </label>
            <input id="gs-url" name="siteUrl" defaultValue={site.siteUrl} className={input} />
          </div>
          <div>
            <label htmlFor="gs-plan" className={label}>
              플랜
            </label>
            <Picker id="gs-plan" name="plan" defaultValue={site.plan} options={planOptions} />
          </div>
          <button type="submit" className={btnLight}>
            저장
          </button>
        </form>
        <p className="mt-2 text-xs text-neutral-500">
          GEO 구독으로 바꾸면 고객 포털에 구독 메뉴가 열립니다.
        </p>
      </Panel>

      <Panel
        id="diagnosis"
        title="진단 결과 입력"
        sub="입력하면 고객 포털 GEO에 최신 진단과 점수 추이로 바로 보입니다."
      >
        {error === "diagnosis" ? <Alert code={error} /> : null}
        <form
          action={addGeoDiagnosisAction.bind(null, site.id)}
          className="grid max-w-4xl gap-3 sm:grid-cols-6"
        >
          <div className="sm:col-span-2">
            <label htmlFor="gd-date" className={label}>
              진단일
            </label>
            <input id="gd-date" name="date" type="date" defaultValue={today} className={input} />
          </div>
          <div>
            <label htmlFor="gd-score" className={label}>
              종합 점수
            </label>
            <input
              id="gd-score"
              name="score"
              inputMode="numeric"
              placeholder="0~100"
              className={input}
            />
          </div>
          <div className="hidden sm:col-span-3 sm:block" />
          {GEO_AREAS.map((name, i) => (
            <div key={name} className={i < 2 ? "sm:col-span-3 lg:col-span-3" : "sm:col-span-3"}>
              <label htmlFor={`gd-area${i}`} className={label}>
                {name}
              </label>
              <input
                id={`gd-area${i}`}
                name={`area${i}`}
                inputMode="numeric"
                placeholder="0~100"
                defaultValue={latest?.areas.find((a) => a.name === name)?.score}
                className={input}
              />
            </div>
          ))}
          <div className="sm:col-span-3">
            <label htmlFor="gd-pri" className={label}>
              개선 우선순위 (줄마다 하나)
            </label>
            <textarea
              id="gd-pri"
              name="priorities"
              rows={4}
              placeholder={
                "예: 진료과목 페이지에 FAQ 구조화데이터 추가\n의료진 소개에 자격·경력 표시"
              }
              className={textarea}
            />
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="gd-vis" className={label}>
              AI 노출 (구독 고객, 줄마다 &ldquo;AI 이름, 나온 수, 질문 수&rdquo;)
            </label>
            <textarea
              id="gd-vis"
              name="visibility"
              rows={4}
              placeholder={"예: ChatGPT, 9, 20\nGemini, 7, 20"}
              className={textarea}
            />
          </div>
          <div className="sm:col-span-6">
            <button type="submit" className={btnDark}>
              진단 결과 저장
            </button>
          </div>
        </form>

        <div className="mt-6 overflow-x-auto">
          <table className={table}>
            <thead>
              <tr>
                <th className={th}>진단일</th>
                <th className={th}>종합</th>
                {GEO_AREAS.map((a) => (
                  <th key={a} className={th}>
                    {a}
                  </th>
                ))}
                <th className={th}>우선순위</th>
                <th className={th}>AI 노출</th>
                <th className={th} />
              </tr>
            </thead>
            <tbody>
              {site.diagnoses.map((d) => (
                <tr key={d.id}>
                  <td className={cn(td, "whitespace-nowrap tabular-nums")}>{d.date}</td>
                  <td className={cn(td, "font-semibold tabular-nums")}>{d.score}</td>
                  {GEO_AREAS.map((a) => (
                    <td key={a} className={cn(td, "tabular-nums")}>
                      {d.areas.find((x) => x.name === a)?.score ?? "-"}
                    </td>
                  ))}
                  <td className={cn(td, "text-xs")}>{d.priorities.length}개</td>
                  <td className={cn(td, "text-xs")}>
                    {d.visibility?.map((v) => `${v.ai} ${v.appeared}/${v.asked}`).join(", ") || "-"}
                  </td>
                  <td className={td}>
                    <form action={removeGeoDiagnosisAction.bind(null, site.id, d.id)}>
                      <button type="submit" className={cn(btnSmall, "hover:text-red-600")}>
                        삭제
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
              {site.diagnoses.length === 0 ? (
                <tr>
                  <td colSpan={9} className={cn(td, "py-8 text-center text-neutral-500")}>
                    아직 진단 기록이 없습니다. 진단 기록이 없으면 고객 포털 GEO는 비어 보입니다.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel id="danger" title="연결 해제">
        <form action={removeGeoSiteAction.bind(null, site.id)} className="flex items-center gap-3">
          <p className="text-sm text-neutral-600">
            사이트 연결을 끊으면 진단·점검 기록도 함께 지워집니다.
          </p>
          <button type="submit" className={cn(btnSmall, "text-red-600")}>
            연결 해제
          </button>
        </form>
      </Panel>
    </>
  );
}

async function Body({ id, error }: { id?: string; error?: string }) {
  await requireStaff(routes.admin.geo);
  if (dataSource() !== "api") {
    return (
      <>
        <AdminTitle title="GEO" sub="고객 사이트의 GEO 진단 기록" />
        <p className="rounded-lg bg-neutral-100 px-4 py-4 text-sm text-neutral-700">
          GEO 진단 기록은 백엔드에 연결하면 이곳에서 입력합니다. 데모에서는 고객 포털 GEO에 예시
          결과가 보입니다.
        </p>
      </>
    );
  }
  const site = id ? await getGeoSite(id) : null;
  if (site) {
    return (
      <>
        <AdminTitle title="GEO" sub="고객 사이트의 GEO 진단 기록" />
        <Detail site={site} error={error} />
      </>
    );
  }
  const sites = await listGeoSites();
  return (
    <>
      <AdminTitle
        title="GEO"
        sub="고객 사이트의 GEO 진단 기록. 진단 후 결과를 입력하면 고객 포털에 보입니다."
      />
      <div className="overflow-x-auto">
        <table className={table}>
          <thead>
            <tr>
              <th className={th}>병원·회사</th>
              <th className={th}>계정</th>
              <th className={th}>사이트</th>
              <th className={th}>플랜</th>
              <th className={th}>최근 진단</th>
              <th className={th}>진단 수</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((s) => (
              <tr key={s.id}>
                <td className={td}>
                  <Link
                    href={`${routes.admin.geo}?id=${s.id}` as Route}
                    className={cn(linkName, "font-semibold")}
                  >
                    {s.organization || s.name}
                  </Link>
                </td>
                <td className={cn(td, "text-xs")}>{s.email}</td>
                <td className={cn(td, "text-xs break-all")}>{s.siteUrl}</td>
                <td className={cn(td, "whitespace-nowrap")}>{GEO_PLAN_LABEL[s.plan]}</td>
                <td className={cn(td, "whitespace-nowrap tabular-nums")}>
                  {s.latest ? `${s.latest.score}점 · ${short(s.latest.date)}` : "진단 전"}
                </td>
                <td className={cn(td, "tabular-nums")}>{s.diagnosisCount}</td>
              </tr>
            ))}
            {sites.length === 0 ? (
              <tr>
                <td colSpan={6} className={cn(td, "py-8 text-center text-neutral-500")}>
                  연결된 사이트가 없습니다.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <Panel
        id="new"
        title="사이트 연결"
        sub="회원가입한 고객 계정에 사이트를 연결합니다. 이미 연결된 계정이면 주소·플랜만 바뀝니다."
      >
        <Alert code={error} />
        <form
          action={upsertGeoSiteAction}
          className="grid max-w-4xl gap-3 sm:grid-cols-[1fr_1fr_10rem_auto] sm:items-end"
        >
          <div>
            <label htmlFor="gn-email" className={label}>
              고객 계정 이메일
            </label>
            <input id="gn-email" name="email" type="email" required className={input} />
          </div>
          <div>
            <label htmlFor="gn-url" className={label}>
              사이트 주소
            </label>
            <input id="gn-url" name="siteUrl" required placeholder="https://" className={input} />
          </div>
          <div>
            <label htmlFor="gn-plan" className={label}>
              플랜
            </label>
            <Picker id="gn-plan" name="plan" defaultValue="free" options={planOptions} />
          </div>
          <button type="submit" className={btnDark}>
            연결
          </button>
        </form>
      </Panel>
    </>
  );
}

export function AdminGeoPage({ id, error }: { id?: string; error?: string }) {
  return (
    <AdminPage>
      <Body id={id} error={error} />
    </AdminPage>
  );
}
