import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MacroprocessoTipo } from '../entities/macroprocesso-tipo.entity';
import { BaseRepository } from 'src/shared/base/repositories/base.repository';
import { PaginatedResult } from 'src/shared/interfaces/paginated-result.interface';
import { RequestContext } from 'src/shared/contexts/request-context';

@Injectable()
export class MacroprocessoTipoRepository extends BaseRepository<MacroprocessoTipo> {
  constructor(
    protected readonly requestContext: RequestContext,
    private readonly dataSource: DataSource,
  ) {
    super(requestContext, MacroprocessoTipo, dataSource);
  }

  async findAllWithFilters(
    pagina: number,
    tamanho: number,
    filtertipo?: string,
    filterdescricao?: string,
    dir: 'ASC' | 'DESC' = 'ASC',
  ): Promise<PaginatedResult<MacroprocessoTipo>> {
    const queryBuilder = this.createQueryBuilder('macroprocessoTipo');

    queryBuilder.where('macroprocessoTipo.dt_exclusao IS NULL');

    if (filtertipo) {
      queryBuilder.andWhere('LOWER(macroprocessoTipo.tipo) LIKE LOWER(:tipo)', {
        tipo: `%${filtertipo}%`,
      });
    }

    if (filterdescricao) {
      queryBuilder.andWhere(
        'LOWER(macroprocessoTipo.descricao) LIKE LOWER(:descricao)',
        {
          descricao: `%${filterdescricao}%`,
        },
      );
    }

    return this.paginate(queryBuilder, pagina, tamanho, {
      campo: 'macroprocessoTipo.tipo',
      direcao: dir,
    });
  }

  async buscarSugestoesTipo(
    pagina: number,
    tamanho: number,
    tipo: string,
  ): Promise<PaginatedResult<MacroprocessoTipo>> {
    const queryBuilder = this.createQueryBuilder('macroprocessoTipo')
      .where('macroprocessoTipo.dt_exclusao IS NULL')
      .andWhere('LOWER(macroprocessoTipo.tipo) LIKE LOWER(:tipo)', {
        tipo: `%${tipo}%`,
      });

    return this.paginate(queryBuilder, pagina, tamanho);
  }
}
