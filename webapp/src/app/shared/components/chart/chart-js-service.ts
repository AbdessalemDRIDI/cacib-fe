import { Injectable } from '@angular/core';
import * as Chartjs from 'chart.js';
import { get } from 'lodash';

import { CustomChartService } from '@app/core/services/feature/custom-chart.service';

/**
 * This is a workarround to display a text inside a doughnut Chart
 *
 */
Chartjs.Chart.register({
  id: 'textCenterPlugin',
  beforeDraw: function (chart, arg, options) {
    const txt = get(chart, 'config._config.options.textCenter', '');
    if (get(chart, 'config._config.type') === 'doughnut' && txt !== undefined && txt.length > 0) {
      const config = {
        options: {
          elements: {
            center: {
              sidePadding: 20, // Default is 20 (as a percentage)
              minFontSize: 25, // Default is 20 (in px), set to false and text will not wrap.
              maxFontSize: 75,
              lineHeight: 25, // Default is 25 (in px), used for when text wraps
            },
          },
        },
      };
      // Get ctx from string
      let ctx = chart.ctx;
      // Get options from the center object in options
      let centerConfig = config.options.elements.center;
      const fontStyle = 'Arial';
      const color = '#2f384e';
      const maxFontSize = centerConfig.maxFontSize || 75;
      const sidePadding = centerConfig.sidePadding || 20;
      const sidePaddingCalculated = (sidePadding / 100) * (chart['innerRadius'] * 2);
      // Start with a base font of 30px
      const totalNumberFontSize = get(chart, 'config._config.options.totalNumberFontSize', '14px');
      ctx.font = `${totalNumberFontSize} ${fontStyle}`;

      // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
      const stringWidth = ctx.measureText(txt).width;
      const elementWidth = chart['innerRadius'] * 2 - sidePaddingCalculated;

      // Find out how much the font can grow in width.
      const widthRatio = elementWidth / stringWidth;
      const newFontSize = Math.floor(30 * widthRatio);
      const elementHeight = chart['innerRadius'] * 2;

      // Pick a new font size so it will not be larger than the height of label.
      let fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
      let minFontSize = centerConfig.minFontSize;
      let wrapText = false;

      if (minFontSize === undefined) {
        minFontSize = 20;
      }

      if (minFontSize && fontSizeToUse < minFontSize) {
        fontSizeToUse = minFontSize;
        wrapText = true;
      }

      // Set font settings to draw it correctly.
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      let centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
      ctx.font = fontSizeToUse + 'px ' + fontStyle;
      ctx.fillStyle = color;

      if (!wrapText) {
        ctx.fillText(txt, centerX, centerY);
        return;
      }
    }
  },
});
/**
 * Default Hexa colors
 */
const DEFAULT_COLORS = [
  '#2ecc71',
  '#3498db',
  '#190b75',
  '#95a5a6',
  '#9b59b6',
  '#f1c40f',
  '#e74c3c',
  '#107f0a',
  '#cc06bb',
  '#bc0f60',
  '#b26201',
  '#530b7a',
  '#dbca15',
  '#b611c1',
  '#036c7f',
];
/**
 * Utility service that provides chart.js options and data
 */
@Injectable({
  providedIn: 'root',
})
export class ChartJSService {
  /**
   * Default Constructor of the component
   */
  constructor(private customChartService: CustomChartService) {}

  /**
   * init the chart options
   */
  getOptions(props: any, stacked: boolean): any {
    return {
      parsing: {
        key: get(props.options, 'dataField'),
        xAxisKey: get(props.options, 'xAxisLabel'),
        yAxisKey: get(props.options, 'yAxisLabel'),
      },
      responsive: true,
      totalNumberFontSize: props.totalNumberFontSize,
      textCenter:
        props.type === 'doughnut'
          ? this.getDoughnutTextCenter(
              props.chartJsData,
              props.showTotalNumber,
              props.showTotalLabel,
              props.totalLabel
            )
          : undefined,
      plugins: {
        legend: {
          display: props.showLegend,
          position: props.legendPosition,
        },
        title: {
          display: props.showtitle === false ? false : true,
          text: props.title,
        },
      },
      scales: this.getScalesOptions(props, stacked),
      cutout: props.thikness,
    };
  }
  /**
   * Get the scales options
   * @param props
   * @param stacked
   * @returns
   */
  getScalesOptions(props: any, stacked: boolean) {
    return stacked
      ? {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        }
      : undefined;
  }

