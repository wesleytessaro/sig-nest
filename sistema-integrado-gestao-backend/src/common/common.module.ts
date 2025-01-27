// src/common/common.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigProvider } from './provider/app-config.provider';
import { RequestContext } from '@shared/contexts';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AppConfigProvider, RequestContext],
  exports: [JwtModule, RequestContext, 'APP_CONFIG'],
})
export class CommonModule {}
