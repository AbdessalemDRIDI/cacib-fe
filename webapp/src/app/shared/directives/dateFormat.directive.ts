import { Directive, ElementRef } from '@angular/core';

import { ProfileService } from '@app/core/services/profile/profile.service';
import { DateFormatBaseDirective } from './dateFormat-base.directive';
/**
 * Directive that sets the date format to the provided HTML element.
 *
 * You can override the DateFormat directive, if needed, all the generated methods & variables of the Base component in this class.
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 */
@Directive({
  selector: '[appDateFormat]',
  standalone: true,
})
export class DateFormatDirective extends DateFormatBaseDirective {
  constructor(elementRef: ElementRef, profileService: ProfileService) {
    super(elementRef, profileService);
  }
}
