import { YData } from './y-data.model';

import { YDataProperties } from './y-data-properties.model';

import { RGB } from './rgb.model';

/**
 * Series entity class
 */
export class Series {
  /**
   * code simple field
   */
  code?: string;
  /**
   * donut simple field
   */
  donut?: boolean;
  /**
   * originalYKey simple field
   */
  originalYKey?: string;
  /**
   * realValue simple field
   */
  realValue?: string;
  /**
   * seriesType simple field
   */
  seriesType?: string;
  /**
   * title simple field
   */
  title?: string;
  /**
   * yKey simple field
   */
  yKey?: string;
  /**
   * type simple field
   */
  type?: string;
  /**
   * yData relation field
   */
  yData?: { [key: string]: YData };
  /**
   * yDataProperties relation field
   */
  yDataProperties?: { [key: string]: YDataProperties };
  /**
   * rGB relation field
   */
  rGB?: RGB;
}
