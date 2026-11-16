import { unlinkSync } from 'fs';
import { join } from 'path';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE, DrizzleDb } from '../db/db.module';
import { deliverables } from '../db/schema';
import { CreateDeliverableDto } from './dto/create-deliverable.dto';

@Injectable()
export class DeliverablesService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}

  async create(dto: CreateDeliverableDto) {
    const [row] = await this.db.insert(deliverables).values(dto).returning();
    return row;
  }

  async remove(id: number) {
    const [row] = await this.db
      .delete(deliverables)
      .where(eq(deliverables.id, id))
      .returning();
    if (!row) throw new NotFoundException(`Deliverable #${id} not found`);
    if (row.url?.startsWith('/uploads/')) {
      try {
        unlinkSync(join(process.cwd(), 'uploads', row.url.replace('/uploads/', '')));
      } catch {}
    }
    return row;
  }
}
