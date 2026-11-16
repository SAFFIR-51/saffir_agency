import {
  Body, Controller, Delete, Get, HttpCode,
  Param, ParseIntPipe, Patch, Post, UseGuards,
} from '@nestjs/common';
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
  tossOrder(@Param('id', ParseIntPipe) id: number) {
    return this.service.createTossOrder(id);
  }

  @Post(':id/toss/confirm')
  @UseGuards(JwtAuthGuard)
  tossConfirm(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: TossConfirmDto,
  ) {
    return this.service.confirmToss(id, dto);
  }
}
