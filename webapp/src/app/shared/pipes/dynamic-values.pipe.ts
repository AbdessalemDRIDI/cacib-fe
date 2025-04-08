import { Pipe, PipeTransform } from '@angular/core';
import { TranslatorService } from '@app/core/services/translator/translator.service';
import { DynamicValuesBasePipe } from './dynamic-values-base.pipe';
/*
 * You can override, if needed, all the generated methods & variables of the Base Pipe in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This pipe is generated once and will no more be erased by the generator.
 */
@Pipe({
  name: 'dynamicValuesPipe',
  standalone: true,
})
export class DynamicValuesPipe extends DynamicValuesBasePipe implements PipeTransform {
  constructor(translatorService: TranslatorService) {
    super(translatorService);
  }

  transform(value: string, key: string): string {
    let returnedValue = value;
    this.translatorService.getDynamicValues(value, key).subscribe((data) => {
      if (!data.includes('DynamicValues.')) {
        returnedValue = data;
      }
    });
    return returnedValue;
  }
}
