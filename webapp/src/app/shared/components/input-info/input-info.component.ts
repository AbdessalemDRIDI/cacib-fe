import { Component } from '@angular/core';
import {
  COMPONENT_IMPORTS,
  COMPONENT_PROVIDERS,
  InputInfoComponentBase,
} from './input-info.component-base';

/**
 * This is a Generic Component that display info text
 * under an input field
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 */
@Component({
  selector: 'vp-input-info',
  templateUrl: './input-info.component.html',
  standalone: true,
  imports: [...COMPONENT_IMPORTS],
  providers: [...COMPONENT_PROVIDERS],
})
export class InputInfoComponent extends InputInfoComponentBase {}
