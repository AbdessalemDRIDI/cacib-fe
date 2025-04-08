import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

import { transformToNumber } from '@core/utils';
import { ProfileService } from '@services/profile/profile.service';
import { NumberPipe } from '@shared/pipes/number.pipe';
/**
 * Directive that formats number values `onFocus` and `onBlur` events.
 *
 * This class should not be modified.
 */
@Directive()
export class NumberFormatterBaseDirective {
  /**
   * Native HTML element
   */
  private el: HTMLInputElement;

  constructor(
    private numberPipe: NumberPipe,
    private elementRef: ElementRef,
    private control: NgControl,
    private profile: ProfileService
  ) {
    this.el = this.elementRef.nativeElement;
  }
  /**
   * Focus event to execute
   * @param value
   */
  @HostListener('focus', ['$event.target.value'])
  onFocus(value) {
    this.el.value = this.control.control.value;
  }
  /**
   * Blur event to execute
   * @param value
   */
  @HostListener('blur', ['$event.target.value'])
  onBlur(value) {
    this.applyNumberFormatting(value);
  }

  ngAfterViewInit() {
    let value = this.el.value;
    this.applyNumberFormatting(value);
  }

  private applyNumberFormatting(value: any) {
    const numberValue = transformToNumber(
      value,
      this.profile.getGroupingSymbol(),
      this.profile.getDecimalSymbol()
    );
    this.control.control.setValue(numberValue);
    this.el.value = this.numberPipe.transform(value);
  }
}
