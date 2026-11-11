import { routes } from "@/shared/config";
import {
  ButtonLink,
  Note,
  PageHeader,
  Section,
  StateTable,
  WireButton,
  WireInput,
} from "@/shared/ui";

/** 비밀번호 찾기: 가입한 이메일로 재설정 링크 보내기 */
export function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-3xl">
      <PageHeader
        label="S1 · 제목"
        title="비밀번호 찾기"
        lead="가입한 이메일로 비밀번호를 다시 정하는 링크를 보내 드립니다."
      />
      <Section label="S2 · 이메일">
        <div className="max-w-sm space-y-4">
          <WireInput label="가입한 이메일" placeholder="name@example.com" required />
          <WireButton>재설정 링크 보내기</WireButton>
        </div>
      </Section>
      <Section label="S3 · 보낸 뒤" title="메일을 보냈습니다">
        <Note title="안내">
          <p>
            메일의 링크는 [ 30분 ] 동안 쓸 수 있습니다. 메일이 오지 않으면 스팸함을 확인하거나 다시
            보내 주세요. 가입하지 않은 이메일이어도 같은 안내가 보입니다.
          </p>
        </Note>
        <ButtonLink href={routes.auth.login} variant="secondary">
          로그인으로
        </ButtonLink>
      </Section>
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
