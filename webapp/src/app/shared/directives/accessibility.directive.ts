import { Directive } from '@angular/core';
import { AccessibilityBaseDirective } from './accessibility-base.directive';
/**
 * Directive that handles PrimeNG components accessibility issues.
 *
 * You can override the Accessibility directive, if needed, all the generated methods & variables of the Base directive in this class.
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This directive is generated once and will no more be erased by the generator.
 */
@Directive({
  selector: '[plmAccessibility]',
  standalone: true,
})
export class AccessibilityDirective extends AccessibilityBaseDirective {}
