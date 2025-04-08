import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Chart } from '@models/charts/chart.model';
import { RGB } from '@models/charts/rgb.model';
import { Series } from '@models/charts/series.model';
import { ProfileService } from '../profile/profile.service';

/**
 * Service to initialize and manage chart options and data for the UI Studio's "Charts" widgets.
 *
 * This class should not be modified directly. Instead, extend it as follows:
 * ```typescript
 * export class MyCustomChartService extends CustomChartService {
 *   ...
 * }
 * ```
 * Then provide your custom service in the `custom-main.ts` file:
 * ```typescript
 * export const CUSTOM_APP_PROVIDERS = [
 *   { provide: CustomChartService, useClass: MyCustomChartService }
 * ]
 * ```
 */

@Injectable({
  providedIn: 'root',
})
export class CustomChartService {
  constructor(
    private datePipe: DatePipe,
    private profileService: ProfileService
  ) {}
  /**
   * Builds the options for the provided chart component
   * @param properties
   * @param chart
   */
  createOptions(properties) {
    const options = {
      plugins: {
        legend: {
          display: properties.showLegend,
          position: properties.legendPosition,
        },
        datalabels: {
          display: properties.showLabels || false,
          formatter: (value, context) => context.chart.data.labels[context.dataIndex],
        },
        title: {
          display: properties.title ? true : false,
          text: properties.title || '',
        },
      },
    };
    if (
      properties.type == 'line-chart' ||
      properties.type == 'mixed-chart' ||
      properties.type == 'multi-line-chart'
    ) {
      options['elements'] = { line: { fill: false } };
    }
    if (
      properties.type === 'doughnut-chart' &&
      (properties.textCenterPlugin || properties.textCenterPlugin === undefined)
    ) {
      options['maintainAspectRatio'] = false;
      options['textCenter'] = properties.centerDoughnutText;
    }
    if (properties.type !== 'pie-chart' && properties.type !== 'doughnut-chart') {
      options['scales'] = {
        xAxes: {
          ticks: {
            display: properties.xLabel, //this will remove only the label
          },
          title: {
            display:
              properties.showXAxisLabel && properties.xAxisLabel && properties.xAxisLabel != ''
                ? properties.showXAxisLabel
                : false,
            text: properties.xAxisLabel || '',
          },
        },
        yAxes: {
          ticks: {
            display: properties.yLabel, //this will remove only the label
          },
          title: {
            display:
              properties.showYAxisLabel && properties.yAxisLabel && properties.yAxisLabel != ''
                ? properties.showYAxisLabel
                : false,
            text: properties.yAxisLabel || '',
          },
        },
      };
    }
    if (properties.title) {
      options['title'] = {
        display: true,
        text: properties.title,
      };
    }
    options['plugins']['textCenterPlugin'] = {
      textCenterPlugin: properties.textCenterPlugin,
    };
    return options;
  }
  /***
   * Initializes the provided chart component
   */
  createChart(chart: Chart) {
    {
      const labels = chart?.xData?.map((elt) => this.getXValue(elt.xValue));
      chart?.series?.forEach((serie) => {
        serie.yData = this.reorderYData(serie.yData, labels);
      });
      return this.addData(chart, labels);
    }
  }
  /**
   * format xValue when it is a date object
   * @param xValue
   */
  getXValue(xValue) {
    if (xValue instanceof Date) {
      return this.datePipe.transform(xValue, this.profileService.getCurrentDateFormat());
    }
    return xValue;
  }
  /**
   * Initializes the chart's data
   * @param chart
   * @param props
   */
  initChartData(chart: Chart, props) {
    return { data: this.createChart(chart), options: this.createOptions(props) };
  }
  /**
   * Reorders the Y axis data
   * @param yDatas
   * @param xDatas
   */
  reorderYData(yDatas: any, xDatas: any[]): any {
    const newYDatas = [];
    yDatas &&
      xDatas.forEach((xData) => {
        const index = Object.keys(yDatas).find(
          (key) => this.getXValue(yDatas[key].xValue) === xData
        );
        if (index) {
          if (yDatas[index].rGB) {
            yDatas[index].rGB = this.retreiveRGB(yDatas[index].rGB);
          }
          newYDatas.push(yDatas[index]);
        }
      });
    return newYDatas;
  }
  /**
   * Returns the RGB colors
   * @param rgb
   */
  retreiveRGB(rgb: RGB): string {
    return 'rgb(' + rgb.red + ',' + rgb.green + ',' + rgb.blue + ')';
  }
  /**
   * Add the data to the provided chart component
   * @param chart
   * @param labels
   */
  addData(chart: Chart, labels: string[]): any {
    const result = {
      labels: labels,
      datasets: [],
    };
    chart?.series?.forEach((serie) => {
      const dataList = [];
      const backgroundColorList = [];
      const yKeys = [];
      yKeys.push(serie.yKey);
      Object.keys(serie.yData).forEach((key) => {
        dataList.push(serie.yData[key].yValue);
        serie.yData[key].rGB ? backgroundColorList.push(serie.yData[key].rGB) : '';
      });
      result.datasets.push({
        label: yKeys,
        data: dataList,
        backgroundColor: backgroundColorList.length
          ? backgroundColorList
          : serie.rGB
            ? this.retreiveRGB(serie.rGB)
            : '',
        type: chart.chartType === 'mixedChart' ? this.retreiveType(serie) : '',
      });
    });
    return result;
  }
  /**
   * Gets the serie's type
   * @param serie
   */
  retreiveType(serie: Series): string {
    switch (serie.seriesType) {
      case 'lineSeries':
        return 'line';
      case 'columnSeries':
        return 'bar';
    }
  }
}
