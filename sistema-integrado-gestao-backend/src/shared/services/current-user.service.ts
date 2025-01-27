// src/shared/services/current-user.service.ts
import { Injectable, Scope } from '@nestjs/common';
import { KeycloakUser } from '../interfaces/keycloak-user.interface';

@Injectable({ scope: Scope.REQUEST })
export class CurrentUserService {
  private user: KeycloakUser;

  setCurrentUser(user: KeycloakUser) {
    this.user = user;
  }

  getCurrentUser(): KeycloakUser {
    return this.user;
  }

  getCurrentUserId(): string {
    return this.user?.sub || 'system';
  }

  getCurrentUsername(): string {
    return this.user?.preferred_username || 'system';
  }

  hasRole(role: string): boolean {
    return this.user?.roles?.includes(role) || false;
  }
}
