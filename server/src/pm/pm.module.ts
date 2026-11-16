import { Module } from '@nestjs/common';
import { InvitesController } from './invites.controller';
import { InvitesService } from './invites.service';
import { PmAdminController, PmController } from './pm.controller';
import { PmService } from './pm.service';

@Module({
  // InvitesController를 먼저: /pm/invites가 다른 /pm/:x 경로보다 먼저 잡히게
  controllers: [InvitesController, PmController, PmAdminController],
  providers: [PmService, InvitesService],
  exports: [PmService],
})
export class PmModule {}
