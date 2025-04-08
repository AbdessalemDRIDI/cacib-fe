import { Directive, ElementRef, OnChanges } from '@angular/core';
import { HideColumnBaseDirective } from './hide-column-base.directive';
/**
 * Directive that hides a column.
 *
 * You can override the HideColumn directive, if needed, all the generated methods & variables of the Base component in this class.
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 */
@Directive({
  selector: '[hideColumn]',
  standalone: true,
})
export class HideColumnDirective extends HideColumnBaseDirective implements OnChanges {
  constructor(el: ElementRef) {
    super(el);
  }
}
