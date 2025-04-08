import { Series } from './series.model';

import { XData } from './x-data.model';

/**
 * Chart entity class
 */
export class Chart {
  /**
   * chartTitle simple field
   */
  chartTitle?: string;
  /**
   * chartType simple field
   */
  chartType?: string;
  /**
   * code simple field
   */
  code?: string;
  /**
   * xKey simple field
   */
  xKey?: string;
  /**
   * xAxisLabel simple field
   */
  xAxisLabel?: string;
  /**
   * yAxisLabel simple field
   */
  yAxisLabel?: string;
  /**
   * type simple field
   */
  type?: string;
  /**
   * series relation field
   */
  series?: Series[];
  /**
   * xData relation field
   */
  xData?: XData[];
}
