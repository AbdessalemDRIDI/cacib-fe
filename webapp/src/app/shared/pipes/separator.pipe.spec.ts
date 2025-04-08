import { SeparatorPipe } from './separator.pipe';

describe('SeparatorPipe', () => {
  let pipe: SeparatorPipe;

  beforeEach(() => {
    pipe = new SeparatorPipe();
  });

  it('should return an empty string in case of empty value', () => {
    expect(pipe.transform('', '')).toEqual('');
  });

  it('should return an undefined in case of null value', () => {
    expect(pipe.transform(null, '')).toEqual(undefined);
  });

  it('should return an string in case of number value', () => {
    expect(pipe.transform(123, '')).toEqual('123');
  });
});
