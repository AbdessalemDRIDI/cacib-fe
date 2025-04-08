/* tslint:disable:no-namespace max-line-length */
/**
 * DateType Enumeration
 *
 */
export enum DateType {
  TIME_STAMP = 'TIMESTAMP',
  DATE = 'DATE',
  TIME = 'TIME',
}
/**
 * DatePrecision Enumaration
 *
 */
export enum DatePrecision {
  MILLISECOND = 'millisecond',
  SECOND = 'second',
  MINUTE = 'minute',
  HOUR = 'hour',
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
}
/**
 * Map data of Angular standard date format to primeNG
 */
export const angularToPrimeNgDateFormatMap = {
  yyyy: '$yy',
  yy: 'y',
  MMM: '$M',
  MM: 'mm',
  M: 'm',
  EEEE: 'DD',
  EEE: 'D',
};
/**
 * Static methods for the DatePrecision Enum
 *
 */
export namespace DatePrecision {
  /**
   * Returns the date format according to the precision
   *
   * @param format : string
   *           the date format
   * @param precision :string
   *           the date precision
   *
   * @returns string
   */
  export function getFormatAccordingToPrecisions(format: string, precision: string): string {
    if (!format) {
      return undefined;
    }

    switch (precision) {
      case DatePrecision.MILLISECOND:
        return format;

      case DatePrecision.SECOND:
        return format.indexOf('ss') > -1
          ? format.substring(0, format.lastIndexOf('ss') + 2)
          : format;

      case DatePrecision.MINUTE:
        return format.indexOf('mm') > -1
          ? format.substring(0, format.lastIndexOf('mm') + 2)
          : format;

      case DatePrecision.HOUR:
        return format.indexOf('HH') > -1
          ? format.substring(0, format.lastIndexOf('HH') + 2)
          : format;

      case DatePrecision.DAY:
        return format;

      case DatePrecision.MONTH:
        if (format.indexOf(' ') > -1) {
          format = format.substring(0, format.lastIndexOf(' '));
        }

        const dateSeparators = format.replace(/[(A-Z)|(a-z)]*/g, '');
        const dateSeparator = dateSeparators && dateSeparators.length > 0 ? dateSeparators[0] : ''; // to be verified

        if (format.indexOf('dd') === 0) {
          format = format.substring(3, format.length);
        } else if (format.indexOf('dd' + dateSeparator) > -1) {
          format = format.replace('dd' + dateSeparator, '');
        } else if (format.indexOf(dateSeparator + 'dd') > -1) {
          format = format.substring(0, format.lastIndexOf(dateSeparator + 'dd'));
        }

        return format;

      case DatePrecision.YEAR:
        return format.replace(/[^|(y|Y)]+/g, '');

      default:
        return format;
    }
  }
  /**
   * Convert Angular Date format to primeNG
   * @param formatValue
   * @returns
   */
  export function convertToPrimeNgDateFormat(formatValue) {
    for (const [key, value] of Object.entries(angularToPrimeNgDateFormatMap)) {
      if (formatValue.includes(key) && formatValue[formatValue.indexOf(key) - 1] !== '$') {
        formatValue = formatValue.replace(key, value);
      }
    }
    return formatValue?.replaceAll('$', '');
  }
}
// tslint:disable-next-line:max-line-length
export const PATTERN_ISO8601 =
  /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
