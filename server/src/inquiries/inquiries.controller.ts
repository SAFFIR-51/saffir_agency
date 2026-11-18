import { BadRequestException, Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StaffGuard } from '../auth/guards/staff.guard';
import { CreateInquiryDto, INQUIRY_KINDS, INQUIRY_STATUSES, UpdateInquiryDto } from './dto/create-inquiry.dto';
import { InquiriesService } from './inquiries.service';

@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly service: InquiriesService) {}

  /** 공개 폼 (로그인 없음). 반복 제출을 막는다 */
  @Post()
  @Throttle({ default: { ttl: 600_000, limit: 5 } })
  create(@Body() dto: CreateInquiryDto) {
    return this.service.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, StaffGuard)
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
    @Query('status') status?: string,
    @Query('kind') kind?: string,
  ) {
    if (status && !(INQUIRY_STATUSES as readonly string[]).includes(status)) throw new BadRequestException('status');
    if (kind && !(INQUIRY_KINDS as readonly string[]).includes(kind)) throw new BadRequestException('kind');
    return this.service.findAll(page, Math.min(limit, 100), { status, kind });
  }

  /** 상태별 건수 (어드민 메뉴 숫자) */
  @Get('counts')
  @UseGuards(JwtAuthGuard, StaffGuard)
  counts() {
    return this.service.counts();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, StaffGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, StaffGuard)
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
  ) {
    if (!(INQUIRY_STATUSES as readonly string[]).includes(status)) throw new BadRequestException('status');
    return this.service.update(id, { status });
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, StaffGuard)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateInquiryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, StaffGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
