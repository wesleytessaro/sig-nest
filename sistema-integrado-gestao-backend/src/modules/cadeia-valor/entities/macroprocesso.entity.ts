// src/modules/cadeia-valor/entities/macroprocesso.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../../shared/base/entities/base.entity';
import { MacroprocessoTipo } from './macroprocesso-tipo.entity';

@Entity('sig_tb_cavm_cadeia_valor_macroprocesso')
@Index('ix_cavm_id_tp_macroprocesso', ['tipo'])
export class Macroprocesso extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_macroprocesso' })
  id: number;
  @Column({ name: 'nm_macroprocesso' })
  nome: string;

  @ManyToOne(() => MacroprocessoTipo, { lazy: true })
  @JoinColumn({
    name: 'id_tp_macroprocesso',
    foreignKeyConstraintName: 'fk_cavm_cvmt_id_tp_macroprocesso',
  })
  tipo: Promise<MacroprocessoTipo>;

  @Column({
    name: 'ds_macroprocesso',
    length: 3000,
    nullable: true,
  })
  descricao?: string;
}
