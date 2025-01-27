import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MacroprocessoBaseDto {
  @ApiProperty({
    description: 'Nome do macroprocesso',
    example: 'Gestão de Pessoas',
  })
  @IsString()
  @MaxLength(255)
  nome: string;

  @ApiProperty({
    description: 'Descrição do macroprocesso',
    required: false,
    example: 'Processo responsável pela gestão de recursos humanos',
  })
  @IsString()
  @MaxLength(3000)
  descricao?: string;
}
