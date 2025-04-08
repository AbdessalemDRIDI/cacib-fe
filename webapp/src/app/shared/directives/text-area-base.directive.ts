import { Directive, ElementRef } from '@angular/core';
/**
 * Directive that checks if textarea's hight is 0 (this is a primeng bug that occurs in certain scenarios,
 * in our case, when as a visible condition is applied to the textarea.
 * other expamples of people facing the same issue under different conditions :
 *      • when textarea is used inside a dialog => https://github.com/primefaces/primeng/issues/9231
 *      • when textarea starts as hidden => https://github.com/primefaces/primeng/issues/9890 )
 * And if so, it will calucalte the height from the number of rows and the lineHeight properties.
 * The lineHeight property is either the one set by the user (if exists) or the one set by the browser.
 *
 * This class should not be modified.
 */
@Directive()
export class TextareaBaseDirective {
  private element: HTMLInputElement;
  lineHeight;
  rows;

  constructor(private elementRef: ElementRef) {
    this.element = this.elementRef.nativeElement;
  }

  ngAfterViewChecked() {
    if (this.element.style && this.element.style.height === '0px') {
      this.rows = this.element.attributes['rows'] ? this.element.attributes['rows'].value : 2;

      if (!this.lineHeight) {
        this.lineHeight =
          this.element.style.lineHeight || window.getComputedStyle(this.element, null).lineHeight;
        this.lineHeight = Number(this.lineHeight.replace('px', ''));
      }

      this.element.style.height = this.rows * this.lineHeight + 'px';
    }
  }
}
