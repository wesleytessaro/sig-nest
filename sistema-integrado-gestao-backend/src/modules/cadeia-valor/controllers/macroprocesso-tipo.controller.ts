// src/modules/cadeia-valor/controllers/macroprocesso-tipo.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { MacroprocessoTipoService } from '../services/macroprocesso-tipo.service';
import { InputMacroprocessoTipoDto } from '../dto/input/input-macroprocesso-tipo.dto';
import { OutputMacroprocessoTipoDto } from '../dto/output/output-macroprocesso-tipo.dto';
import { PaginacaoRequest } from '@shared/dto';
import { StatusResponseDto } from '@shared/dto';
import { SwaggerTags } from 'src/common/config/swagger/tags.config';
import { MacroprocessoTipoFilterQuery } from '../dto/query/macroprocesso-tipo-filter.query';

@ApiTags(SwaggerTags.CADEIA_VALOR_TIPO_MACROPROCESSO.name)
@Controller('macroprocesso-tipo')
export class MacroprocessoTipoController {
  constructor(private readonly service: MacroprocessoTipoService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar novo tipo de macroprocesso' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: StatusResponseDto,
  })
  cadastrar(@Body() inputDTO: InputMacroprocessoTipoDto) {
    return this.service.cadastrar(inputDTO);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar tipos de macroprocesso',
    description: 'Lista os tipos de macroprocesso com filtros e paginação',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de tipos de macroprocesso',
    type: OutputMacroprocessoTipoDto,
    isArray: true,
  })
  async listarComDTO(@Query() filter: MacroprocessoTipoFilterQuery) {
    const { pagina, tamanho, filtertipo, filterdescricao, dir } = filter;
    const paginacaoRequest = { pagina, tamanho };
    const filtros = { filtertipo, filterdescricao };
    return this.service.listar(paginacaoRequest, filtros, dir);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Excluir tipo de macroprocesso' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async excluir(@Param('id') id: string) {
    await this.service.excluir(+id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar tipo de macroprocesso por ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: OutputMacroprocessoTipoDto,
  })
  findByIdToDTO(@Param('id') id: string) {
    return this.service.findByIdToDTO(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar tipo de macroprocesso' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: StatusResponseDto,
  })
  atualizar(
    @Param('id') id: string,
    @Body() inputDTO: InputMacroprocessoTipoDto,
  ) {
    return this.service.atualizar(+id, inputDTO);
  }

  @Get('sugestoes/tipo')
  @ApiOperation({ summary: 'Buscar sugestões de tipos de macroprocesso' })
  @ApiQuery({ name: 'tipo', required: true })
  @ApiQuery({ name: 'pagina', required: false, type: Number })
  @ApiQuery({ name: 'tamanho', required: false, type: Number })
  buscarSugestoesTipo(
    @Query() paginacao: PaginacaoRequest,
    @Query('tipo') tipo: string,
  ) {
    return this.service.buscarSugestoesTipo(paginacao, tipo);
  }
}
