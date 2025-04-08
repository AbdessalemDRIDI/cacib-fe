import { ChartJSService } from './chart-js-service';

describe('ChartJSService', () => {
  let chartService: ChartJSService, mockedChartService;
  const defaultColor = [
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

  //Input Json Data

  const palmyraJson = {
    xKey: 'Country',
    xData: [
      {
        xValue: 'Tunisia',
        code: '422',
      },
      {
        xValue: 'France',
        code: '421',
      },
    ],
    series: [
      {
        yKey: 'Population',
        donut: false,
        yData: [
          {
            toolTip: '319.707043 M',
            yValue: 319707043,
            xValue: 'USA',
          },
        ],
      },
    ],
  };

  const flatJson = {
    Oscar: 20,
    Baker: 58,
    Amanda: 69,
    Montoya: 10,
    Catherine: 5,
  };

  const arrayJson = [
    {
      location: {
        name: 'Mali',
        utc_offset: '-4.0',
      },
      current: {
        observation_time: '09:42 PM',
        id: 20,
        temperature: 75,
      },
    },

    {
      location: {
        name: 'Egypt',
        country: 'United States of America',
      },
      current: {
        temperature: 9,
      },
    },
    {
      location: {
        name: 'Italy',
      },
      current: {
        temperature: 30,
      },
    },
  ];

  const objectJson = {
    products: [
      {
        id: 1,
        title: 'iPhone 9',
        stock: 94,
        payload: {
          id: 20,
          user: {
            name: 'john',
          },
        },
      },
      {
        title: 'iPhone X',
        stock: 34,
      },
      {
        id: 3,
        title: 'Samsung Universe 9',
        stock: 36,
      },
    ],
    total: 100,
  };

  const palmyraChartJsData = {
    labels: ['Tunisia', 'France', 'USA'],
    datasets: [
      {
        label: ['Population'],
        data: [10773500, 66417590, 319707043],
        backgroundColor: [],
        type: '',
      },
    ],
  };

  const flatChartJsData = {
    labels: ['React', 'Vue', 'Angular', 'Svelte', 'Emberjs', 'Backbonejs'],
    datasets: [
      {
        backgroundColor: [],
        label: '',
        data: [185134, 195514, 80460, 57022, 22165, 27862],
      },
    ],
  };

  const arrayChartJsData = {
    labels: ['New York', 'Verginia', 'New Mexico', 'Arizona', 'North Dakota'],
    datasets: [
      {
        backgroundColor: [],
        label: '',
        data: [23, 20, 30, 29, 36],
      },
    ],
  };

  const objectChartJsData = {
    labels: [
      'iPhone 9',
      'iPhone X',
      'Samsung Universe 9',
      'OPPOF19',
      'Huawei P30',
      'MacBook Pro',
      'Samsung Galaxy Book',
      'Microsoft Surface Laptop 4',
      'Infinix INBOOK',
      'HP Pavilion 15-DK1056WM',
      'Key Holder',
    ],
    datasets: [
      {
        backgroundColor: [],
        label: '',
        data: [94, 34, 36, 123, 32, 83, 50, 68, 96, 89, 54],
      },
    ],
  };

  const palmyraJsonForchartJsOptions = {
    labelField: '',
    legendPosition: 'top',
    options: undefined,
    showLegend: true,
    showTotalLabel: true,
    showTotalNumber: true,
    showtitle: true,
    thikness: undefined,
    title: 'Palmyra',
    totalLabel: 'Total: ',
    totalNumberFontSize: '14px',
    type: 'pie',
    value: palmyraJson,
    chartJsData: palmyraChartJsData,
  };

  const arrayJsonForchartJsOptions = {
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
    value: arrayJson,
    chartJsData: arrayChartJsData,
  };

  const objectJsonForchartJsOptions = {
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
    value: objectJson,
    chartJsData: objectChartJsData,
  };

  const flatJsonForchartJsOptions = {
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
    value: flatJson,
    chartJsData: flatChartJsData,
  };
  const stacked = false;
  beforeEach(async () => {
    mockedChartService = jasmine.createSpyObj('mockedChartService', [
      'getOptions',
      'getDoughnutTextCenter',
      'isPalmyraResponse',
      'getBackgroundColors',
      'getLabels',
      'getDataFromPath',
      'getDataSetValues',
    ]);
    chartService = new ChartJSService(mockedChartService);
  });

  describe('#getOptions', () => {
    it('should return a chartJsOptions when an Array Json object is provided as input', () => {
      const resForArrayJson = {
        cutout: undefined,
        scales: undefined,
        textCenter: arrayJsonForchartJsOptions.type === 'doughnut' ? 'Total:  138' : undefined,
        totalNumberFontSize: '14px',
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Populations per country',
          },
        },
        responsive: true,
        parsing: {
          key: undefined,
          xAxisKey: undefined,
          yAxisKey: undefined,
        },
      };
      expect(chartService.getOptions(arrayJsonForchartJsOptions, stacked)).toEqual(resForArrayJson);
    });

    it('should return a chartJsOptions when an Object Json is provided as input', () => {
      const resForObjectJson = {
        cutout: undefined,
        scales: undefined,
        textCenter: objectJsonForchartJsOptions.type === 'doughnut' ? 'Total:  759' : undefined,
        totalNumberFontSize: '14px',
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Populations per country',
          },
        },
        responsive: true,
        parsing: {
          key: undefined,
          xAxisKey: undefined,
          yAxisKey: undefined,
        },
      };
      expect(chartService.getOptions(objectJsonForchartJsOptions, stacked)).toEqual(
        resForObjectJson
      );
    });

    it('should return a chartJsOptions when a flat Json object is provided as input', () => {
      const resForFlatJson = {
        cutout: undefined,
        scales: undefined,
        textCenter: flatJsonForchartJsOptions.type === 'doughnut' ? 'Total:  568157' : undefined,
        totalNumberFontSize: '14px',
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Populations per country',
          },
        },
        responsive: true,
        parsing: {
          key: undefined,
          xAxisKey: undefined,
          yAxisKey: undefined,
        },
      };
      expect(chartService.getOptions(flatJsonForchartJsOptions, stacked)).toEqual(resForFlatJson);
    });

    it('should return a chartJsOptions when a palmyra Json object is provided as input', () => {
      const resForPalmyraJson = {
        cutout: undefined,
        scales: undefined,
        textCenter: palmyraJsonForchartJsOptions.type === 'doughnut' ? 'Total:  3' : undefined,
        totalNumberFontSize: '14px',
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Palmyra',
          },
        },
        responsive: true,
        parsing: {
          key: undefined,
          xAxisKey: undefined,
          yAxisKey: undefined,
        },
      };
      expect(chartService.getOptions(palmyraJsonForchartJsOptions, stacked)).toEqual(
        resForPalmyraJson
      );
    });
  });

  describe('#getDoughnutTextCenter', () => {
    it('should return the textCenter of doughnut chart when a flat Json object is provided as input', () => {
      const DoughnutFlatJson = 'Total:' + ' ' + 568157;
      expect(chartService.getDoughnutTextCenter(flatChartJsData, true, true, 'Total:')).toEqual(
        DoughnutFlatJson
      );
      expect(chartService.getDoughnutTextCenter(flatChartJsData, true, false, '')).toEqual(
        '568157'
      );
      expect(chartService.getDoughnutTextCenter(flatChartJsData, false, true, '')).toEqual('');
      expect(chartService.getDoughnutTextCenter(flatChartJsData, false, false, '')).toEqual('');
    });

    it('should return the textCenter of doughnut chart when an Array Json object is provided as input', () => {
      const DoughnutArrayJson = 'Total:' + ' ' + 138;
      expect(chartService.getDoughnutTextCenter(arrayChartJsData, true, true, 'Total:')).toEqual(
        DoughnutArrayJson
      );
      expect(chartService.getDoughnutTextCenter(arrayChartJsData, true, false, '')).toEqual('138');
      expect(chartService.getDoughnutTextCenter(arrayChartJsData, false, true, '')).toEqual('');
      expect(chartService.getDoughnutTextCenter(arrayChartJsData, false, false, '')).toEqual('');
    });

    it('should return the textCenter of doughnut chart when an Object Json is provided as input', () => {
      const DoughnutObjectJson = 'Total:' + ' ' + 759;
      expect(chartService.getDoughnutTextCenter(objectChartJsData, true, true, 'Total:')).toEqual(
        DoughnutObjectJson
      );
      expect(chartService.getDoughnutTextCenter(objectChartJsData, true, false, '')).toEqual('759');
      expect(chartService.getDoughnutTextCenter(objectChartJsData, false, true, '')).toEqual('');
      expect(chartService.getDoughnutTextCenter(objectChartJsData, false, false, '')).toEqual('');
    });
  });

  describe('#getDataSetValues', () => {
    it('should return a list of numbers when a flat Json object is provided as input', () => {
      const resOfFlatJson = [20, 58, 69, 10, 5];
      expect(chartService.getDataSetValues(flatJson, '')).toEqual(resOfFlatJson);
      expect(chartService.getDataSetValues(flatJson, 'lorem ipsum')).toEqual(resOfFlatJson);
    });

    it('should return a list of numbers when an Array Json object is provided as input', () => {
      const resOfForArrayJson = [75, 9, 30];
      expect(chartService.getDataSetValues(arrayJson, 'current.temperature')).toEqual(
        resOfForArrayJson
      );
      expect(chartService.getDataSetValues(arrayJson, '')).toEqual([]);
    });

    it('should return a list of numbers when an Object Json is provided as input', () => {
      const resOfObjectJson = [94, 34, 36];
      expect(chartService.getDataSetValues(objectJson, 'products.stock')).toEqual(resOfObjectJson);
      expect(chartService.getDataSetValues(objectJson, '')).toEqual([]);
    });

    it('should return true of the provided JSON object is compliant with Palmyra Charts API contract', () => {
      expect(chartService.isPalmyraResponse(palmyraJson)).toBe(true);
    });
  });

  describe('#getLabels', () => {
    const resOfFlatJson = ['Oscar', 'Baker', 'Amanda', 'Montoya', 'Catherine'];
    it('should return a list of string when a flat JSON object is provided as input', () => {
      expect(chartService.getLabels(flatJson, '')).toEqual(resOfFlatJson);
      expect(chartService.getLabels(flatJson, 'lorem ipsum')).toEqual(resOfFlatJson);
    });

    it('should return a list of string when an Object JSON is provided as input', () => {
      const resOfObjectJson = ['iPhone 9', 'iPhone X', 'Samsung Universe 9'];
      expect(chartService.getLabels(objectJson, 'products.title')).toEqual(resOfObjectJson);
      expect(chartService.getLabels(objectJson, '')).toEqual([]);
    });

    it('should return a list of string when an ARRAY Json object is provided as input', () => {
      const resOfForArrayJson = ['Mali', 'Egypt', 'Italy'];
      expect(chartService.getLabels(arrayJson, 'location.name')).toEqual(resOfForArrayJson);
      expect(chartService.getLabels(arrayJson, '')).toEqual([]);
    });
  });

  describe('#getBackgroundColors ', () => {
    it('should return undefined when the type is empty', () => {
      expect(chartService.getBackgroundColors('')).toEqual(undefined);
    });
    it('should return undefined when the type is null', () => {
      expect(chartService.getBackgroundColors(null)).toEqual(undefined);
    });
    it(' should return list of colors when the type is radar', () => {
      expect(chartService.getBackgroundColors('radar')).toEqual(defaultColor);
    });
    it(' should return list of colors when the type is polarArea', () => {
      expect(chartService.getBackgroundColors('polarArea')).toEqual(defaultColor);
    });
  });

  describe('#isPalmyraResponse', () => {
    it('should return false when an empty object is provided', () => {
      expect(chartService.isPalmyraResponse({})).toBeFalsy();
    });
    it('should return false when xData is empty', () => {
      expect(chartService.isPalmyraResponse({ series: 'Lorem ipsum' })).toBeFalsy();
    });
    it('should return false when series is empty ', () => {
      expect(chartService.isPalmyraResponse({ xData: 'Lorem ipsum' })).toBeFalsy();
    });
    it('should return true when xData && series are not empty', () => {
      expect(
        chartService.isPalmyraResponse({ series: 'Lorem ipsum', xData: 'Lorem ipsum' })
      ).toBeTruthy();
    });
  });
});
