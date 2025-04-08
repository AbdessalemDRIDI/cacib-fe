import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';
import { SummaryHeightCalculatorBaseDirective } from './summary-height-calculator-base.directive';
/**
 * Directive that calculates summary height values.
 *
 * You can override the SummaryHeight directive, if needed, all the generated methods & variables of the Base component in this class.
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 */
@Directive({
  selector: '[summaryHeightCalculator]',
  standalone: true,
})
export class SummaryHeightCalculatorDirective
  extends SummaryHeightCalculatorBaseDirective
  implements AfterViewInit, OnDestroy
{
  constructor(el: ElementRef) {
    super(el);
  }
}
