import { Pipe, PipeTransform } from '@angular/core';

import { TranslatorService } from '@services/translator/translator.service';
/**
 * Pipe that translates the enumeration vqlue
 *
 * This class should not be modified.
 */
@Pipe({
  name: 'translateEnum',
})
export class TranslateEnumBasePipe implements PipeTransform {
  constructor(protected translateService: TranslatorService) {}
  /**
   * Translates the provided value
   * @param value
   * @param model
   * @param isBboolean
   */
  transform(value: any, model?: string, isBboolean?: boolean): any {
    let result = this.translateService.translateEnumItem(value, model);
    if (result === value && isBboolean) {
      result = this.translateService.translateEnumItem(value, 'BOOLEAN');
    }
    return result ? result : value === false ? 'false' : value;
  }
}
