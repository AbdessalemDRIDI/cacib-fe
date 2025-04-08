import { Pipe, PipeTransform } from '@angular/core';
import { DatePrecision } from '@core/utils';
/**
 * Pipe that formats the Date values. It is mainly used in the `Date` & `FromToDate` components supported by `UI Studio` tool.
 *
 * This class should not be modified.
 */
@Pipe({
  name: 'dateFormat',
})
export class DateFormatBasePipe implements PipeTransform {
  /**
   * Formats the Date's value
   * @param value
   * @param temporaltype
   */
  transform(
    value: string,
    temporaltype: string // tslint:disable-next-line:one-line
  ) {
    if (typeof value === 'string') {
      if (value && temporaltype && temporaltype === 'TIMESTAMP' && value.includes('H')) {
        value = value.substring(0, value.indexOf('H')).trim();
      }
      value = DatePrecision.convertToPrimeNgDateFormat(value);
    }
    return value;
  }
}
