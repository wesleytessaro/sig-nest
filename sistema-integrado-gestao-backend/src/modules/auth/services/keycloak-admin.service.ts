// src/modules/auth/services/keycloak-admin.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import KcAdminClient from '@keycloak/keycloak-admin-client';
import type { RoleMappingPayload } from '@keycloak/keycloak-admin-client/lib/defs/roleRepresentation';
import { Role, Permission } from '@shared/interfaces';

interface KeycloakRole {
  id?: string;
  name?: string;
  description?: string;
  composite?: boolean;
  clientRole?: boolean;
}

@Injectable()
export class KeycloakAdminService implements OnModuleInit {
  private kcAdminClient: KcAdminClient;

  constructor(private configService: ConfigService) {
    this.kcAdminClient = new KcAdminClient({
      baseUrl: configService.get('keycloak.authServerUrl'),
      realmName: configService.get('keycloak.realm'),
    });
  }

  async onModuleInit() {
    try {
      await this.kcAdminClient.auth({
        grantType: 'client_credentials',
        clientId: this.configService.get('keycloak.clientId'),
        clientSecret: this.configService.get('keycloak.secret'),
      });
    } catch (error) {
      throw error;
    }
  }

  async createRole(role: Role): Promise<void> {
    const roleRepresentation: KeycloakRole = {
      name: role.name,
      description: role.description,
      composite: false,
      clientRole: true,
    };

    await this.kcAdminClient.roles.create(roleRepresentation);
    await this.addPermissionsToRole(role.name, role.permissions);
  }

  async addPermissionsToRole(
    roleName: string,
    permissions: Permission[],
  ): Promise<void> {
    const role = await this.kcAdminClient.roles.findOneByName({
      name: roleName,
    });
    if (!role) {
      throw new Error(`Role ${roleName} not found`);
    }

    for (const permission of permissions) {
      const scopeName = `${permission.resource}:${permission.action}`;
      const compositeRoles: RoleMappingPayload[] = [
        {
          name: scopeName,
          composite: false,
          clientRole: true,
          id: role.id, // ou gerar um ID único se necessário
        },
      ];

      await this.kcAdminClient.roles.createComposite(
        { roleId: role.id },
        compositeRoles,
      );
    }
  }

  async getRolePermissions(roleName: string): Promise<Permission[]> {
    const role = await this.kcAdminClient.roles.findOneByName({
      name: roleName,
    });
    if (!role) {
      throw new Error(`Role ${roleName} not found`);
    }

    const composites = await this.kcAdminClient.roles.getCompositeRoles({
      id: role.id,
    });

    return composites
      .filter((composite) => composite.name?.includes(':'))
      .map((composite) => {
        const [resource, action] = composite.name!.split(':');
        return { resource, action } as Permission;
      });
  }

  async listRoles(): Promise<Role[]> {
    const roles = await this.kcAdminClient.roles.find();
    return Promise.all(
      roles.map(async (role) => ({
        name: role.name!,
        description: role.description,
        permissions: await this.getRolePermissions(role.name!),
      })),
    );
  }
}
