import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
/**
 * The footerScreen component is responsible for rendering the footer of the screen which contains the footer actions
 * There are one input passed to the FooterScreen component :
 * actionsTemplates: a templateRef which contains the template reference of the footerActions
 *
 * This class should not be modified.
 */
@Component({
  selector: 'app-footer-screen',
  templateUrl: './footer-screen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet],
})
export class FooterScreenComponent {
  /**
   * Element for the actions region
   */
  @Input() actionsTemplate: TemplateRef<any>;
  @Input() actionsLeft: TemplateRef<any>;
}
