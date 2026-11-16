import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

export interface InquiryNotification {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  kind?: string;
  projectType: string | null;
  budget: string | null;
  targetDate: string | null;
  description: string | null;
  meetingPreference: string | null;
  attachmentUrl: string | null;
}

export interface OrderNotification {
  orderNo: string;
  productName: string;
  quantity: number;
  unit: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  company: string | null;
  memo: string | null;
  receiptUrl: string | null;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private readonly transporter: Transporter | null = null;
  private readonly from: string;
  private readonly notifyEmail: string;

  constructor(config: ConfigService) {
    const user = config.get<string>('SMTP_USER');
    const pass = config.get<string>('SMTP_PASS');
    this.from = user ?? '';
    this.notifyEmail = config.get<string>('NOTIFY_EMAIL') || 'saffir.kr@gmail.com';

    if (user && pass) {
      const port = Number(config.get<string>('SMTP_PORT') ?? 465);
      this.transporter = nodemailer.createTransport({
        host: config.get<string>('SMTP_HOST') ?? 'smtp.gmail.com',
        port,
        secure: port === 465,
        auth: { user, pass },
      });
    } else {
      this.logger.warn('SMTP_USER/SMTP_PASS 미설정 — 이메일 알림 비활성화');
    }
  }

  async sendInquiryNotification(inquiry: InquiryNotification) {
    if (!this.transporter) return;

    const line = (label: string, value: string | null | undefined) =>
      value ? `<tr><td style="padding:6px 12px;color:#888;white-space:nowrap;">${label}</td><td style="padding:6px 12px;">${escapeHtml(value)}</td></tr>` : '';

    const html = `
      <div style="font-family:sans-serif;max-width:560px;">
        <h2 style="color:#FF5A36;">새 문의가 접수되었습니다 (#${inquiry.id})</h2>
        <table style="border-collapse:collapse;width:100%;font-size:14px;">
          ${line('이름', inquiry.name)}
          ${line('이메일', inquiry.email)}
          ${line('연락처', inquiry.phone)}
          ${line('회사', inquiry.company)}
          ${line('프로젝트 유형', inquiry.projectType)}
          ${line('예산', inquiry.budget)}
          ${line('희망 일정', inquiry.targetDate)}
          ${line('미팅 선호', inquiry.meetingPreference)}
          ${line('첨부파일', inquiry.attachmentUrl)}
        </table>
        ${inquiry.description ? `<p style="font-size:14px;white-space:pre-wrap;border-top:1px solid #eee;padding-top:12px;">${escapeHtml(inquiry.description)}</p>` : ''}
        <p style="font-size:12px;color:#aaa;">saffir.co.kr 문의 폼에서 자동 발송된 알림입니다.</p>
      </div>`;

    await this.transporter.sendMail({
      from: `"SAFFIR 문의 알림" <${this.from}>`,
      to: this.notifyEmail,
      ...(inquiry.email && { replyTo: inquiry.email }),
      subject: `[${inquiry.kind === 'estimate' ? '견적 요청' : '문의 접수'}] ${inquiry.name}${inquiry.company ? ` (${inquiry.company})` : ''} — ${inquiry.projectType ?? '유형 미지정'}`,
      html,
    });
    this.logger.log(`문의 #${inquiry.id} 알림 메일 발송 완료 → ${this.notifyEmail}`);
  }

  /** 비밀번호 재설정 링크 — 링크는 1시간짜리 1회용 토큰이다 */
  async sendPasswordResetMail({ to, name, link }: { to: string; name: string; link: string }) {
    if (!this.transporter) {
      // SMTP 미설정(로컬 개발) 시에는 링크를 로그로 남겨 테스트할 수 있게 한다
      this.logger.warn(`SMTP 미설정 — 비밀번호 재설정 링크: ${link}`);
      return;
    }

    const html = `
      <div style="font-family:sans-serif;max-width:520px;">
        <h2 style="color:#0cb95c;">비밀번호 재설정</h2>
        <p style="font-size:14px;">${escapeHtml(name)}님, 아래 버튼을 눌러 새 비밀번호를 설정해 주세요.</p>
        <p style="margin:28px 0;">
          <a href="${link}" style="display:inline-block;background:#0cb95c;color:#fff;text-decoration:none;padding:13px 26px;border-radius:8px;font-weight:bold;font-size:14px;">비밀번호 재설정하기</a>
        </p>
        <p style="font-size:13px;color:#666;">버튼이 눌리지 않으면 아래 주소를 복사해 브라우저에 붙여넣어 주세요.<br><span style="color:#888;word-break:break-all;">${link}</span></p>
        <p style="font-size:13px;color:#666;border-top:1px solid #eee;padding-top:12px;">이 링크는 <b>1시간</b> 뒤 만료되며 한 번만 사용할 수 있습니다. 본인이 요청하지 않았다면 이 메일을 무시하셔도 됩니다.</p>
        <p style="font-size:12px;color:#aaa;">saffir.co.kr 에서 자동 발송된 메일입니다.</p>
      </div>`;

    await this.transporter.sendMail({
      from: `"SAFFIR" <${this.from}>`,
      to,
      subject: '[SAFFIR] 비밀번호 재설정 안내',
      html,
    });
    this.logger.log(`비밀번호 재설정 메일 발송 완료 → ${to}`);
  }

