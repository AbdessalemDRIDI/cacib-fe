import { Pipe, PipeTransform } from '@angular/core';

import { CriteriaService } from '@app/core/services/criteria/criteria.service';
import { OperatorBasePipe } from './operator-base.pipe';
/**
 * Pipe that returns the list of operators by type like 'number' 'text' 'date'
 *
 * It is mainly used by the SearchInput and Search with filters screens generated by UI Studio tool.
 *
 * You can override, if needed, all the generated methods & variables of the Base Pipe in this class.
 *
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This pipe is generated once and will no more be erased by the generator.
 */
@Pipe({
  name: 'operator',
  standalone: true,
})
export class OperatorPipe extends OperatorBasePipe implements PipeTransform {
  constructor(criteriaService: CriteriaService) {
    super(criteriaService);
  }

  transform(value: any[], type: string, columnFilter: boolean = false): string[] {
    return super.transform(value, type, columnFilter);
  }
}
