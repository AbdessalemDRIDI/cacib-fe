import { KebabCasePipe } from './kebabcase.pipe';

describe('KebabCasePipe', () => {
  let pipe: KebabCasePipe;

  beforeEach(() => {
    pipe = new KebabCasePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform string to kebab case', () => {
    const inputString = 'Hello World';
    const expectedOutput = 'hello-world';

    const result = pipe.transform(inputString);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle empty string', () => {
    const inputString = '';
    const expectedOutput = '';

    const result = pipe.transform(inputString);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle null input', () => {
    const inputString = null;
    const expectedOutput = '';

    const result = pipe.transform(inputString);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle undefined input', () => {
    const inputString = undefined;
    const expectedOutput = '';

    const result = pipe.transform(inputString);

    expect(result).toEqual(expectedOutput);
  });
});
