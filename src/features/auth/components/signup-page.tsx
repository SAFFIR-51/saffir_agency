import { signupBenefits } from "@/content/membership";
import { routes } from "@/shared/config";
import { BulletList, ButtonLink, PageHeader, Section, WireButton, WireInput } from "@/shared/ui";

export function SignupPage() {
  return (
    <div className="w-full max-w-3xl">
      <PageHeader
        label="S1 · 제목"
        title="무료 회원가입"
        lead="진단 결과를 끝까지 보고 저장할 수 있습니다."
      />
      <Section label="S2 · 혜택" title="가입하면">
        <BulletList items={signupBenefits} />
      </Section>
      <Section label="S3 · 가입">
        <div className="max-w-sm space-y-4">
          <WireInput label="병원명" required />
          <WireInput label="이메일" required />
          <WireInput label="연락처" required placeholder="010-0000-0000" />
          <WireInput label="비밀번호" required />
          <WireInput label="개인정보 수집·이용 동의" kind="checkbox" required />
          <WireButton>가입하기</WireButton>
        </div>
        <ButtonLink href={routes.auth.login} variant="secondary">
          이미 계정이 있어요
        </ButtonLink>
      </Section>
    </div>
  );
}
