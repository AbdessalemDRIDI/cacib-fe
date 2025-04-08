import { DatePrecision } from './date';

describe('Format date or time with precsion', () => {
  const dateFormats = [
    'dd/MM/yyyy HH:mm:ss:SSS',
    'yyyy/MM/dd HH:mm:ss:SSS',
    'yyyy/dd/MM HH:mm:ss:SSS',
    'dd/MM/yyyy',
  ];

  const msPrecisionFormat = 'dd/MM/yyyy HH:mm:ss:SSS';
  const sPrecisionFormat = 'dd/MM/yyyy HH:mm:ss';
  const mtePrecisionFormat = 'dd/MM/yyyy HH:mm';
  const hPrecisionFormat = 'dd/MM/yyyy HH';
  const dayPrecisionFormats = [
    'dd/MM/yyyy HH:mm:ss:SSS',
    'yyyy/MM/dd HH:mm:ss:SSS',
    'yyyy/dd/MM HH:mm:ss:SSS',
  ];
  const monthPrecisionFormats = ['MM/yyyy', 'yyyy/MM', 'yyyy/MM'];
  const yearPrecisionFormat = 'yyyy';
  const incorrectPrecision = 'incorrect';

  it('Format ' + dateFormats[0] + ' with an incorrect Precision', () => {
    expect(
      DatePrecision.getFormatAccordingToPrecisions(dateFormats[0], incorrectPrecision)
    ).toEqual(dateFormats[0]);
  });

  it('Format undefined with any Precision', () => {
    expect(DatePrecision.getFormatAccordingToPrecisions(undefined, undefined)).not.toBeDefined();
  });

  it('Format ' + dateFormats[0] + ' with a Precision = undefined', () => {
    expect(DatePrecision.getFormatAccordingToPrecisions(dateFormats[0], undefined)).toEqual(
      dateFormats[0]
    );
  });

  /**
   * dd/MM/yyyy HH:mm:ss:SSS
   */
  it('Format ' + dateFormats[0] + ' with a Precision = MILLISECOND', () => {
    expect(
      DatePrecision.getFormatAccordingToPrecisions(
        dateFormats[0],
        DatePrecision.MILLISECOND.toString()
      )
    ).toEqual(msPrecisionFormat);
  });

  it('Format ' + dateFormats[0] + ' with a Precision = SECOND', () => {
    expect(
      DatePrecision.getFormatAccordingToPrecisions(dateFormats[0], DatePrecision.SECOND.toString())
    ).toEqual(sPrecisionFormat);
  });

  it('Format ' + dateFormats[0] + ' with a Precision = MINUTE', () => {
    expect(
      DatePrecision.getFormatAccordingToPrecisions(dateFormats[0], DatePrecision.MINUTE.toString())
    ).toEqual(mtePrecisionFormat);
  });

  it('Format ' + dateFormats[0] + ' with a Precision = HOUR', () => {
    expect(
      DatePrecision.getFormatAccordingToPrecisions(dateFormats[0], DatePrecision.HOUR.toString())
    ).toEqual(hPrecisionFormat);
  });

  it('Format ' + dateFormats[0] + ' with a Precision = DAY', () => {
    expect(
      DatePrecision.getFormatAccordingToPrecisions(dateFormats[0], DatePrecision.DAY.toString())
    ).toEqual(dayPrecisionFormats[0]);
  });

  it('Format ' + dateFormats[0] + ' with a Precision = MONTH', () => {
    expect(
      DatePrecision.getFormatAccordingToPrecisions(dateFormats[0], DatePrecision.MONTH.toString())
    ).toEqual(monthPrecisionFormats[0]);
  });

  it('Format ' + dateFormats[0] + ' with a Precision = YEAR', () => {
    expect(
      DatePrecision.getFormatAccordingToPrecisions(dateFormats[0], DatePrecision.YEAR.toString())
    ).toEqual(yearPrecisionFormat);
  });

  /**
   * yyyy/MM/dd HH:mm:ss:SSS
   */
  it('Format ' + dateFormats[1] + ' with a Precision = DAY', () => {
    expect(
      DatePrecision.getFormatAccordingToPrecisions(dateFormats[1], DatePrecision.DAY.toString())
    ).toEqual(dayPrecisionFormats[1]);
  });

  it('Format ' + dateFormats[1] + ' with a Precision = MONTH', () => {
    expect(
      DatePrecision.getFormatAccordingToPrecisions(dateFormats[1], DatePrecision.MONTH.toString())
    ).toEqual(monthPrecisionFormats[1]);
  });

  it('Format ' + dateFormats[1] + ' with a Precision = YEAR', () => {
    expect(
      DatePrecision.getFormatAccordingToPrecisions(dateFormats[1], DatePrecision.YEAR.toString())
    ).toEqual(yearPrecisionFormat);
  });

  /**
   * yyyy/dd/MM HH:mm:ss:SSS
   */
  it('Format ' + dateFormats[2] + ' with a Precision = DAY', () => {
    expect(
      DatePrecision.getFormatAccordingToPrecisions(dateFormats[2], DatePrecision.DAY.toString())
    ).toEqual(dayPrecisionFormats[2]);
  });

  it('Format ' + dateFormats[2] + ' with a Precision = MONTH', () => {
    expect(
      DatePrecision.getFormatAccordingToPrecisions(dateFormats[2], DatePrecision.MONTH.toString())
    ).toEqual(monthPrecisionFormats[2]);
  });

  it('Format ' + dateFormats[2] + ' with a Precision = YEAR', () => {
    expect(
      DatePrecision.getFormatAccordingToPrecisions(dateFormats[2], DatePrecision.YEAR.toString())
    ).toEqual(yearPrecisionFormat);
  });

  /**
   * dd/MM/yyyy HH:mm:ss:SSS
   */
  it('Format ' + dateFormats[3] + ' with a Precision = MILLISECOND', () => {
    expect(
      DatePrecision.getFormatAccordingToPrecisions(
        dateFormats[3],
        DatePrecision.MILLISECOND.toString()
      )
    ).toEqual(dateFormats[3]);
  });

  it('Format ' + dateFormats[3] + ' with a Precision = SECOND', () => {
    expect(
      DatePrecision.getFormatAccordingToPrecisions(dateFormats[3], DatePrecision.SECOND.toString())
    ).toEqual(dateFormats[3]);
  });

  it('Format ' + dateFormats[3] + ' with a Precision = MINUTE', () => {
    expect(
      DatePrecision.getFormatAccordingToPrecisions(dateFormats[3], DatePrecision.MINUTE.toString())
    ).toEqual(dateFormats[3]);
  });

  it('Format ' + dateFormats[3] + ' with a Precision = HOUR', () => {
    expect(
      DatePrecision.getFormatAccordingToPrecisions(dateFormats[3], DatePrecision.HOUR.toString())
    ).toEqual(dateFormats[3]);
  });

  it('Format ' + dateFormats[3] + ' with a Precision = DAY', () => {
    expect(
      DatePrecision.getFormatAccordingToPrecisions(dateFormats[3], DatePrecision.DAY.toString())
    ).toEqual(dateFormats[3]);
  });

  it('Format ' + dateFormats[3] + ' with a Precision = MONTH', () => {
    expect(
      DatePrecision.getFormatAccordingToPrecisions(dateFormats[3], DatePrecision.MONTH.toString())
    ).toEqual(monthPrecisionFormats[0]);
  });

  it('Format ' + dateFormats[3] + ' with a Precision = YEAR', () => {
    expect(
      DatePrecision.getFormatAccordingToPrecisions(dateFormats[3], DatePrecision.YEAR.toString())
    ).toEqual(yearPrecisionFormat);
  });
});