  /**
   * Get the data to display to the specific chart
   */
  getDataSets(
    data: any,
    options: any,
    labelField: string,
    dataField: string,
    dataSetLabel: string
  ): any {
    if (this.isPalmyraResponse(data)) {
      return this.customChartService.createChart(data);
    } else {
      const datasets = [];
      if (options && options?.dataSets) {
        options.dataSets.forEach((item) => {
          datasets.push({
            type: item.type ? item.type : 'bar',
            label: item.label ? item.label : '',
            backgroundColor: item.backgroundColor,
            data: this.getDataSetValues(data, item.dataField),
          });
        });
      } else {
        datasets.push({
          backgroundColor: this.getBackgroundColors('pie'),
          label: dataSetLabel ? dataSetLabel : '',
          data: this.getDataSetValues(data, dataField),
        });
      }
      return {
        labels: this.getLabels(data, labelField),
        datasets,
      };
    }
  }
  /**
   * Return the list of background colors
   * @param type
   * @returns
   */
  getBackgroundColors(type) {
    switch (type) {
      case 'radar':
      case 'polarArea':
      case 'doughnut':
      case 'pie':
      case 'line':
      case 'bar':
        return DEFAULT_COLORS;
    }
  }
  /**
   * Map the data according to the web service response
   */
  getDataSetValues(data, valueField): any {
    // case of WS RESPONSE Array [{id:111,name:test}]
    if (Array.isArray(data)) {
      return this.getDataFromPath(data, valueField);
    } else {
      // case of WS RESPONSE Object {key: value, key1: value}
      if (this.isFlatJson(data)) {
        return Object.values(data);
      } else {
        // case of non palmyra WS RESPONSE Object
        return this.getDataFromPath(data, valueField);
      }
    }
  }

  /**
   * return true if the response is flat json
   */
  isFlatJson(data: any): boolean {
    return Object.values(data).every((item) => !['object', 'array'].includes(typeof item));
  }

  /**
   * return true if it is a palmyra response
   */
  isPalmyraResponse(data: any): boolean {
    return data.hasOwnProperty('series') && data.hasOwnProperty('xData');
  }

  /**
   *  return the list of labels based on the label field
   * @param data
   * @param labelField
   * @returns
   */
  getLabels(data: any, labelField: string) {
    // case of WS RESPONSE Array [{id:111,name:test}]
    if (Array.isArray(data)) {
      return this.getDataFromPath(data, labelField);
    } else {
      // case of non flat and non palmyra WS RESPONSE Object
      if (!this.isFlatJson(data) && !this.isPalmyraResponse(data)) {
        return labelField ? this.getDataFromPath(data, labelField) : [];
      } else if (this.isPalmyraResponse(data)) {
        // case of palmyra WS RESPONSE Object
        return data.xData;
      } else {
        // case of flat WS RESPONSE Object {key: value, key1: value}
        return Object.keys(data);
      }
    }
  }

  /**
   * return the list of labels or datasets based on the label field
   * @param data
   * @param dataField
   * @returns
   */
  getDataFromPath(data, dataField) {
    let dotLastIndex = dataField.lastIndexOf('.');
    let path = dataField.substring(0, dotLastIndex);
    let dataValue = dataField.substring(dotLastIndex + 1, dataField.length);
    if (Array.isArray(data)) {
      let dataChart = [];
      data.map((elmt) => {
        dataChart.push(get(elmt, dataField));
      });
      return dataField ? dataChart : [];
    } else {
      return dataField ? get(data, path).map((elmt) => elmt[dataValue]) : [];
    }
  }
  /**
   *
   * @param chartJsData
   * @param showTotalNumber
   * @param showTotalLabel
   * @param totalLabel
   * @returns
   */
  getDoughnutTextCenter(chartJsData, showTotalNumber, showTotalLabel, totalLabel) {
    let total = chartJsData?.datasets[0]?.data?.reduce((sum, val) => sum + val, 0);
    return showTotalNumber ? (showTotalLabel ? totalLabel + ' ' + total : total.toString()) : '';
  }
}
