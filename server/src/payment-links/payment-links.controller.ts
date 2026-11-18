import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';
import { CreatePaymentLinkDto } from './dto/create-payment-link.dto';
import { TossConfirmDto } from '../payments/dto/toss-confirm.dto';
import { PaymentLinksService } from './payment-links.service';

@Controller('payment-links')
export class PaymentLinksController {
  constructor(private readonly service: PaymentLinksService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminGuard)
  create(@Body() dto: CreatePaymentLinkDto) {
    return this.service.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  findAll() {
    return this.service.findAll();
  }

  @Get(':token')
  findOne(@Param('token') token: string) {
    return this.service.findByToken(token);
  }

  @Post(':token/toss/order')
  tossOrder(@Param('token') token: string) {
    return this.service.createTossOrder(token);
  }

  @Post(':token/toss/confirm')
  tossConfirm(@Param('token') token: string, @Body() dto: TossConfirmDto) {
    return this.service.confirmToss(token, dto);
  }
}
