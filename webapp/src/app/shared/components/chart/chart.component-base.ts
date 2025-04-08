import { Component, Input, OnChanges } from '@angular/core';

import { ChartJSService } from './chart-js-service';

import { NgClass } from '@angular/common';
import { ChartModule } from 'primeng/chart';

export const COMPONENT_PROVIDERS = [];
export const COMPONENT_IMPORTS = [ChartModule, NgClass];
/**
 * This Generic Component displays a chart from chart.js library
 * It takes as input some properties and data to display
 */
@Component({ template: '' })
export class ChartComponentBase implements OnChanges {
  /**
   *The property that holds the chart data
   */
  chartJsData = {};
  /**
   * The property that holds the chart option
   */
  chartJsOptions = {};
  /**
   * Display loading mask when true
   */
  loading = true;
  /***
   * The real type of the chart to draw: bar-chart ,doughnut-chart...
   */
  @Input() realType;
  /***
   * The type of the chart to draw: line,bar...
   */
  @Input() type: string;
  /***
   * Setter method for the provided data
   */
  @Input() data: any;
  /**
   *The options of chart.js component
   */
  @Input() options: object;
  /**
   * Property that set the height of the chart
   */
  @Input() height = '350px';
  /**
   * Property that show or hide the chart title
   */
  @Input() showtitle: boolean = true;
  /**
   * Property that show or hide the chart legends
   */
  @Input() showLegend: boolean = true;
  /**
   * Property that set the chart title
   */
  @Input() title: string;
  /**
   * Property that set the legends position
   */
  @Input() legendPosition = 'top';
  /**
   * Property that set the thikness of the doughnut chart
   */
  @Input() thikness;
  /**
   * Property that show/hide the total number in the doughnut chart
   */
  @Input() showTotalNumber: boolean = true;
  /**
   * FontSize of the text displayed inside a doughnut chart
   */
  @Input() totalNumberFontSize = '14px';
  /**
   * Property that show/hide the total number labels in the doughnut chart
   */
  @Input() showTotalLabel: boolean = true;
  /**
   * Property that set the total number label
   */
  @Input() totalLabel = 'Total: ';
  /**
   * Property that set the label field
   */
  @Input() labelField: string;
  /**
   * Property that set the data field
   */
  @Input() dataField: string;
  /**
   * Property that set the data set label in polarArea & radar chart
   */
  @Input() dataSetLabel: string;
  /**
   * Property that set the stacked property in bar chart
   */
  @Input() stacked: boolean = false;
  /**
   *
   * @param chartJsService
   */
  constructor(private chartJsService: ChartJSService) {}
  ngOnChanges() {
    if (this.data) {
      this.chartJsData = this.chartJsService.getDataSets(
        this.data,
        this.options,
        this.labelField,
        this.dataField,
        this.dataSetLabel
      );
      this.loading = false;
      this.chartJsOptions = this.chartJsService.getOptions(
        {
          title: this.title,
          showLegend: this.showLegend,
          legendPosition: this.legendPosition,
          showtitle: this.showtitle,
          thikness: this.thikness,
          showTotalNumber: this.showTotalNumber,
          showTotalLabel: this.showTotalLabel,
          totalLabel: this.totalLabel,
          options: this.options,
          value: this.data,
          labelField: this.labelField,
          chartJsData: this.chartJsData,
          type: this.type,
          totalNumberFontSize: this.totalNumberFontSize,
        },
        this.stacked
      );
    }
  }
}
