// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { KeycloakAdminService } from './services/keycloak-admin.service';

@Module({
  imports: [
    KeycloakConnectModule.register({
      authServerUrl: process.env.KEYCLOAK_AUTH_SERVER_URL,
      realm: process.env.KEYCLOAK_REALM,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      secret: process.env.KEYCLOAK_SECRET,
    }),
    ConfigModule,
  ],
  providers: [AuthService, KeycloakAdminService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
