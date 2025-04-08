import { TestBed } from '@angular/core/testing';
import { CriteriaService } from '@app/core/services/criteria/criteria.service';
import { OperatorPipe } from './operator.pipe';

const stringOperators: any = [
  { label: '==', value: '==' },
  { label: '!=', value: '!=' },
  { label: '~', value: '~' },
  { label: '^', value: '^' },
];

const stringOperatorsClmnFltr: any = [
  { label: '==', value: 'equals' },
  { label: '!=', value: 'notEquals' },
  { label: '~', value: 'contains' },
  { label: '^', value: 'startsWith' },
];

const numberOperators: any = [
  { label: '==', value: '==' },
  { label: '!=', value: '!=' },
  { label: '<', value: '<' },
  { label: '>', value: '>' },
  { label: '<=', value: '<=' },
  { label: '>=', value: '>=' },
];

const numberOperatorsClmnFltr: any = [
  { label: '==', value: 'equals' },
  { label: '!=', value: 'notEquals' },
  { label: '<', value: 'lt' },
  { label: '>', value: 'gt' },
  { label: '<=', value: 'lte' },
  { label: '>=', value: 'gte' },
];

const defaultOperators: any = [
  { label: '==', value: '==' },
  { label: '!=', value: '!=' },
];

const defaultOperatorsClmnFltr: any = [
  { label: '==', value: 'equals' },
  { label: '!=', value: 'notEquals' },
];

const dateOperators: any = [
  { label: '==', value: '==' },
  { label: '!=', value: '!=' },
  { label: '<', value: '<' },
  { label: '>', value: '>' },
];

const dateOperatorsClmnFltr: any = [
  { label: '==', value: 'dateIs' },
  { label: '!=', value: 'dateIsNot' },
  { label: '<', value: 'dateBefore' },
  { label: '>', value: 'dateAfter' },
];

const listOperators: any = [
  { label: '()', value: '()' },
  { label: '!()', value: '!()' },
];

const listOperatorsClmnFltr: any = [
  { label: '()', value: undefined },
  { label: '!()', value: undefined },
];

describe('OperatorPipe', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [CriteriaService],
    });
  });

  describe('#transform ', () => {
    it('should return the formatted data without columnFilter ', () => {
      const criteriaService: CriteriaService = TestBed.get(CriteriaService);
      const pipe = new OperatorPipe(criteriaService);
      expect(pipe.transform([], '', false)).toEqual(defaultOperators);
      expect(pipe.transform([], 'number', false)).toEqual(numberOperators);
      expect(pipe.transform([], 'string', false)).toEqual(stringOperators);
      expect(pipe.transform([], 'text', false)).toEqual(stringOperators);
      expect(pipe.transform([], 'date', false)).toEqual(dateOperators);
      expect(pipe.transform([], 'multiselect', false)).toEqual(listOperators);
      expect(pipe.transform([], 'togglebuttonMultipleSeletion', false)).toEqual(listOperators);
    });

    it('should return the formatted data with  columnFilter ', () => {
      const criteriaService: CriteriaService = TestBed.get(CriteriaService);
      const pipe = new OperatorPipe(criteriaService);
      expect(pipe.transform([], '', true)).toEqual(defaultOperatorsClmnFltr);
      expect(pipe.transform([], 'number', true)).toEqual(numberOperatorsClmnFltr);
      expect(pipe.transform([], 'string', true)).toEqual(stringOperatorsClmnFltr);
      expect(pipe.transform([], 'text', true)).toEqual(stringOperatorsClmnFltr);
      expect(pipe.transform([], 'date', true)).toEqual(dateOperatorsClmnFltr);
      expect(pipe.transform([], 'multiselect', true)).toEqual(listOperatorsClmnFltr);
      expect(pipe.transform([], 'togglebuttonMultipleSeletion', true)).toEqual(
        listOperatorsClmnFltr
      );
    });
  });
});
