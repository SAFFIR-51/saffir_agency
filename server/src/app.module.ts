import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { ProjectsModule } from './projects/projects.module';
import { MilestonesModule } from './milestones/milestones.module';
import { DeliverablesModule } from './deliverables/deliverables.module';
import { PaymentsModule } from './payments/payments.module';
import { InvoicesModule } from './invoices/invoices.module';
import { UsersModule } from './users/users.module';
import { PaymentLinksModule } from './payment-links/payment-links.module';
import { OrdersModule } from './orders/orders.module';
import { UploadModule } from './upload/upload.module';
import { MailModule } from './mail/mail.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        PORT: Joi.number().default(4000),
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().min(16).required(),
        CALLBACK_BASE_URL: Joi.string().uri().required(),
        FRONTEND_URL: Joi.string().uri().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        KAKAO_CLIENT_ID: Joi.string().required(),
        KAKAO_CLIENT_SECRET: Joi.string().required(),
        NAVER_CLIENT_ID: Joi.string().required(),
        NAVER_CLIENT_SECRET: Joi.string().required(),
        SMTP_HOST: Joi.string().default('smtp.gmail.com'),
        SMTP_PORT: Joi.number().default(465),
        SMTP_USER: Joi.string().allow('').optional(),
        SMTP_PASS: Joi.string().allow('').optional(),
        NOTIFY_EMAIL: Joi.string().email().default('saffir.kr@gmail.com'),
      }),
      validationOptions: { abortEarly: true },
    }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),
    DbModule,
    MailModule,
    AuthModule,
    InquiriesModule,
    ProjectsModule,
    MilestonesModule,
    DeliverablesModule,
    PaymentsModule,
    InvoicesModule,
    UsersModule,
    PaymentLinksModule,
    OrdersModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
