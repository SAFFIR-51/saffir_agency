import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { eq } from 'drizzle-orm';
import { DRIZZLE, DrizzleDb } from '../db/db.module';
import { payments } from '../db/schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { TossConfirmDto } from './dto/toss-confirm.dto';
import { RequestUser, assertProjectAccess } from '../common/project-access';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDb,
    private readonly config: ConfigService,
  ) {}

  async create(dto: CreatePaymentDto) {
    const { paidAt, ...rest } = dto;
    const [row] = await this.db
      .insert(payments)
      .values({ ...rest, paidAt: paidAt ? new Date(paidAt) : undefined })
      .returning();
    return row;
  }

  async markPaid(id: number) {
    const [row] = await this.db
      .update(payments)
      .set({ paidAt: new Date() })
      .where(eq(payments.id, id))
      .returning();
    if (!row) throw new NotFoundException(`Payment #${id} not found`);
    return row;
  }

  async remove(id: number) {
    const [row] = await this.db
      .delete(payments)
      .where(eq(payments.id, id))
      .returning();
    if (!row) throw new NotFoundException(`Payment #${id} not found`);
    return row;
  }

  async createTossOrder(id: number, user: RequestUser) {
    const [payment] = await this.db
      .select()
      .from(payments)
      .where(eq(payments.id, id));
    if (!payment) throw new NotFoundException(`Payment #${id} not found`);
    // 자기(또는 소속 고객사) 프로젝트의 청구만 결제할 수 있다
    await assertProjectAccess(this.db, user, payment.projectId);
    if (payment.paidAt) throw new BadRequestException('Already paid');

    const orderId = `saffir_${id}_${Date.now()}`;
    await this.db
      .update(payments)
      .set({ tossOrderId: orderId })
      .where(eq(payments.id, id));

    const clientKey =
      this.config.get('TOSS_CLIENT_KEY') ??
      'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';

    return {
      orderId,
      clientKey,
      amount: payment.amount,
      orderName: payment.title,
    };
  }

  async confirmToss(id: number, dto: TossConfirmDto, user: RequestUser) {
    const [payment] = await this.db
      .select()
      .from(payments)
      .where(eq(payments.id, id));
    if (!payment) throw new NotFoundException(`Payment #${id} not found`);
    await assertProjectAccess(this.db, user, payment.projectId);
    if (payment.paidAt) throw new BadRequestException('Already paid');
    if (payment.tossOrderId !== dto.orderId)
      throw new BadRequestException('Order ID mismatch');
    if (payment.amount !== dto.amount)
      throw new BadRequestException('Amount mismatch');

    const secretKey =
      this.config.get('TOSS_SECRET_KEY') ??
      'test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R';
    const encoded = Buffer.from(`${secretKey}:`).toString('base64');

    const res = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${encoded}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey: dto.paymentKey,
        orderId: dto.orderId,
        amount: dto.amount,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new BadRequestException(
        (err as any)?.message ?? 'Toss payment confirmation failed',
      );
    }

    const [updated] = await this.db
      .update(payments)
      .set({ paidAt: new Date() })
      .where(eq(payments.id, id))
      .returning();

    return updated;
  }
}
