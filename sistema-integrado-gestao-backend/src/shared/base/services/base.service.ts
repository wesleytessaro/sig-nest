// src/common/services/base.service.ts
import { PaginatedResult } from '../../interfaces/paginated-result.interface';
import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from 'class-transformer';

export abstract class BaseService<T, DTO> {
  protected abstract repository: any;

  protected formatPaginatedResponse(
    result: PaginatedResult<T>,
    DTOClass: ClassConstructor<DTO>,
  ): PaginatedResult<DTO> {
    return {
      items: result.items.map((item) => plainToInstance(DTOClass, item)),
      meta: result.meta,
    };
  }
}
