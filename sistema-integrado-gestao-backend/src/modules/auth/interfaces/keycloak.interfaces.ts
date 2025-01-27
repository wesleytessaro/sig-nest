export interface KeycloakRole {
  id?: string;
  name: string;
  description?: string;
  composite?: boolean;
  clientRole?: boolean;
  attributes?: Record<string, any>;
  containerId?: string;
}

export interface CreateRoleOptions {
  name: string;
  description?: string;
  composite?: boolean;
  clientRole?: boolean;
}

export interface RoleMappingPayload {
  id?: string;
  name?: string;
  composite?: boolean;
  clientRole?: boolean;
  containerId?: string;
}
