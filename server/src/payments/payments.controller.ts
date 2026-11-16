import {
  Body, Controller, Delete, Get, HttpCode,
  Param, ParseIntPipe, Patch, Post, Req, UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { RequestUser } from '../common/project-access';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { TossConfirmDto } from './dto/toss-confirm.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() dto: CreatePaymentDto) {
    return this.service.create(dto);
  }

  @Patch(':id/paid')
  @UseGuards(JwtAuthGuard, AdminGuard)
  markPaid(@Param('id', ParseIntPipe) id: number) {
    return this.service.markPaid(id);
  }

  @Delete(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, AdminGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Post(':id/toss/order')
  @UseGuards(JwtAuthGuard)
  tossOrder(@Req() req: Request, @Param('id', ParseIntPipe) id: number) {
    return this.service.createTossOrder(id, req.user as RequestUser);
  }

  @Post(':id/toss/confirm')
  @UseGuards(JwtAuthGuard)
  tossConfirm(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: TossConfirmDto,
  ) {
    return this.service.confirmToss(id, dto, req.user as RequestUser);
  }
}
