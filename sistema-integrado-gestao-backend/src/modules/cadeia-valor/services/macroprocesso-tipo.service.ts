import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { MacroprocessoTipo } from '../entities/macroprocesso-tipo.entity';
import { InputMacroprocessoTipoDto } from '../dto/input/input-macroprocesso-tipo.dto';
import { OutputMacroprocessoTipoDto } from '../dto/output/output-macroprocesso-tipo.dto';
import { PaginacaoRequest } from '../../../shared/dto/paginacao.request';
import { StatusResponseDto } from '../../../shared/dto/status-response.dto';
import { I18nService } from '../../../i18n/i18n.service';
import { MacroprocessoTipoRepository } from '../repositories/macroprocesso-tipo.repository';
import { BaseService } from 'src/shared/base/services/base.service';
import { MacroprocessoTipoTransformer } from '../transformers/macroprocesso-tipo.transformer';

@Injectable()
export class MacroprocessoTipoService extends BaseService<
  MacroprocessoTipo,
  OutputMacroprocessoTipoDto
> {
  constructor(
    protected readonly repository: MacroprocessoTipoRepository,
    private readonly i18n: I18nService,
  ) {
    super();
  }

  async cadastrar(
    inputDTO: InputMacroprocessoTipoDto,
  ): Promise<StatusResponseDto> {
    const entity = new MacroprocessoTipo();
    Object.assign(entity, inputDTO);

    const saved = await this.repository.save(entity);
    return new StatusResponseDto(
      saved.id,
      200,
      this.i18n.translate('cadeiaValor.macroprocessoTipo.created'),
    );
  }
  async listar(paginacaoRequest: PaginacaoRequest, filtros: any, dir: string) {
    const { pagina, tamanho } = paginacaoRequest;
    const { filtertipo, filterdescricao } = filtros;

    const result = await this.repository.findAllWithFilters(
      pagina,
      tamanho,
      filtertipo,
      filterdescricao,
      dir.toUpperCase() as 'ASC' | 'DESC',
    );

    return {
      items: MacroprocessoTipoTransformer.transformList(result.items),
      meta: result.meta,
    };
  }

  async excluir(id: number): Promise<void> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(
        this.i18n.translate('cadeiaValor.macroprocessoTipo.notFound', { id }),
      );
    }

    try {
      await this.repository.softRemove(entity);
    } catch {
      throw new ConflictException(
        this.i18n.translate('cadeiaValor.macroprocessoTipo.inUse'),
      );
    }
  }

  async findByIdToDTO(id: number): Promise<OutputMacroprocessoTipoDto> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(
        this.i18n.translate('cadeiaValor.macroprocessoTipo.notFound', { id }),
      );
    }
    return MacroprocessoTipoTransformer.transform(entity);
  }

  async atualizar(
    id: number,
    inputDTO: InputMacroprocessoTipoDto,
  ): Promise<StatusResponseDto> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(
        this.i18n.translate('cadeiaValor.macroprocessoTipo.notFound', { id }),
      );
    }

    Object.assign(entity, inputDTO);
    const saved = await this.repository.save(entity);
    return new StatusResponseDto(
      saved.id,
      200,
      this.i18n.translate('cadeiaValor.macroprocessoTipo.updated'),
    );
  }

  async buscarSugestoesTipo(paginacaoRequest: PaginacaoRequest, tipo: string) {
    const result = await this.repository.buscarSugestoesTipo(
      paginacaoRequest.pagina,
      paginacaoRequest.tamanho,
      tipo,
    );

    return {
      items: MacroprocessoTipoTransformer.transformList(result.items),
      meta: result.meta,
    };
  }
}
