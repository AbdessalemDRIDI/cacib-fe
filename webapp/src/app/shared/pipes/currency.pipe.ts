import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { ProfileService } from '@services/profile/profile.service';
import { CustomCurrencyBasePipe } from './currency-base.pipe';
/**
 * Pipe that formats the Currency values. It is mainly used in the `currency` component supported by ÙI Studio`tool.
 *
 * You can override, if needed, all the generated methods & variables of the Base Pipe in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This pipe is generated once and will no more be erased by the generator.
 */
@Pipe({
  name: 'currencyPipe',
  standalone: true,
})
export class CustomCurrencyPipe extends CustomCurrencyBasePipe implements PipeTransform {
  constructor(currencyPipe: CurrencyPipe, profile: ProfileService) {
    super(currencyPipe, profile);
  }

  /**
   * Formats the provided value using the user's profile
   * @param value
   * @param currencyCode
   * @param currencyDecimal
   */
  transform(value: any, currencyCode?: string, currencyDecimal?: string, display?: string): string {
    return super.transform(value, currencyCode, currencyDecimal, display);
  }
}
