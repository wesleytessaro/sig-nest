import {
  Module,
  MiddlewareConsumer,
  RequestMethod,
  NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import {
  KeycloakConnectModule,
  AuthGuard,
  ResourceGuard,
  KeycloakConnectOptions,
} from 'nest-keycloak-connect';
import databaseConfig from './common/config/database.config';
import keycloakConfig from './common/config/keycloak.config';
import { CurrentUserMiddleware } from './shared/middleware/current-user.middleware';
import { CurrentUserService } from './shared/services/current-user.service';
import { AuditSubscriber } from './shared/subscribers/audit.subscriber';
import { I18nModule } from './i18n/i18n.module';
import { I18nMiddleware } from './i18n/i18n.middleware';
import { CadeiaValorModule } from './modules/cadeia-valor/cadeia-valor.module';
import { CommonModule } from './common/common.module';
import { ContextMiddleware } from './shared/middleware/context.middleware';
import { AuthModule } from '@modules/auth/auth.module';
import { AuditModule } from '@shared/audit/audit.module';

@Module({
  imports: [
    // Config Module
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, keycloakConfig],
    }),

    // TypeORM Module
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
        autoLoadEntities: true,
        subscribers: [AuditSubscriber],
      }),
      inject: [ConfigService],
    }),

    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const keycloakConfig = configService.get('keycloak');
        return keycloakConfig as KeycloakConnectOptions;
      },
      inject: [ConfigService],
    }),

    AuditModule,
    CommonModule,
    AuthModule,
    CadeiaValorModule,
    I18nModule,
  ],
  providers: [
    CurrentUserService,
    // Global Guards
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(CurrentUserMiddleware, I18nMiddleware, ContextMiddleware)
      .exclude('api-docs', 'swagger') // Exclui rotas do Swagger
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
