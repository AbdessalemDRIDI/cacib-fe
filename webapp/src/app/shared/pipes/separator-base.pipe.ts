import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe that return the label to be displayed in case a separator is configured
 *
 *
 *
 * This class should not be modified.
 */
@Pipe({
  name: 'separatorPipe',
})
export class SeparatorBasePipe implements PipeTransform {
  transform(value, separator: string) {
    if (value != null) {
      if (typeof value !== 'string') {
        value = value.toString();
      }
      let valueSeparator = value.split(separator);
      const filteredValue = valueSeparator.filter(
        (item) => item !== '' && !item.includes('null') && !item.includes('undefined')
      );

      return filteredValue.join(separator);
    }
  }
}
