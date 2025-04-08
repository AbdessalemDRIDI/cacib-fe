import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { isDate } from 'lodash';

import { ProfileService } from '@services/profile/profile.service';
import { NumberPipe } from '@shared/pipes/number.pipe';
/**
 * Pipe that formats the Currency values. It is mainly used in the `currency` component supported by ÙI Studio`tool.
 *
 * You can override, if needed, all the generated methods & variables of the Base Pipe in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This pipe is generated once and will no more be erased by the generator.
 */
@Pipe({
  name: 'gridPipe',
})
export class GridBasePipe implements PipeTransform {
  /**
   * The current language
   */
  locale: string;

  constructor(
    protected profile: ProfileService,
    protected numberPipe: NumberPipe,
    protected datePipe: DatePipe
  ) {}
  /**
   * Formats the provided column's value
   * @param value
   * @param colType
   * @param temporalType
   * @param datePrecision
   */
  transform(value: any, colType: string, temporalType?: string, datePrecision?: string): string {
    if (value) {
      if (colType === 'date' && isDate(value)) {
        return this.datePipe.transform(
          value,
          this.profile.getDateFormat(temporalType, datePrecision)
        );
      } else if (colType === 'number' || colType === 'integer') {
        return this.numberPipe.transform(value);
      } else {
        return value;
      }
    }
  }
}
