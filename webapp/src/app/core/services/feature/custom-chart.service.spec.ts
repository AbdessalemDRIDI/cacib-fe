import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ProfileService } from '../profile/profile.service';
import { CustomChartService } from './custom-chart.service';

describe('ChartJSService', () => {
  const chart: any = {
    chartTitle: '',
    chartType: '',
    xKey: 'Country',
    type: '',
    yAxisLabel: 'Population',
    xAxisLabel: 'Country',
    code: '47',
    xData: [
      {
        xValue: 'Tunisia',
        code: '422',
      },

      {
        xValue: 'USA',
        code: '423',
      },
    ],
    series: [
      {
        code: '79',
        seriesType: 'pieSeries',
        yKey: 'Population',
        donut: false,
        yData: [
          {
            toolTip: '10.7735 M',
            code: '723',
            yValue: 10773500,
            xValue: 'Tunisia',
            rGB: 'rgb(255,255,153)',
          },
          {
            toolTip: '319.707043 M',
            code: '722',
            yValue: 319707043,
            xValue: 'USA',
            rGB: 'rgb(255,153,204)',
          },
        ],
      },
    ],
  };
  const properties = {
    labelField: '',
    legendPosition: 'bottom',
    options: undefined,
    showLegend: true,
    showTotalLabel: true,
    showTotalNumber: true,
    showtitle: true,
    thikness: undefined,
    title: 'Populations per country',
    totalLabel: 'Total: ',
    totalNumberFontSize: '14px',
    type: 'doughnut',
  };

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [DatePipe, ProfileService, { provide: HttpClient, useValue: {} }],
    });
  });

  xdescribe('#ChartJSService', () => {
    it('should Initialize Chart ', () => {
      let datePipe: DatePipe = TestBed.get(DatePipe);
      let profileService: ProfileService = TestBed.get(ProfileService);
      let chartService = new CustomChartService(datePipe, profileService);
      expect(chartService.initChartData(chart, properties));
    });
  });
});
