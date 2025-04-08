import { Directive, ElementRef, Input } from '@angular/core';

import { ProfileService } from '@app/core/services/profile/profile.service';
/**
 * Directive that sets the date format to the provided HTML element.
 *
 * This class should not be modified.
 */
@Directive()
export class DateFormatBaseDirective {
  @Input() temporalType: string;
  @Input() datePrecison: string;

  constructor(
    private elementRef: ElementRef,
    private profileService: ProfileService
  ) {
    this.elementRef['dateFormat'] = this.profileService.getDateFormat(
      this.temporalType,
      this.datePrecison
    );
  }
}
