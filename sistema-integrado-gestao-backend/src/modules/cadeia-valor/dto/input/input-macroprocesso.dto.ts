import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MacroprocessoBaseDto } from '../base/macroprocesso-base.dto';

export class InputMacroprocessoDto extends MacroprocessoBaseDto {
  @ApiProperty({
    description: 'ID do tipo de macroprocesso',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  idTipo: number;
}
