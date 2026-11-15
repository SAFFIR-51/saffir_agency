import { routes } from "@/shared/config";
import { ButtonLink, PageHeader, Section, StateTable, WireButton, WireInput } from "@/shared/ui";
import { FindAccount } from "./find-account";

/** 아이디·비밀번호 찾기 */
export function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-[400px]">
      <h1 className="text-[1.75rem] leading-[1.3] font-bold tracking-[-0.03em]">
        아이디 · 비밀번호 찾기
      </h1>
      <p className="mt-2 text-[0.9375rem] text-neutral-600">가입한 정보로 계정을 확인합니다.</p>
      <div className="mt-8">
        <FindAccount />
      </div>
    </div>
  );
}

const resetStates = [
  { state: "링크가 맞음", screen: "새 비밀번호 입력창", next: "비밀번호 바꾸기" },
  { state: "링크 시간이 지남·이미 씀", screen: "링크를 쓸 수 없다는 안내", next: "다시 요청하기" },
  { state: "바꾸기 완료", screen: "비밀번호를 바꿨다는 안내", next: "로그인" },
];

/** 메일 링크로 들어와 새 비밀번호 정하기 */
export function ResetPasswordPage() {
  return (
    <div className="w-full max-w-3xl">
      <PageHeader label="S1 · 제목" title="새 비밀번호 정하기" />
      <Section label="S2 · 새 비밀번호">
        <div className="max-w-sm space-y-4">
          <WireInput label="새 비밀번호" required />
          <WireInput label="새 비밀번호 확인" required />
          <WireButton>비밀번호 바꾸기</WireButton>
        </div>
      </Section>
      <Section label="S3 · 상태" title="상태별 화면">
        <StateTable states={resetStates} />
        <ButtonLink href={routes.auth.forgotPassword} variant="secondary">
          링크 다시 요청하기
        </ButtonLink>
      </Section>
    </div>
  );
}
