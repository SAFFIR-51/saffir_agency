import type { Route } from "next";
import Link from "next/link";
import { listStaff, requireStaff, workloadOf } from "@/server/projects";
import { routes } from "@/shared/config";
import { addStaffAction, removeStaffAction, renameStaffAction } from "../api/actions";
import { AdminPage } from "./admin-page";
import { AdminTitle, Panel, btnDark, btnLight, btnSmall, input, table, td, th } from "./ui";

/** 팀: 담당자 목록과 맡은 일 수. 담당·PM 선택칸에 이 목록이 나온다 */
async function Body({ edit }: { edit?: string }) {
  await requireStaff(routes.admin.team);
  const staff = listStaff();
  return (
    <>
      <AdminTitle
        title="팀"
        sub="작업 담당, 요청 담당, PM을 고를 때 이 목록이 나옵니다. 이름을 바꾸면 맡은 일에도 같이 바뀝니다."
      />
      <table className={table}>
        <thead>
          <tr>
            {["이름", "PM 프로젝트", "진행 중 작업", "열린 요청", ""].map((h, i) => (
              <th key={i} scope="col" className={th}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {staff.map((name) => {
            const w = workloadOf(name);
            if (edit === name)
              return (
                <tr key={name} className="bg-neutral-50">
                  <td colSpan={5} className={td}>
                    <form action={renameStaffAction.bind(null, name)} className="flex gap-2">
                      <label htmlFor="rename-staff" className="sr-only">
                        새 이름
                      </label>
                      <input
                        id="rename-staff"
                        name="name"
                        defaultValue={name}
                        required
                        className={`${input} max-w-xs`}
                      />
                      <button type="submit" className={btnDark}>
                        저장
                      </button>
                      <Link href={routes.admin.team} className={btnLight}>
                        취소
                      </Link>
                    </form>
                  </td>
                </tr>
              );
            return (
              <tr key={name}>
                <th scope="row" className={`${td} text-left font-semibold`}>
                  {name}
                </th>
                <td className={`${td} tabular-nums`}>{w.pm}</td>
                <td className={`${td} tabular-nums`}>{w.tasks}</td>
                <td className={`${td} tabular-nums`}>{w.requests}</td>
                <td className={`${td} w-40`}>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`${routes.admin.team}?edit=${encodeURIComponent(name)}` as Route}
                      className={btnSmall}
                    >
                      이름 수정
                    </Link>
                    <form action={removeStaffAction.bind(null, name)}>
                      <button type="submit" className="text-xs text-neutral-400 hover:text-red-600">
                        빼기
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-2 text-xs text-neutral-500">
        빼면 맡던 작업·요청은 &lsquo;미지정&rsquo;이 됩니다.
      </p>

      <Panel title="팀원 추가">
        <form action={addStaffAction} className="flex max-w-xl gap-2">
          <label htmlFor="new-staff" className="sr-only">
            이름
          </label>
          <input
            id="new-staff"
            name="name"
            required
            placeholder="예: 김사피 (디자이너)"
            className={input}
          />
          <button type="submit" className={btnDark}>
            추가
          </button>
        </form>
      </Panel>
    </>
  );
}

export function AdminTeamPage({ edit }: { edit?: string }) {
  return (
    <AdminPage>
      <Body edit={edit} />
    </AdminPage>
  );
}
