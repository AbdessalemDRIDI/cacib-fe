import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * This component is displayed when the current route is not `valid`
 *
 * This class should not be modified.
 *
 */
@Component({
  selector: 'app-error-404',
  templateUrl: './error-404.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class Error404Component {}
