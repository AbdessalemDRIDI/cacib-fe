import { Pipe, PipeTransform } from '@angular/core';

import { TranslatorService } from '@services/translator/translator.service';
/**
 * A Workarround Pipe that translates some missed translations in Primeng components
 *
 * This class should not be modified.
 */
@Pipe({
  name: 'translatePrimeng',
})
export class TranslatePrimengBasePipe implements PipeTransform {
  constructor(protected translateService: TranslatorService) {}
  /**
   * Translates the provided value
   * @param value
   * @param enumerationName
   * @param args
   */
  transform(value: any): any {
    let result = this.translateService.getPrimengLabel(value);
    return result ? result : value;
  }
}
