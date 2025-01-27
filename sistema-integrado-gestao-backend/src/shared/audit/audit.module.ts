// src/shared/audit/audit.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditSubscriber } from '@shared/subscribers/audit.subscriber';
import { CurrentUserService } from '../services/current-user.service';

@Module({
  imports: [TypeOrmModule],
  providers: [AuditSubscriber, CurrentUserService],
  exports: [AuditSubscriber],
})
export class AuditModule {}
