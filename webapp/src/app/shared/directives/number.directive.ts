import { Directive, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

import { ProfileService } from '@services/profile/profile.service';
import { NumberPipe } from '@shared/pipes/number.pipe';
import { NumberFormatterBaseDirective } from './number-base.directive';
/**
 * Directive that formats number values `onFocus` and `onBlur` events.
 *
 * You can override the NumberFormatter directive, if needed, all the generated methods & variables of the Base component in this class.
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 */
@Directive({
  selector: '[plmNumberFormatter]',
  standalone: true,
})
export class NumberFormatterDirective extends NumberFormatterBaseDirective {
  constructor(
    numberPipe: NumberPipe,
    elementRef: ElementRef,
    control: NgControl,
    profile: ProfileService
  ) {
    super(numberPipe, elementRef, control, profile);
  }
}
