import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';
export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'dt_criacao' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'dt_ultima_modificacao' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'dt_exclusao', nullable: true })
  deletedAt?: Date;

  @Column({ name: 'nm_criado_por', nullable: true })
  createdBy?: string;

  @Column({ name: 'nm_ultimo_modificador', nullable: true })
  updatedBy?: string;

  @Column({ name: 'nm_exclusao', nullable: true })
  deletedBy?: string;

  @Column({ name: 'id_orgao', nullable: true })
  orgaoId: number;
}
