import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { transformToNumber } from '@core/utils';
import { ProfileService } from '@services/profile/profile.service';
/**
 * Pipe that formats the number values. It is mainly used in the `Input` component supported by `UI Studio` tool.
 *
 * This class should not be modified.
 */
@Pipe({
  name: 'numberPipe',
})
export class NumberBasePipe implements PipeTransform {
  constructor(
    protected decimalPipe: DecimalPipe,
    protected profile: ProfileService
  ) {}
  /**
   * Formats the provided value using native Angular Pipe
   * @param value
   * @param fractionSize
   */
  transform(
    value: number | string,
    useDecimals?: boolean,
    symbol?: string,
    decimalNumber?: string,
    position?: string
  ): string {
    if (value || value === 0) {
      const numberValue = transformToNumber(
        value,
        this.profile.getGroupingSymbol(),
        this.profile.getDecimalSymbol()
      );
      if (symbol || decimalNumber) {
        const format = decimalNumber
          ? `1.${decimalNumber}-${decimalNumber}`
          : this.profile.getDigitsInfo();
        const currencySymbol = symbol ? symbol : ``;
        const formattedValue = this.decimalPipe.transform(
          numberValue,
          format,
          this.profile.getLocale()
        );
        return position === 'left'
          ? currencySymbol + formattedValue
          : formattedValue + ` ${currencySymbol}`;
      } else {
        const minFractionDigits = useDecimals == true ? this.countDecimals(value) : 0;
        return this.decimalPipe.transform(
          numberValue,
          this.profile.getDigitsInfo(null, minFractionDigits),
          this.profile.getLocale()
        );
      }
    }
    return '';
  }
  countDecimals(value) {
    if (Math.floor(value) === value || !value) return 0;
    return value.toString().lastIndexOf('.') < 0 ? 0 : value.toString().split('.')[1].length || 0;
  }
}
