import { ChangeDetectionStrategy, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { AccessibilityDirective } from '@shared/directives/accessibility.directive';
import { DialogModule } from 'primeng/dialog';
/**
 * A dialog component that opens a popup for a given `Angular` component
 *
 * This class should not be modified.
 */
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [DialogModule, AccessibilityDirective],
})
export class DialogComponent {
  /**
   * The display property that is by default `true`
   */
  display = true;
  /**
   * The dialog's title
   */
  title = '';
  /**
   * The styleName of the dialog
   */
  styleName = '';
  /**
   * @private
   */
  private componentRef;
  /**
   * @private
   */
  @ViewChild('content', { read: ViewContainerRef, static: true }) contentRef: ViewContainerRef;

  /**
   * Opens a dialog window with the provided component
   * @param component
   * @param componentRef
   * @param injector
   * @param title
   * @returns {any}
   */
  open(component, componentRef, injector, title): any {
    this.componentRef = componentRef;
    if (title) {
      this.title = title;
    }
    return this.contentRef.createComponent(component, null, injector);
  }
  /**
   * Destroys the component when hiding the dialog
   */
  onHide() {
    this.componentRef.destroy();
  }
}
