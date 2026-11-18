import {
  BadRequestException, Inject, Injectable, NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { desc, eq, gte } from 'drizzle-orm';
import { DRIZZLE, DrizzleDb } from '../db/db.module';
import { paymentLinks } from '../db/schema';
import { CreatePaymentLinkDto } from './dto/create-payment-link.dto';
import { TossConfirmDto } from '../payments/dto/toss-confirm.dto';

@Injectable()
export class PaymentLinksService {
  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDb,
    private readonly config: ConfigService,
  ) {}

  async create(dto: CreatePaymentLinkDto) {
    const token = crypto.randomUUID();
    const subtotal = dto.items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
    const amount = subtotal + Math.floor(subtotal * 0.1);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayLinks = await this.db
      .select({ id: paymentLinks.id })
      .from(paymentLinks)
      .where(gte(paymentLinks.createdAt, todayStart));
    const seq = todayLinks.length + 1;
    const dateStr = todayStart.toISOString().slice(0, 10).replace(/-/g, '');
    const invoiceNumber = `INV-${dateStr}-${String(seq).padStart(3, '0')}`;

    const [row] = await this.db
      .insert(paymentLinks)
      .values({
        token,
        invoiceNumber,
        clientCompany: dto.clientCompany,
        clientContact: dto.clientContact,
        items: dto.items,
        notes: dto.notes,
        amount,
      })
      .returning();
    return row;
  }

  findAll() {
    return this.db.select().from(paymentLinks).orderBy(desc(paymentLinks.createdAt));
  }

  async findByToken(token: string) {
    const [row] = await this.db
      .select()
      .from(paymentLinks)
      .where(eq(paymentLinks.token, token));
    if (!row) throw new NotFoundException('Payment link not found');
    return row;
  }

  async createTossOrder(token: string) {
    const link = await this.findByToken(token);
    if (link.paidAt) throw new BadRequestException('Already paid');
    const orderId = `paylink_${link.id}_${Date.now()}`;
    await this.db
      .update(paymentLinks)
      .set({ tossOrderId: orderId })
      .where(eq(paymentLinks.token, token));
    const clientKey =
      this.config.get('TOSS_CLIENT_KEY') ?? 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
    return { orderId, clientKey, amount: link.amount, orderName: `SAFFIR - ${link.clientCompany}` };
  }

  async confirmToss(token: string, dto: TossConfirmDto) {
    const link = await this.findByToken(token);
    if (link.paidAt) throw new BadRequestException('Already paid');
    if (link.tossOrderId !== dto.orderId) throw new BadRequestException('Order ID mismatch');
    if (link.amount !== dto.amount) throw new BadRequestException('Amount mismatch');
    const secretKey =
      this.config.get('TOSS_SECRET_KEY') ?? 'test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R';
    const encoded = Buffer.from(`${secretKey}:`).toString('base64');
    const res = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: { Authorization: `Basic ${encoded}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentKey: dto.paymentKey, orderId: dto.orderId, amount: dto.amount }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new BadRequestException((err as any)?.message ?? 'Toss payment confirmation failed');
    }
    const [updated] = await this.db
      .update(paymentLinks)
      .set({ paidAt: new Date() })
      .where(eq(paymentLinks.token, token))
      .returning();
    return updated;
  }
}
