import { Component } from '@angular/core';
import {
  COMPONENT_IMPORTS,
  COMPONENT_PROVIDERS,
  ScreenDialogComponentBase,
} from './screen-dialog.component-base';

/**
 * Component that loads a child route in the main body.
 * It is mainly used in the screens generated by `UI Studio` with navigation of type `Dialog`
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 */
@Component({
  selector: 'app-screen-dialog',
  templateUrl: './screen-dialog.component.html',
  standalone: true,
  imports: [...COMPONENT_IMPORTS],
  providers: [...COMPONENT_PROVIDERS],
})
export class ScreenDialogComponent extends ScreenDialogComponentBase {}
