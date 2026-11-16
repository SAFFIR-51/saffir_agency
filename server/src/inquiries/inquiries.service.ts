import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { count, desc, eq } from 'drizzle-orm';
import { DRIZZLE, DrizzleDb } from '../db/db.module';
import { inquiries } from '../db/schema';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class InquiriesService {
  private readonly logger = new Logger(InquiriesService.name);

  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDb,
    private readonly mail: MailService,
  ) {}

  async create(dto: CreateInquiryDto) {
    const [row] = await this.db.insert(inquiries).values(dto).returning();
    // 알림 메일 실패가 문의 접수 자체를 막으면 안 되므로 결과를 기다리지 않는다
    this.mail.sendInquiryNotification(row).catch((err) => {
      this.logger.error(`문의 #${row.id} 알림 메일 발송 실패`, err instanceof Error ? err.stack : String(err));
    });
    return row;
  }

  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const [[{ total }], data] = await Promise.all([
      this.db.select({ total: count() }).from(inquiries),
      this.db.select().from(inquiries).orderBy(desc(inquiries.receivedAt)).limit(limit).offset(offset),
    ]);
    return { data, total: Number(total), page, limit };
  }

  async findOne(id: number) {
    const [row] = await this.db
      .select()
      .from(inquiries)
      .where(eq(inquiries.id, id));
    if (!row) throw new NotFoundException(`Inquiry #${id} not found`);
    return row;
  }

  async updateStatus(id: number, status: string) {
    const [row] = await this.db
      .update(inquiries)
      .set({ status })
      .where(eq(inquiries.id, id))
      .returning();
    if (!row) throw new NotFoundException(`Inquiry #${id} not found`);
    return row;
  }

  async remove(id: number) {
    const [row] = await this.db
      .delete(inquiries)
      .where(eq(inquiries.id, id))
      .returning();
    if (!row) throw new NotFoundException(`Inquiry #${id} not found`);
    return row;
  }
}
