import { ApiProperty } from '@nestjs/swagger';
import { MacroprocessoBaseDto } from '../base/macroprocesso-base.dto';

export class OutputMacroprocessoDto extends MacroprocessoBaseDto {
  @ApiProperty({
    description: 'ID do macroprocesso',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'ID do tipo de macroprocesso',
    example: 1,
  })
  idTipo: number;

  @ApiProperty({
    description: 'Nome do tipo de macroprocesso',
    example: 'Finalístico',
  })
  nomeTipo: string;
}
