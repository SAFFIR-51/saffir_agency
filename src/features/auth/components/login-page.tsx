import { loginNotes, loginPurposes, memberTypes } from "@/content/membership";
import { routes } from "@/shared/config";
import { BulletList, ButtonLink, DataTable, PageHeader, Section, Todo } from "@/shared/ui";

export function LoginPage() {
  return (
    <div className="w-full max-w-3xl">
      <PageHeader title="로그인" lead="saffirgeo와 포털 계정을 하나로 씁니다." />
      <Section title="로그인 폼">
        <Todo>이메일 로그인 폼 (통합 로그인)</Todo>
        <ButtonLink href={routes.auth.signup} variant="secondary">
          무료 회원가입
        </ButtonLink>
      </Section>
      <Section title="로그인은 두 가지 용도로만 씁니다">
        <BulletList ordered items={loginPurposes} />
        <BulletList items={loginNotes} />
      </Section>
      <Section title="회원 유형">
        <DataTable
          columns={["회원 유형", "대상", "볼 수 있는 것"]}
          rows={memberTypes.map((m) => [m.type, m.target, m.access])}
        />
      </Section>
    </div>
  );
}
