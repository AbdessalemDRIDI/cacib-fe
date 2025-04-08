import { Pipe, PipeTransform } from '@angular/core';
import { kebabCase } from 'lodash';

@Pipe({
  name: 'kebabCasePipe',
})
export class KebabCaseBasePipe implements PipeTransform {
  transform(value: string): string {
    return kebabCase(value);
  }
}
