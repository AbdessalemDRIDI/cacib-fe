/**
 * Format file size
 * @param bytes
 */
export function formatSize(bytes) {
  if (bytes == 0) {
    return '0 B';
  }
  let k = 1024,
    dm = 3,
    sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

import { isEmpty } from 'lodash';

/**
 * Get the real value of a formatted number
 * @param value
 * @returns {string}
 */
export function transformToNumber(
  value: number | string,
  groupingSymbol: string,
  decimalSymbol: string,
  chars?: string
): any {
  if (typeof value === 'string' && !isEmpty(value)) {
    value = value.replace(/[\u202F\u00A0&\/\\#+()$~%'":*?<>{}]/g, '');
    value = value.replace(new RegExp(`\\${groupingSymbol}`, 'g'), '');
    value = value.replace(new RegExp(`\\${decimalSymbol}`, 'g'), '.');
    if ((value.match(/[.]/g) || []).length > 1) {
      value = value.replace(/[.]/g, '');
    }
    value = parseFloat(value);
  }
  return value;
}
