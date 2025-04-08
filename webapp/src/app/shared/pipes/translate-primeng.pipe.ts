import { Pipe, PipeTransform } from '@angular/core';

import { TranslatorService } from '@services/translator/translator.service';
import { TranslatePrimengBasePipe } from './translate-primeng-base.pipe';
/**
 * A Workarround Pipe that translates some missed translations in Primeng components
 * You can override, if needed, all the generated methods & variables of the Base Pipe in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This pipe is generated once and will no more be erased by the generator.
 */
@Pipe({
  name: 'translatePrimeng',
  standalone: true,
})
export class TranslatePrimengPipe extends TranslatePrimengBasePipe implements PipeTransform {
  constructor(translateService: TranslatorService) {
    super(translateService);
  }
  /**
   * Translates the provided value
   * @param value
   * @param enumerationName
   * @param args
   */
  transform(value: any): any {
    return super.transform(value);
  }
}
