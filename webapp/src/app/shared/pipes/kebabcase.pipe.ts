import { Pipe, PipeTransform } from '@angular/core';
import { KebabCaseBasePipe } from './kebabcase-base.pipe';

/**
 * Pipe that Transforms a string into kebab case using lodash's kebabCase method.
 *
 You can override, if needed, all the generated methods & variables of the Base Pipe in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This pipe is generated once and will no more be erased by the generator.
 */

@Pipe({
  name: 'kebabCasePipe',
  standalone: true,
})
export class KebabCasePipe extends KebabCaseBasePipe implements PipeTransform {
  transform(value: string): string {
    return super.transform(value);
  }
}
