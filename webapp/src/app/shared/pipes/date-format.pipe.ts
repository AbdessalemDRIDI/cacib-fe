import { Pipe, PipeTransform } from '@angular/core';
import { DateFormatBasePipe } from './date-format-base.pipe';
/**
 * Pipe that formats the Date values. It is mainly used in the `Date` & `FromToDate` components supported by `UI Studio` tool.
 *
 * You can override, if needed, all the generated methods & variables of the Base Pipe in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This pipe is generated once and will no more be erased by the generator.
 */
@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe extends DateFormatBasePipe implements PipeTransform {
  /**
   * Formats the Date's value
   * @param value
   * @param temporaltype
   */
  transform(
    value: string,
    temporaltype: string // tslint:disable-next-line:one-line
  ) {
    return super.transform(value, temporaltype);
  }
}
