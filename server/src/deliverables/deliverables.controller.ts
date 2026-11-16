import {
  Body, Controller, Delete, HttpCode,
  Param, ParseIntPipe, Post, UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CreateDeliverableDto } from './dto/create-deliverable.dto';
import { DeliverablesService } from './deliverables.service';

@Controller('deliverables')
export class DeliverablesController {
  constructor(private readonly service: DeliverablesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() dto: CreateDeliverableDto) {
    return this.service.create(dto);
  }

  @Delete(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
