import { ApiProperty } from '@nestjs/swagger';
import { MacroprocessoTipoBaseDto } from '../base/macroprocesso-tipo-base.dto';

export class OutputMacroprocessoTipoDto extends MacroprocessoTipoBaseDto {
  @ApiProperty({
    description: 'Id do tipo do macroprocesso',
    example: '12',
  })
  id: number;
}
