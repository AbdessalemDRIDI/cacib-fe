import { UntypedFormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ConditionEvaluatorService } from './condition-evaluator.service';

describe('ConditionEvaluatorService', () => {
  let service: ConditionEvaluatorService;
  const featureService = jasmine.createSpyObj('featureService', ['evaluateFormula']);
  beforeEach(() => {
    service = new ConditionEvaluatorService();
  });
  describe('#evaluateClientExpression', () => {
    it('should return false in case of empty dependent fields', () => {
      const params = {
        data: {
          firstName: 'Jack',
          code: 1,
          postalCode: 1002,
        },
      };
      const expression = ' ( firstName==="Jack" ) ';
      expect(service.evaluateClientExpression(params, expression, [])).toBeFalsy();
    });

    it('should return false in case of empty params ', () => {
      const expression = ' ( firstName==="Jack" ) ';
      expect(service.evaluateClientExpression({}, expression, ['firstName'])).toBeFalsy();
    });

    it('should return true after evaluating the expression', () => {
      const params = {
        data: {
          firstName: 'Jack',
          code: 1,
          postalCode: 1002,
        },
      };
      const expression = ' ( firstName==="Jack" ) ';
      expect(service.evaluateClientExpression(params, expression, ['firstName'])).toBeTruthy();
    });

    it('should return false after evaluating the expression', () => {
      const params = {
        data: {
          firstName: 'John',
          code: 1,
          postalCode: 1002,
        },
      };
      const expression = ' ( firstName==="Jack" ) ';
      expect(service.evaluateClientExpression(params, expression, ['firstName'])).toBeFalsy();
    });

    it('should return true after evaluating the expression', () => {
      const form = new UntypedFormBuilder().group({
        firstName: ['Jack', []],
      });
      const params = {
        form: form,
      };
      const expression = ' ( firstName==="Jack" ) ';
      expect(service.evaluateClientExpression(params, expression, ['firstName'])).toBeTruthy();
    });

    it('should return false after evaluating the expression', () => {
      const form = new UntypedFormBuilder().group({
        firstName: ['John', []],
      });
      const params = {
        form: form,
      };
      const expression = ' ( firstName==="Jack" ) ';
      expect(service.evaluateClientExpression(params, expression, ['firstName'])).toBeFalsy();
    });
  });
  describe('#evaluateCondition', () => {
    it('should evaluate the client condition', () => {
      const params = {
        data: {
          firstName: 'John',
          code: 1,
          postalCode: 1002,
        },
      };
      const expression = ' ( firstName==="Jack" ) ';
      featureService.evaluateFormula.and.returnValue(of(true));
      spyOn(service, 'evaluateClientExpression');
      service.evaluateCondition(featureService, params, expression);
      expect(service.evaluateClientExpression).toHaveBeenCalled();
    });
  });
});
