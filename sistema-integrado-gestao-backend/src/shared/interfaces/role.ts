import { Permission } from './permission.interface';

export interface Role {
  name: string;
  description: string;
  permissions: Permission[];
}
