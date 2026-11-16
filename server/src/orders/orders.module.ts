import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from '../mail/mail.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [ConfigModule, MailModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
