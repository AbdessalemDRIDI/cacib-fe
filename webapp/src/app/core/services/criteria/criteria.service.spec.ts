import { UntypedFormBuilder } from '@angular/forms';

import { CriteriaService } from './criteria.service';

describe('Service: CriteriaService', () => {
  const form = new UntypedFormBuilder().group({
    civilityState: [null, []],
    civilityStateOperator: [null],
    postalCode: [null, []],
    postalCodeOperator: [null],
    fullName: [null, []],
    fullNameOperator: [null],
    resident: [null, []],
    residentOperator: [null],
    birthDate: [null, []],
    birthDateOperator: [null],
    fromToNumber: [null, []],
    fromToNumberOperator: [null, []],
    fromToDate: [null, []],
    fromToOperator: [null],
    currency: [null, []],
    currencyOperator: [null],
  });
  const keys = 'civilityState,fullName,resident,postalCode,birthDate,fromToDate,currency';
  let service: CriteriaService;
  let value: {};
  beforeEach(() => {
    service = new CriteriaService();
    form.reset();
  });

  describe('#getOperatorValues', () => {
    it('should return the operators for a `string` field', () => {
      expect(service.getOperatorValues('string').length).toBe(4);
    });
    it('should return the operators for a `number` field', () => {
      expect(service.getOperatorValues('number').length).toBe(6);
    });
    it('should return the operators for a `date` field', () => {
      expect(service.getOperatorValues('date').length).toBe(4);
    });
    it('should return the default operators', () => {
      expect(service.getOperatorValues().length).toBe(2);
    });
  });

  describe('#buildCriteria', () => {
    it('should return empty string for an empty form', () => {
      expect(service.buildCriteria(form)).toEqual('');
    });

    it('should calculate the criteria with one field', () => {
      value = {
        civilityState: 'married',
        civilityStateOperator: '==',
      };
      form.patchValue(value);
      expect(service.buildCriteria(form)).toEqual('civilityState  == "married"');
    });

    it('should calculate the criteria with two fields', () => {
      value = {
        civilityState: 'married',
        civilityStateOperator: '==',
        fullName: 'Mark',
        fullNameOperator: '==',
      };
      form.patchValue(value);
      expect(service.buildCriteria(form)).toEqual(
        'civilityState  == "married"&fullName  == "Mark"'
      );
    });

    it('should calculate the criteria with a number field', () => {
      value = {
        postalCode: 147852,
        postalCodeOperator: '>',
      };
      form.patchValue(value);
      expect(service.buildCriteria(form)).toEqual('postalCode > 147852');
    });

    it('should calculate the criteria with a boolean field', () => {
      value = {
        resident: true,
        residentOperator: '==',
      };
      form.patchValue(value);
      expect(service.buildCriteria(form)).toEqual('resident == true');
    });

    it('should calculate the criteria with a date field', () => {
      const date = new Date('Tue Nov 05 2019 00:00:00');
      value = {
        birthDate: date,
        birthDateOperator: '==',
      };
      form.patchValue(value);
      expect(service.buildCriteria(form)).toEqual(`birthDate == "${date.toISOString()}" `);
    });

    it('should calculate the criteria with a fromToDate field', () => {
      const fromToDateFieldTypeArray = ['fromToDate'];
      const fromDate = new Date('Tue Nov 05 2019 00:00:00');
      const toDate = new Date('Tue Nov 07 2019 00:00:00');
      value = {
        fromToDate: [fromDate, toDate],
      };
      form.patchValue(value);
      expect(service.buildCriteria(form, fromToDateFieldTypeArray)).toEqual(
        `fromToDate >= "${fromDate.toISOString()}" & fromToDate <= "${toDate.toISOString()}"`
      );
    });

    it('should calculate the criteria with a fromToDate field having only the from value', () => {
      const fromToDateFieldTypeArray = ['fromToDate'];
      const fromDate = new Date('Tue Nov 05 2019 00:00:00');
      value = {
        fromToDate: [fromDate],
      };
      form.patchValue(value);
      expect(service.buildCriteria(form, fromToDateFieldTypeArray)).toEqual(
        `fromToDate >= "${fromDate.toISOString()}"`
      );
    });
    it('should calculate the criteria with a fromToNumber field', () => {
      const fromTo = ['fromToNumber'];
      const from = 100;
      const to = 5000;
      value = {
        fromToNumber: [from, to],
      };
      form.patchValue(value);
      expect(service.buildCriteria(form, fromTo)).toEqual(
        `fromToNumber >= "${from}" & fromToNumber <= "${to}"`
      );
    });

    it('should append the % to the criteria in case of like operator', () => {
      value = {
        fullName: 'Mark',
        fullNameOperator: '~',
      };
      form.patchValue(value);
      expect(service.buildCriteria(form)).toEqual('fullName  ~ "%Mark%"');
    });

    it('should calculate the criteria in case of relation with one value', () => {
      const currency = {
        code: 1,
        name: 'EURO',
      };
      value = {
        currency: currency,
        currencyOperator: '==',
      };
      form.patchValue(value);
      expect(service.buildCriteria(form)).toEqual('currency == "1"');
    });

    it('should calculate the criteria in case of relation with multiple values', () => {
      const currency1 = {
        code: 1,
        name: 'EURO',
      };
      const currency2 = {
        code: 2,
        name: 'EURO',
      };
      value = {
        currency: [currency1, currency2],
        currencyOperator: '==',
      };
      form.patchValue(value);
      expect(service.buildCriteria(form)).toEqual('currency == "1,2"');
    });
  });

  describe('#buildSearchCriteria', () => {
    it('should return an empty string for an empty form', () => {
      expect(service.buildSearchCriteria('', {}, null)).toEqual('');
    });

    it('should calculate the criteria with one field', () => {
      value = {
        civilityState: [{ value: 'married', matchMode: '==' }],
      };
      form.patchValue(value);
      expect(service.buildSearchCriteria('', value, null)).toEqual('civilityState  == "married"');
    });
  });
});