  /** 고객 포털 초대 — 링크는 7일짜리 1회용 토큰이다 */
  async sendInviteMail({ to, inviter, client, link }: { to: string; inviter: string; client: string; link: string }) {
    if (!this.transporter) {
      this.logger.warn(`SMTP 미설정 — 포털 초대 링크(${to}): ${link}`);
      return;
    }
    const html = `
      <div style="font-family:sans-serif;max-width:520px;">
        <h2 style="color:#111;">사피어 고객 포털 초대</h2>
        <p style="font-size:14px;">${escapeHtml(inviter)}님이 <b>${escapeHtml(client)}</b> 포털에 초대했습니다. 프로젝트 진행 현황, 주간 보고, 청구를 이곳에서 함께 확인할 수 있습니다.</p>
        <p style="margin:28px 0;">
          <a href="${link}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:13px 26px;border-radius:8px;font-weight:bold;font-size:14px;">초대 수락하기</a>
        </p>
        <p style="font-size:13px;color:#666;">버튼이 눌리지 않으면 아래 주소를 복사해 브라우저에 붙여넣어 주세요.<br><span style="color:#888;word-break:break-all;">${link}</span></p>
        <p style="font-size:13px;color:#666;border-top:1px solid #eee;padding-top:12px;">이 링크는 <b>7일</b> 뒤 만료되며 이 이메일 주소로만 쓸 수 있습니다. 모르는 초대라면 이 메일을 무시하셔도 됩니다.</p>
        <p style="font-size:12px;color:#aaa;">saffir.co.kr 에서 자동 발송된 메일입니다.</p>
      </div>`;
    await this.transporter.sendMail({
      from: `"SAFFIR" <${this.from}>`,
      to,
      subject: `[SAFFIR] ${client} 포털에 초대되었습니다`,
      html,
    });
    this.logger.log(`포털 초대 메일 발송 완료 → ${to}`);
  }

  /** 상품 결제 완료 알림 — 토스 승인이 끝난 뒤 호출 (fire-and-forget) */
  async sendOrderNotification(order: OrderNotification) {
    if (!this.transporter) return;

    const line = (label: string, value: string | null | undefined) =>
      value ? `<tr><td style="padding:6px 12px;color:#888;white-space:nowrap;">${label}</td><td style="padding:6px 12px;">${escapeHtml(value)}</td></tr>` : '';

    const html = `
      <div style="font-family:sans-serif;max-width:560px;">
        <h2 style="color:#0cb95c;">결제가 완료되었습니다 (${escapeHtml(order.orderNo)})</h2>
        <table style="border-collapse:collapse;width:100%;font-size:14px;">
          ${line('상품', `${order.productName} × ${order.quantity}${order.unit}`)}
          ${line('결제 금액', `${order.amount.toLocaleString('ko-KR')}원 (VAT 포함)`)}
          ${line('주문자', order.customerName)}
          ${line('이메일', order.customerEmail)}
          ${line('연락처', order.customerPhone)}
          ${line('회사·병원명', order.company)}
          ${line('영수증', order.receiptUrl)}
        </table>
        ${order.memo ? `<p style="font-size:14px;white-space:pre-wrap;border-top:1px solid #eee;padding-top:12px;">${escapeHtml(order.memo)}</p>` : ''}
        <p style="font-size:12px;color:#aaa;">saffir.co.kr 상품 결제에서 자동 발송된 알림입니다. 어드민 &gt; 주문 탭에서 확인하세요.</p>
      </div>`;

    await this.transporter.sendMail({
      from: `"SAFFIR 결제 알림" <${this.from}>`,
      to: this.notifyEmail,
      replyTo: order.customerEmail,
      subject: `[결제 완료] ${order.customerName} — ${order.productName} ${order.amount.toLocaleString('ko-KR')}원`,
      html,
    });
    this.logger.log(`주문 ${order.orderNo} 결제 알림 메일 발송 완료 → ${this.notifyEmail}`);
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
