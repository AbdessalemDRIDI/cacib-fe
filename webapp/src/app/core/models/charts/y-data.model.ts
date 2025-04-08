import { RGB } from './rgb.model';

/**
 * YData entity class
 */
export class YData {
  /**
   * code simple field
   */
  code?: string;
  /**
   * toolTip simple field
   */
  toolTip?: string;
  /**
   * xValue simple field
   */
  xValue: string;
  /**
   * yValue simple field
   */
  yValue?: number;
  /**
   * type simple field
   */
  type: string;
  /**
   * rGB relation field
   */
  rGB?: RGB;
}
