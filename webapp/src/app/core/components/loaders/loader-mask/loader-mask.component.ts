import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * This Component hides the screen by displaying a mask and a spinner
 *
 * This class should not be modified.
 *
 */
@Component({
  selector: 'app-loader-mask',
  templateUrl: './loader-mask.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class LoaderMaskComponent {
  /**
   * Event input emitter to display the mask
   */
  @Input() show = false;
}
