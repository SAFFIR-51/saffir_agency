import { routes } from "@/shared/config";
import { ButtonLink, PageHeader, Section, StateTable, WireButton, WireInput } from "@/shared/ui";

const inviteStates = [
  {
    state: "초대가 유효함",
    screen: "고객사 이름, 초대받은 이메일, 비밀번호 입력창",
    next: "계정 만들고 연결",
  },
  { state: "이미 가입한 이메일", screen: "로그인하면 이 고객사에 연결된다는 안내", next: "로그인" },
  {
    state: "초대 만료·이미 수락",
    screen: "초대를 쓸 수 없다는 안내",
    next: "담당자에게 다시 요청 / 문의",
  },
];

/** 계약 고객이 초대 메일의 링크로 들어오는 화면 */
export function InvitePage() {
  return (
    <div className="w-full max-w-3xl">
      <PageHeader
        label="S1 · 제목"
        title="사피어 포털 초대"
        lead="[ 고객사 이름 ]의 포털에 초대되었습니다. 진행 현황, 보고, 청구를 이곳에서 확인합니다."
      />
      <Section label="S2 · 계정 만들기">
        <div className="max-w-sm space-y-4">
          <WireInput label="이메일 (초대받은 주소, 바꿀 수 없음)" />
          <WireInput label="이름" required />
          <WireInput label="비밀번호" required />
          <WireInput label="개인정보 수집·이용 동의" kind="checkbox" required />
          <WireButton>계정 만들고 연결하기</WireButton>
        </div>
      </Section>
      <Section label="S3 · 이미 계정이 있다면" title="이미 사피어 계정이 있다면">
        <p className="text-foreground/70">로그인하면 이 고객사에 바로 연결됩니다.</p>
        <ButtonLink href={routes.auth.login} variant="secondary">
          로그인하고 연결하기
        </ButtonLink>
      </Section>
      <Section label="S4 · 상태" title="상태별 화면">
        <StateTable states={inviteStates} />
      </Section>
    </div>
  );
}
