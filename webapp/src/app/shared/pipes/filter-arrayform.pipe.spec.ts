import { ArrayFormFilterPipe } from './filter-arrayform.pipe';

const arrayJson = [
  {
    value: {
      relation1String: 'Mali',
    },
    name: 'lorem',
  },
];
const resArrayJson = [
  {
    value: {
      relation1String: 'Mali',
    },
    name: 'lorem',
  },
];

describe('ArrayFormFilterPipe', () => {
  let pipe: ArrayFormFilterPipe;
  beforeEach(() => {
    pipe = new ArrayFormFilterPipe();
  });

  it('should return the formatted data in case of different value', () => {
    expect(pipe.transform(arrayJson, 'relation1String', 'Mali')).toEqual(resArrayJson);
    expect(pipe.transform(arrayJson, '', '')).toEqual(arrayJson);
    expect(pipe.transform(null, '', '')).toEqual([]);
  });
});
