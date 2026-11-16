import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE, DrizzleDb } from '../db/db.module';
import { milestones, projects, works, deliverables, payments } from '../db/schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}

  async create(dto: CreateProjectDto) {
    const [row] = await this.db.insert(projects).values(dto).returning();
    return row;
  }

  async findAll(clientId?: number) {
    const allProjects = clientId
      ? await this.db.select().from(projects).where(eq(projects.clientId, clientId))
      : await this.db.select().from(projects);
    if (allProjects.length === 0) return [];
    const allPayments = await this.db.select().from(payments);
    return allProjects.map((p) => {
      const pending = allPayments.filter(
        (pay) => pay.projectId === p.id && pay.paidAt === null,
      );
      return {
        ...p,
        pendingPaymentCount: pending.length,
        pendingPaymentAmount: pending.reduce((s, pay) => s + pay.amount, 0),
      };
    });
  }

  async findOne(id: number) {
    const [project] = await this.db
      .select()
      .from(projects)
      .where(eq(projects.id, id));
    if (!project) throw new NotFoundException(`Project #${id} not found`);

    const ms = await this.db
      .select()
      .from(milestones)
      .where(eq(milestones.projectId, id));

    const msIds = ms.map((m) => m.id);
    const allWorks = msIds.length
      ? await this.db.query.works.findMany({
          where: (w, { inArray }) => inArray(w.milestoneId, msIds),
        })
      : [];

    const dels = await this.db
      .select()
      .from(deliverables)
      .where(eq(deliverables.projectId, id));

    const pays = await this.db
      .select()
      .from(payments)
      .where(eq(payments.projectId, id));

    return {
      ...project,
      milestones: ms.map((m) => ({
        ...m,
        works: allWorks.filter((w) => w.milestoneId === m.id),
      })),
      deliverables: dels,
      payments: pays,
    };
  }

  async update(id: number, dto: UpdateProjectDto) {
    const [row] = await this.db
      .update(projects)
      .set(dto)
      .where(eq(projects.id, id))
      .returning();
    if (!row) throw new NotFoundException(`Project #${id} not found`);
    return row;
  }

  async remove(id: number) {
    const [row] = await this.db
      .delete(projects)
      .where(eq(projects.id, id))
      .returning();
    if (!row) throw new NotFoundException(`Project #${id} not found`);
    return row;
  }
}
