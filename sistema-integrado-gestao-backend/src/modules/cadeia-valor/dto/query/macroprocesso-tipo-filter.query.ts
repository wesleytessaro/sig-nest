import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsString, Min, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export class MacroprocessoTipoFilterQuery {
  @ApiPropertyOptional({
    description: 'Número da página',
    default: 0,
    minimum: 0,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  pagina?: number = 0;

  @ApiPropertyOptional({
    description: 'Quantidade de itens por página',
    default: 10,
    minimum: 1,
    type: Number,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  tamanho?: number = 10;

  @ApiPropertyOptional({
    description: 'Filtro por tipo',
    example: 'TIPO_EXEMPLO',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  filtertipo?: string;

  @ApiPropertyOptional({
    description: 'Filtro por descrição',
    example: 'Descrição exemplo',
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  filterdescricao?: string;

  @ApiPropertyOptional({
    description: 'Direção da ordenação',
    enum: OrderDirection,
    default: OrderDirection.ASC,
  })
  @IsOptional()
  @IsEnum(OrderDirection)
  dir?: OrderDirection = OrderDirection.ASC;
}
