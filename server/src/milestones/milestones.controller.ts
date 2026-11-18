import {
  Body, Controller, Delete, HttpCode,
  Param, ParseIntPipe, Patch, Post, UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CreateMilestoneDto } from './dto/create-milestone.dto';
import { CreateWorkDto } from './dto/create-work.dto';
import { UpdateMilestoneDto } from './dto/update-milestone.dto';
import { MilestonesService } from './milestones.service';

@Controller('milestones')
export class MilestonesController {
  constructor(private readonly service: MilestonesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() dto: CreateMilestoneDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateMilestoneDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Post(':id/works')
  @UseGuards(JwtAuthGuard, AdminGuard)
  addWork(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateWorkDto,
  ) {
    return this.service.addWork(id, dto);
  }

  @Patch('works/:workId/toggle')
  @UseGuards(JwtAuthGuard, AdminGuard)
  toggleWork(@Param('workId', ParseIntPipe) workId: number) {
    return this.service.toggleWork(workId);
  }

  @Delete('works/:workId')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, AdminGuard)
  removeWork(@Param('workId', ParseIntPipe) workId: number) {
    return this.service.removeWork(workId);
  }
}
