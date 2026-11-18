import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StaffGuard } from '../auth/guards/staff.guard';
import { GeoAdCheckDto, GeoDiagnosisDto, GeoSiteDto, GeoSiteUpdateDto } from './geo.dto';
import { GeoService } from './geo.service';

const Id = (name = 'id') => Param(name, ParseIntPipe);

/** GEO 진단 기록 (/api/geo). 고객은 /me만, 나머지는 내부 계정 */
@Controller('geo')
@UseGuards(JwtAuthGuard)
export class GeoController {
  constructor(private readonly geo: GeoService) {}

  @Get('me')
  mine(@Req() req: Request) {
    return this.geo.mine((req.user as { sub: number }).sub);
  }
}

@Controller('geo')
@UseGuards(JwtAuthGuard, StaffGuard)
export class GeoAdminController {
  constructor(private readonly geo: GeoService) {}

  @Get('sites') list() { return this.geo.list(); }
  @Get('sites/:id') get(@Id() id: number) { return this.geo.get(id); }
  @Post('sites') upsert(@Body() dto: GeoSiteDto) { return this.geo.upsertSite(dto); }
  @Patch('sites/:id') update(@Id() id: number, @Body() dto: GeoSiteUpdateDto) { return this.geo.updateSite(id, dto); }
  @Delete('sites/:id') remove(@Id() id: number) { return this.geo.removeSite(id); }

  @Post('sites/:id/diagnoses') addDiagnosis(@Id() id: number, @Body() dto: GeoDiagnosisDto) { return this.geo.addDiagnosis(id, dto); }
  @Delete('diagnoses/:id') removeDiagnosis(@Id() id: number) { return this.geo.removeDiagnosis(id); }

  @Post('sites/:id/ad-checks') addAdCheck(@Id() id: number, @Body() dto: GeoAdCheckDto) { return this.geo.addAdCheck(id, dto); }
  @Delete('ad-checks/:id') removeAdCheck(@Id() id: number) { return this.geo.removeAdCheck(id); }
}
