import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { ProfileService } from '@services/profile/profile.service';
import { NumberBasePipe } from './number-base.pipe';
/**
 * Pipe that formats the number values. It is mainly used in the `Input` component supported by `UI Studio` tool.
 *
 You can override, if needed, all the generated methods & variables of the Base Pipe in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This pipe is generated once and will no more be erased by the generator.
 */
@Pipe({
  name: 'numberPipe',
  standalone: true,
})
export class NumberPipe extends NumberBasePipe implements PipeTransform {
  constructor(decimalPipe: DecimalPipe, profile: ProfileService) {
    super(decimalPipe, profile);
  }
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
    return super.transform(value, useDecimals, symbol, decimalNumber, position);
  }
  countDecimals(value) {
    return super.countDecimals(value);
  }
}
