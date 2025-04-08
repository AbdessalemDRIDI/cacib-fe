import { ChangeDetectionStrategy, Component } from '@angular/core';
/**
 * The main body region used in the home page
 *
 *  This class should not be modified.
 */
@Component({
  selector: 'app-body',
  template: '<ng-content></ng-content>',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodyComponent {}
