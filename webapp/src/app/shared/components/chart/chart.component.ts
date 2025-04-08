import { Component } from '@angular/core';
import { ChartJSService } from './chart-js-service';
import { COMPONENT_IMPORTS, COMPONENT_PROVIDERS, ChartComponentBase } from './chart.component-base';

/**
 * This Generic Component displays a chart from chart.js library
 * It takes as input some properties and data to display
 * @AutoSkip Do not remove this tag to keep your file out of regeneration.
 * @Note This component is generated once and will no more be erased by the generator.
 */
@Component({
  selector: 'vp-chart',
  templateUrl: './chart.component.html',
  standalone: true,
  imports: [...COMPONENT_IMPORTS],
  providers: [...COMPONENT_PROVIDERS],
})
export class ChartComponent extends ChartComponentBase {
  constructor(chartJsService: ChartJSService) {
    super(chartJsService);
  }
}
