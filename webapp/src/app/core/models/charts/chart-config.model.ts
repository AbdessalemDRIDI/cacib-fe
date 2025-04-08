import { GraphItem } from './graph-item.model';

/**
 * ChartConfig entity class
 */
export class ChartConfig extends GraphItem {
  /**
   * className simple field
   */
  className: string;
  /**
   * code simple field
   */
  code?: string;
  /**
   * creationDate simple field
   */
  creationDate: Date;
  /**
   * creatorUserId simple field
   */
  creatorUserId: string;
  /**
   * id simple field
   */
  id: number;
  /**
   * identifier simple field
   */
  identifier: string;
  /**
   * title simple field
   */
  title: string;
  /**
   * type simple field
   */
  type: string;
  /**
   * updateDate simple field
   */
  updateDate: Date;
  /**
   * updatorUserId simple field
   */
  updatorUserId: string;
  /**
   * version simple field
   */
  version: number;
  /**
   * chartColorCalculator simple field
   */
  chartColorCalculator?: string;
  /**
   * criteria simple field
   */
  criteria?: string;
  /**
   * maxElements simple field
   */
  maxElements: number;
  /**
   * maxYAxisValue simple field
   */
  maxYAxisValue?: number;
  /**
   * minYAxisValue simple field
   */
  minYAxisValue?: number;
  /**
   * xaxisAggregationFunction simple field
   */
  xaxisAggregationFunction?: string;
  /**
   * xkey simple field
   */
  xkey: string;
  /**
   * ykey simple field
   */
  ykey?: string;
}
