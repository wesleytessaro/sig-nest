import {
  DataSource,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  Repository,
  SaveOptions,
  SelectQueryBuilder,
} from 'typeorm';
import { PaginatedResult } from '../../interfaces/paginated-result.interface';
import { RequestContext } from '../../contexts';

export abstract class BaseRepository<T> extends Repository<T> {
  constructor(
    protected readonly requestContext: RequestContext,
    entity: any,
    dataSource: DataSource,
  ) {
    super(entity, dataSource.createEntityManager());
  }

  protected addOrgaoFilter(queryBuilder: SelectQueryBuilder<T>): void {
    const orgaoId = this.requestContext.getOrgaoId();
    if (orgaoId) {
      queryBuilder.andWhere(`${queryBuilder.alias}.orgaoId = :orgaoId`, {
        orgaoId,
      });
    }
  }

  protected async paginate(
    queryBuilder: SelectQueryBuilder<T>,
    pagina: number,
    tamanho: number,
    orderBy?: { campo: string; direcao: 'ASC' | 'DESC' },
  ): Promise<PaginatedResult<T>> {
    this.addOrgaoFilter(queryBuilder);

    if (orderBy) {
      queryBuilder.orderBy(orderBy.campo, orderBy.direcao);
    }

    queryBuilder.skip(pagina * tamanho).take(tamanho);

    const [items, total] = await queryBuilder.getManyAndCount();

    return {
      items,
      meta: {
        total,
        pagina,
        tamanho,
        totalPaginas: Math.ceil(total / tamanho),
      },
    };
  }

  // Sobrescreve métodos padrão para sempre aplicar filtro de órgão
  override async find(options?: FindManyOptions<T>): Promise<T[]> {
    const queryBuilder = this.createQueryBuilder('entity');
    this.addOrgaoFilter(queryBuilder);
    return queryBuilder.getMany();
  }

  override async findOne(options: FindOneOptions<T>): Promise<T> {
    const queryBuilder = this.createQueryBuilder('entity');
    this.addOrgaoFilter(queryBuilder);
    if (options.where) {
      Object.entries(options.where).forEach(([key, value]) => {
        queryBuilder.andWhere(`entity.${key} = :${key}`, { [key]: value });
      });
    }

    return queryBuilder.getOne();
  }

  override save<E extends DeepPartial<T>>(
    entities: E[],
    options?: SaveOptions,
  ): Promise<T[]>;
  override save<E extends DeepPartial<T>>(
    entity: E,
    options?: SaveOptions,
  ): Promise<T>;
  override save<E extends DeepPartial<T>>(
    entityOrEntities: E | E[],
    options?: SaveOptions,
  ): Promise<T | T[]> {
    const orgaoId = this.requestContext.getOrgaoId();

    if (Array.isArray(entityOrEntities)) {
      entityOrEntities.forEach((entity) => {
        if (orgaoId) {
          entity['orgaoId'] = orgaoId;
        }
      });
    } else if (orgaoId) {
      entityOrEntities['orgaoId'] = orgaoId;
    }

    return super.save(entityOrEntities as any, options);
  }
}
