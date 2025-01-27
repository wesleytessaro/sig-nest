import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MacroprocessoTipoBaseDto {
  @ApiProperty({
    description: 'Nome do tipo do macroprocesso',
    example: 'Processo Finalístico',
  })
  @IsString()
  @MaxLength(255)
  tipo: string;

  @ApiProperty({
    description: 'Descrição do tipo do macroprocesso',
    required: false,
    example:
      'Processos que estão diretamente relacionados à geração do produto/serviço',
  })
  @IsString()
  @MaxLength(3000)
  descricao?: string;
}
