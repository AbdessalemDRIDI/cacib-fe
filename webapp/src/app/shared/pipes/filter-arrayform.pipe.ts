import { Pipe, PipeTransform } from '@angular/core';
import { ArrayFormFilterBasePipe } from './filter-arrayform-base.pipe';
/*
 * You can override, if needed, all the generated methods & variables of the Base Pipe in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This pipe is generated once and will no more be erased by the generator.
 */
@Pipe({
  name: 'vpArrayformFilter',
  standalone: true,
})
export class ArrayFormFilterPipe extends ArrayFormFilterBasePipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any[] {
    return super.transform(items, field, value);
  }
}
