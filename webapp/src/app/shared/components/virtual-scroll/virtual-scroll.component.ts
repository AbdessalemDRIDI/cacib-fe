import { Component, OnInit } from '@angular/core';
import {
  COMPONENT_IMPORTS,
  COMPONENT_PROVIDERS,
  VirtualScrollComponentBase,
} from './virtual-scroll.component-base';

/**
 * This Generic Component displays a chart from chart.js library
 * It takes as input some properties and data to display
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 */
@Component({
  selector: 'vp-virtual-scroll',
  templateUrl: './virtual-scroll.component.html',
  standalone: true,
  imports: [...COMPONENT_IMPORTS],
  providers: [...COMPONENT_PROVIDERS],
})
export class VirtualScrollComponent extends VirtualScrollComponentBase implements OnInit {
  constructor() {
    super();
  }
  ngOnInit(): void {
    super.ngOnInit();
  }
}
