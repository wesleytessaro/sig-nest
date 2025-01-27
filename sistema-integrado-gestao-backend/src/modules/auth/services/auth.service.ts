// src/modules/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { Role, Permission } from '@shared/interfaces';
import { KeycloakAdminService } from './keycloak-admin.service';

@Injectable()
export class AuthService {
  constructor(private readonly keycloakAdmin: KeycloakAdminService) {}

  async createRole(role: Role): Promise<void> {
    await this.keycloakAdmin.createRole(role);
  }

  async addPermissionsToRole(
    roleName: string,
    permissions: Permission[],
  ): Promise<void> {
    await this.keycloakAdmin.addPermissionsToRole(roleName, permissions);
  }

  async getRolePermissions(roleName: string): Promise<Permission[]> {
    return this.keycloakAdmin.getRolePermissions(roleName);
  }

  async listRoles(): Promise<Role[]> {
    return this.keycloakAdmin.listRoles();
  }
}
