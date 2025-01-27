import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  SoftRemoveEvent,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseEntity } from '../base/entities/base.entity';
import { CurrentUserService } from '../services/current-user.service';

@Injectable()
@EventSubscriber()
export class AuditSubscriber implements EntitySubscriberInterface<BaseEntity> {
  constructor(private readonly currentUserService: CurrentUserService) {}

  afterInsert(event: InsertEvent<BaseEntity>): void {
    if (event.entity) {
      const username = this.currentUserService.getCurrentUsername();
      if (username) {
        event.entity.createdBy = username;
      }
    }
  }

  beforeUpdate(event: UpdateEvent<BaseEntity>): void {
    if (event.entity) {
      const username = this.currentUserService.getCurrentUsername();
      if (username) {
        event.entity.updatedBy = username;
      }
    }
  }

  beforeSoftRemove(event: SoftRemoveEvent<BaseEntity>): void {
    if (event.entity) {
      const username = this.currentUserService.getCurrentUsername();
      if (username) {
        event.entity.deletedBy = username;
      }
    }
  }

  listenTo() {
    return BaseEntity;
  }
}
