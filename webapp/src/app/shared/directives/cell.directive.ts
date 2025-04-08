import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { CellBaseDirective } from './cell-base.directive';
/**
 * Directive that displays a tooltip on truncated cell's content
 *
 * You can override the Cell directive, if needed, all the generated methods & variables of the Base component in this class.
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 */
@Directive({
  selector: '[plmTruncatedCell]',
  standalone: true,
})
export class CellDirective extends CellBaseDirective {
  @Output() mouseOverCell = new EventEmitter<boolean>();

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
