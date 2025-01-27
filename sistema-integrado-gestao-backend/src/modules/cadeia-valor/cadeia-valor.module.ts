// src/modules/cadeia-valor/cadeia-valor.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '@common/common.module';
import { I18nModule } from 'src/i18n/i18n.module';
import { MacroprocessoTipo } from './entities/macroprocesso-tipo.entity';
import { MacroprocessoTipoController } from './controllers/macroprocesso-tipo.controller';
import { MacroprocessoTipoService } from './services/macroprocesso-tipo.service';
import { MacroprocessoTipoRepository } from './repositories/macroprocesso-tipo.repository';

@Module({
  imports: [
    CommonModule,
    I18nModule,
    TypeOrmModule.forFeature([MacroprocessoTipo]),
  ],
  controllers: [MacroprocessoTipoController],
  providers: [MacroprocessoTipoService, MacroprocessoTipoRepository],
  exports: [MacroprocessoTipoService],
})
export class CadeiaValorModule {}
