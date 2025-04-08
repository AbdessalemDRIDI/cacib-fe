import { Directive, ElementRef } from '@angular/core';
import { TextareaBaseDirective } from './text-area-base.directive';
/**
 * Directive that checks if textarea's hight is 0 (this is a primeng bug that occurs in certain scenarios,
 * in our case, when as a visible condition is applied to the textarea.
 * other expamples of people facing the same issue under different conditions :
 *      • when textarea is used inside a dialog => https://github.com/primefaces/primeng/issues/9231
 *      • when textarea starts as hidden => https://github.com/primefaces/primeng/issues/9890 )
 * And if so, it will calucalte the height from the number of rows and the lineHeight properties.
 * The lineHeight property is either the one set by the user (if exists) or the one set by the browser.
 *
 * You can override the Textarea directive, if needed, all the generated methods & variables of the Base component in this class.
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 */
@Directive({
  selector: '[plmTextArea]',
  standalone: true,
})
export class TextareaDirective extends TextareaBaseDirective {
  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
