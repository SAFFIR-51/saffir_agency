import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE, DrizzleDb } from '../db/db.module';
import { milestones, works } from '../db/schema';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateMilestoneDto } from './dto/update-milestone.dto';

@Injectable()
export class MilestonesService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}

  async create(dto: CreateMilestoneDto) {
    const [row] = await this.db.insert(milestones).values(dto).returning();
    return row;
  }

  async update(id: number, dto: UpdateMilestoneDto) {
    const [row] = await this.db
      .update(milestones)
      .set(dto)
      .where(eq(milestones.id, id))
      .returning();
    if (!row) throw new NotFoundException(`Milestone #${id} not found`);
    return row;
  }

  async remove(id: number) {
    const [row] = await this.db
      .delete(milestones)
      .where(eq(milestones.id, id))
      .returning();
    if (!row) throw new NotFoundException(`Milestone #${id} not found`);
    return row;
  }

  async addWork(milestoneId: number, dto: CreateWorkDto) {
    const [ms] = await this.db
      .select()
      .from(milestones)
      .where(eq(milestones.id, milestoneId));
    if (!ms) throw new NotFoundException(`Milestone #${milestoneId} not found`);
    const [row] = await this.db
      .insert(works)
      .values({ milestoneId, ...dto })
      .returning();
    return row;
  }

  async toggleWork(workId: number) {
    const [current] = await this.db
      .select()
      .from(works)
      .where(eq(works.id, workId));
    if (!current) throw new NotFoundException(`Work #${workId} not found`);
    const [row] = await this.db
      .update(works)
      .set({ done: !current.done })
      .where(eq(works.id, workId))
      .returning();
    return row;
  }

  async removeWork(workId: number) {
    const [row] = await this.db
      .delete(works)
      .where(eq(works.id, workId))
      .returning();
    if (!row) throw new NotFoundException(`Work #${workId} not found`);
    return row;
  }
}
