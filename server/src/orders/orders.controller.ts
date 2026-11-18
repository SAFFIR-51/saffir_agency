import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TossConfirmDto } from '../payments/dto/toss-confirm.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  /** 공개 — 판매 상품 목록 */
  @Get('products')
  products() {
    return this.service.products();
  }

  /** 공개 — 상품 단건 */
  @Get('products/:id')
  product(@Param('id') id: string) {
    return this.service.product(id);
  }

  /** 어드민 — 주문 목록 */
  @Get()
  @UseGuards(JwtAuthGuard, AdminGuard)
  findAll() {
    return this.service.findAll();
  }

  /** 공개 — 주문 접수 (로그인 불필요). 금액은 서버가 카탈로그에서 계산한다. */
  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.service.create(dto);
  }

  /** 공개 — 주문서 조회. token 은 UUID 라 추측 불가. */
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

  @Post(':token/fail')
  markFailed(@Param('token') token: string) {
    return this.service.markFailed(token);
  }
}
