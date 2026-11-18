import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE, DrizzleDb } from '../db/db.module';
import { invoiceItems, invoices } from '../db/schema';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}

  async create(dto: CreateInvoiceDto) {
    const { items, ...invoiceData } = dto;
    const [invoice] = await this.db
      .insert(invoices)
      .values(invoiceData)
      .returning();

    const insertedItems = await this.db
      .insert(invoiceItems)
      .values(
        items.map((item) => ({
          invoiceId: invoice.id,
          name: item.name,
          quantity: item.quantity,
          unitPrice: String(item.unitPrice),
        })),
      )
      .returning();

    return { ...invoice, items: insertedItems };
  }

  async findOne(id: number) {
    const [invoice] = await this.db
      .select()
      .from(invoices)
      .where(eq(invoices.id, id));
    if (!invoice) throw new NotFoundException(`Invoice #${id} not found`);

    const items = await this.db
      .select()
      .from(invoiceItems)
      .where(eq(invoiceItems.invoiceId, id));

    return { ...invoice, items };
  }

  async remove(id: number) {
    await this.db.delete(invoiceItems).where(eq(invoiceItems.invoiceId, id));
    const [row] = await this.db
      .delete(invoices)
      .where(eq(invoices.id, id))
      .returning();
    if (!row) throw new NotFoundException(`Invoice #${id} not found`);
    return row;
  }
}
