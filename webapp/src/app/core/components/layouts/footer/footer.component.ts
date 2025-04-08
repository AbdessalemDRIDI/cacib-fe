import { ChangeDetectionStrategy, Component } from '@angular/core';
/**
 * The footer region used in the home page
 *
 * This class should not be modified.
 *
 */
@Component({
  selector: 'app-footer',
  template: '<div class="footer"><ng-content></ng-content></div>',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
