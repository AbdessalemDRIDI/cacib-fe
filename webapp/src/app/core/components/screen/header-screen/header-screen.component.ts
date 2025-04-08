import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
/**
 * The headerScreen component is responsible for rendering the header of the screen which contains two parts : Title and actions
 * There are four inputs passed to the Headerscreen component
 *
 * This class should not be modified.
 */
@Component({
  selector: 'app-header-screen',
  templateUrl: './header-screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class HeaderScreenComponent {
  /**
   * Element for the actions region
   */
  @Input() actionsTemplate: TemplateRef<any>;
  /**
   * Element for the header title
   */
  @Input() headerTitle: TemplateRef<any>;
}
