import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE, DrizzleDb } from '../db/db.module';
import { users } from '../db/schema';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDb) {}

  async findAll() {
    return this.db.select().from(users);
  }

  async findOne(id: number) {
    const [row] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id));
    if (!row) throw new NotFoundException(`User #${id} not found`);
    return row;
  }

  async updateRole(id: number, role: string) {
    const [row] = await this.db
      .update(users)
      .set({ role })
      .where(eq(users.id, id))
      .returning();
    if (!row) throw new NotFoundException(`User #${id} not found`);
    return row;
  }
}
