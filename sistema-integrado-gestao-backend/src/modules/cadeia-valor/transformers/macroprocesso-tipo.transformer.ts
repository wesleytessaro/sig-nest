import { BaseTransformer } from '../../../shared/base/transformers/base.transformer';
import { OutputMacroprocessoTipoDto } from '../dto/output/output-macroprocesso-tipo.dto';

export class MacroprocessoTipoTransformer extends BaseTransformer<OutputMacroprocessoTipoDto> {
  static transform(data: any): OutputMacroprocessoTipoDto {
    const baseData = super.transform(data);
    return {
      ...baseData,
      tipo: data.tipo,
      descricao: data.descricao,
    };
  }

  static transformList(dataList: any[]): OutputMacroprocessoTipoDto[] {
    return super.transformList(dataList);
  }
}
