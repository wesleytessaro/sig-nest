import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@shared/base';

@Entity('sig_tb_cvmt_cadeia_valor_macroprocesso_tipo')
export class MacroprocessoTipo extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id_tp_macroprocesso' })
  id: number;

  @Column({
    name: 'nm_tp_macroprocesso',
    nullable: false,
    type: 'varchar',
    length: 255,
    comment: 'Nome do tipo do macroprocesso',
  })
  tipo: string;

  @Column({
    name: 'ds_tp_macroprocesso',
    type: 'varchar',
    length: 3000,
    nullable: true,
    comment: 'Descrição do tipo do macroprocesso',
  })
  descricao: string;
}
