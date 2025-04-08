import { Pipe, PipeTransform } from '@angular/core';

import { TranslatorService } from '@services/translator/translator.service';
import { TranslateEnumBasePipe } from './translate-enum-base.pipe';
/**
 * Pipe that translates the enumeration vqlue
 * You can override, if needed, all the generated methods & variables of the Base Pipe in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This pipe is generated once and will no more be erased by the generator.
 */
@Pipe({
  name: 'translateEnum',
  standalone: true,
})
export class TranslateEnumPipe extends TranslateEnumBasePipe implements PipeTransform {
  constructor(translateService: TranslatorService) {
    super(translateService);
  }
  /**
   * Translates the provided value
   * @param value
   * @param model
   * @param isBboolean
   */
  transform(value: any, model?: string, isBoolean?: boolean): any {
    return super.transform(value, model, isBoolean);
  }
}
