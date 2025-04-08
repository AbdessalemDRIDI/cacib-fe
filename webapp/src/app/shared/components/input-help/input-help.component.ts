import { Component } from '@angular/core';
import {
  COMPONENT_IMPORTS,
  COMPONENT_PROVIDERS,
  InputHelpComponentBase,
} from './input-help.component-base';

/**
 * This is a Generic Component that display a help icon with a tooltip
 * next to an input field's label
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 */
@Component({
  selector: 'vp-input-help',
  templateUrl: './input-help.component.html',
  standalone: true,
  imports: [...COMPONENT_IMPORTS],
  providers: [...COMPONENT_PROVIDERS],
})
export class InputHelpComponent extends InputHelpComponentBase {}
