import { signupBenefits, signupCollects } from "@/content/membership";
import { routes } from "@/shared/config";
import { BulletList, ButtonLink, PageHeader, Section, Todo } from "@/shared/ui";

export function SignupPage() {
  return (
    <div className="w-full max-w-3xl">
      <PageHeader title="무료 회원가입" lead="무료 진단 결과를 끝까지 보고 저장할 수 있습니다." />
      <Section title="가입하면 열리는 것">
        <BulletList items={signupBenefits} />
      </Section>
      <Section title="가입할 때 받는 정보">
        <BulletList items={signupCollects} />
        <Todo>회원가입 폼 (개인정보 수집·이용 동의 포함)</Todo>
        <ButtonLink href={routes.auth.login} variant="secondary">
          이미 계정이 있어요
        </ButtonLink>
      </Section>
    </div>
  );
}
