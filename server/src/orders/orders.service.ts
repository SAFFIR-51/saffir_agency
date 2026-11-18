import {
  BadRequestException, Inject, Injectable, Logger, NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { desc, eq, gte } from 'drizzle-orm';
import { DRIZZLE, DrizzleDb } from '../db/db.module';
import { productOrders } from '../db/schema';
import { MailService } from '../mail/mail.service';
import { TossConfirmDto } from '../payments/dto/toss-confirm.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { PRODUCTS, calcAmount, findProduct } from './catalog';

/** 토스 테스트 키 — .env 미설정 시 폴백. 운영 키는 반드시 .env 로 주입한다. */
const TEST_CLIENT_KEY = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
const TEST_SECRET_KEY = 'test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDb,
    private readonly config: ConfigService,
    private readonly mail: MailService,
  ) {}

  /** 공개 카탈로그 — 프론트 표시용. 결제 금액은 여기 값을 믿지 않고 서버가 다시 계산한다. */
  products() {
    return PRODUCTS.map((p) => {
      const { supply, vat, total } = calcAmount(p, 1);
      return { ...p, supplyAmount: supply, vatAmount: vat, amount: total };
    });
  }

  product(id: string) {
    const p = findProduct(id);
    if (!p) throw new NotFoundException('Product not found');
    const { supply, vat, total } = calcAmount(p, 1);
    return { ...p, supplyAmount: supply, vatAmount: vat, amount: total };
  }

  async create(dto: CreateOrderDto) {
    const product = findProduct(dto.productId);
    if (!product) throw new NotFoundException('Product not found');

    const quantity = dto.quantity ?? 1;
    if (!product.quantifiable && quantity !== 1) {
      throw new BadRequestException('This product does not support quantity');
    }
    if (quantity < 1 || quantity > product.maxQuantity) {
      throw new BadRequestException(`Quantity must be between 1 and ${product.maxQuantity}`);
    }

    // 금액은 전적으로 서버 카탈로그 기준. 클라이언트는 금액을 보내지도 않는다.
    const { supply, vat, total } = calcAmount(product, quantity);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayOrders = await this.db
      .select({ id: productOrders.id })
      .from(productOrders)
      .where(gte(productOrders.createdAt, todayStart));
    const dateStr = todayStart.toISOString().slice(0, 10).replace(/-/g, '');
    const orderNo = `SF-${dateStr}-${String(todayOrders.length + 1).padStart(3, '0')}`;

    const [row] = await this.db
      .insert(productOrders)
      .values({
        token: crypto.randomUUID(),
        orderNo,
        productId: product.id,
        productName: product.name,
        quantity,
        unitPrice: product.price,
        supplyAmount: supply,
        vatAmount: vat,
        amount: total,
        customerName: dto.customerName,
        customerEmail: dto.customerEmail,
        customerPhone: dto.customerPhone,
        company: dto.company,
        memo: dto.memo,
      })
      .returning();
    return row;
  }

  findAll() {
    return this.db.select().from(productOrders).orderBy(desc(productOrders.createdAt));
  }

  async findByToken(token: string) {
    const [row] = await this.db
      .select()
      .from(productOrders)
      .where(eq(productOrders.token, token));
    if (!row) throw new NotFoundException('Order not found');
    return row;
  }

  /** 결제창 호출에 필요한 값 — orderId 를 서버가 발급해 저장해 둔다(승인 때 대조용) */
  async createTossOrder(token: string) {
    const order = await this.findByToken(token);
    if (order.status === 'paid') throw new BadRequestException('Already paid');

    const tossOrderId = `order_${order.id}_${Date.now()}`;
    await this.db
      .update(productOrders)
      .set({ tossOrderId, status: 'pending' })
      .where(eq(productOrders.token, token));

    return {
      orderId: tossOrderId,
      clientKey: this.config.get<string>('TOSS_CLIENT_KEY') ?? TEST_CLIENT_KEY,
      amount: order.amount,
      orderName: order.quantity > 1
        ? `${order.productName} ${order.quantity}개월`
        : order.productName,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
    };
  }

  /**
   * 토스 결제 승인. 위변조 방지를 위해 세 가지를 대조한 뒤에만 승인 API 를 호출한다.
   *   1) 이미 결제된 주문인가  2) orderId 가 우리가 발급한 것인가  3) 금액이 DB 값과 같은가
   */
  async confirmToss(token: string, dto: TossConfirmDto) {
    const order = await this.findByToken(token);
    if (order.status === 'paid') throw new BadRequestException('Already paid');
    if (order.tossOrderId !== dto.orderId) throw new BadRequestException('Order ID mismatch');
    if (order.amount !== dto.amount) throw new BadRequestException('Amount mismatch');

    const secretKey = this.config.get<string>('TOSS_SECRET_KEY') ?? TEST_SECRET_KEY;
    const encoded = Buffer.from(`${secretKey}:`).toString('base64');
    const res = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: { Authorization: `Basic ${encoded}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentKey: dto.paymentKey, orderId: dto.orderId, amount: dto.amount }),
    });

    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as { message?: string };
      await this.db
        .update(productOrders)
        .set({ status: 'failed' })
        .where(eq(productOrders.token, token));
      throw new BadRequestException(err?.message ?? 'Toss payment confirmation failed');
    }

    const payment = (await res.json()) as { receipt?: { url?: string } };
    const [updated] = await this.db
      .update(productOrders)
      .set({
        status: 'paid',
        paidAt: new Date(),
        tossPaymentKey: dto.paymentKey,
        receiptUrl: payment?.receipt?.url ?? null,
      })
      .where(eq(productOrders.token, token))
      .returning();

    // 알림 실패가 결제 성공을 막지 않도록 fire-and-forget
    const product = findProduct(updated.productId);
    this.mail
      .sendOrderNotification({
        orderNo: updated.orderNo,
        productName: updated.productName,
        quantity: updated.quantity,
        unit: product?.unit ?? '건',
        amount: updated.amount,
        customerName: updated.customerName,
        customerEmail: updated.customerEmail,
        customerPhone: updated.customerPhone,
        company: updated.company,
        memo: updated.memo,
        receiptUrl: updated.receiptUrl,
      })
      .catch((e: Error) => this.logger.error(`결제 알림 메일 실패: ${e?.message ?? e}`));

    return updated;
  }

  /** 결제창에서 취소·실패로 돌아온 경우 기록 */
  async markFailed(token: string) {
    const order = await this.findByToken(token);
    if (order.status === 'paid') return order;
    const [updated] = await this.db
      .update(productOrders)
      .set({ status: 'failed' })
      .where(eq(productOrders.token, token))
      .returning();
    return updated;
  }
}
