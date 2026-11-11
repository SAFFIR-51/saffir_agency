import { routes } from "@/shared/config";
import { ButtonLink, PageHeader, Section } from "@/shared/ui";

/** 가입하지 않은 서비스의 포털 메뉴로 주소를 직접 쳐서 들어왔을 때 */
export function PortalNoAccess({ title, audience }: { title: string; audience: string }) {
  return (
    <>
      <PageHeader eyebrow="포털" title={title} />
      <Section>
        <p className="text-foreground/70">이 메뉴는 {audience} 회원에게 보입니다.</p>
        <ButtonLink href={routes.portal.home} variant="secondary">
          포털 홈으로
        </ButtonLink>
      </Section>
    </>
  );
}
