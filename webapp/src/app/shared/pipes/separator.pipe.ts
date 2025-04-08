import { Pipe, PipeTransform } from '@angular/core';
import { SeparatorBasePipe } from './separator-base.pipe';

/**
 * Pipe that return the label to be displayed in case a separator is configured
 * You can override, if needed, all the generated methods & variables of the Base Pipe in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This pipe is generated once and will no more be erased by the generator.
 */
@Pipe({
  name: 'separatorPipe',
  standalone: true,
})
export class SeparatorPipe extends SeparatorBasePipe implements PipeTransform {
  transform(value, separator: string) {
    return super.transform(value, separator);
  }
}
