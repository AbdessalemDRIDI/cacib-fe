import { DateFormatPipe } from './date-format.pipe';

describe('DateFormat Pipe', () => {
  let pipe: DateFormatPipe;

  beforeEach(() => {
    pipe = new DateFormatPipe();
  });
  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an empty string in case of empty value', () => {
    expect(pipe.transform('', 'TIMESTAMP')).toBe('');
  });

  it('should return the formatted in case of empty temporaltype', () => {
    expect(pipe.transform('12/12/2019', '')).toBe('12/12/2019');
  });

  it('should return an empty string in case of empty value && empty temporaltype', () => {
    expect(pipe.transform('', '')).toBe('');
  });

  it('should return the formatted date', () => {
    expect(pipe.transform('12/12/2019 00:00:00', 'TIMESTAMP')).toBe('12/12/2019 00:00:00');
  });

  it('should return the formatted date', () => {
    expect(pipe.transform('12/12/2019 00:00:00', 'DATE')).toBe('12/12/2019 00:00:00');
  });

  it('should return the formatted date', () => {
    expect(pipe.transform('12/12/2019', 'TIMESTAMP')).toBe('12/12/2019');
  });

  it('should return the formatted date', () => {
    expect(pipe.transform('12/12/2019', 'DATE')).toBe('12/12/2019');
  });
});
