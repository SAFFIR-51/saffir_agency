import {
  BadRequestException, Body, Controller, Get, Param,
  ParseIntPipe, Patch, Request, UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id/role')
  @UseGuards(JwtAuthGuard, AdminGuard)
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body('role') role: string,
    @Request() req: any,
  ) {
    if (req.user.sub === id) throw new BadRequestException('Cannot change your own role');
    if (!['admin', 'client'].includes(role)) throw new BadRequestException('Invalid role');
    return this.service.updateRole(id, role);
  }
}
