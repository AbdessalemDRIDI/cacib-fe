import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  COMPONENT_IMPORTS,
  COMPONENT_PROVIDERS,
  GroupedToggleButtonComponentBase,
} from './grouped-toggle-button.component-base';

/**
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 */
@Component({
  selector: 'vp-grouped-toggle-button',
  templateUrl: './grouped-toggle-button.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => GroupedToggleButtonComponent),
    },
    ...COMPONENT_PROVIDERS,
  ],
  standalone: true,
  imports: [...COMPONENT_IMPORTS],
})
export class GroupedToggleButtonComponent
  extends GroupedToggleButtonComponentBase
  implements OnInit, ControlValueAccessor
{
  constructor() {
    super();
  }
  ngOnInit(): void {
    super.ngOnInit();
  }
}
