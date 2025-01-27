// src/modules/auth/auth.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Role } from '@shared/interfaces';

@Controller('auth/roles')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async createRole(@Body() role: Role) {
    await this.authService.createRole(role);
    return { message: 'Role created successfully' };
  }

  @Get(':name/permissions')
  async getRolePermissions(@Param('name') roleName: string) {
    return this.authService.getRolePermissions(roleName);
  }
}
