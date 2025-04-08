import { Injectable } from '@angular/core';
/**
 * Service to evaluate conditions based on JavaScript expressions.
 * It returns `true` for a valid expression.
 * It uses the Function method to evaluate the expressions rather than the `eval` function for security reasons.
 *
 * This class should not be modified directly. You can provide your own service which should extend the default one as follows:
 * ```
 *  export class MyConditionEvaluatorService extends ConditionEvaluatorService {
 *   ...
 *  }
 * ```
 * And provide your class in the `custom-main.ts` file as follows:
 * ```
 * export const CUSTOM_APP_PROVIDERS = [
 *   { provide: ConditionEvaluatorService, useClass: MyConditionEvaluatorService }
 * ];
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class ConditionEvaluatorService {
  /**
   * Evaluates the condition
   * @param params
   * @param expression
   * @param dependentFields
   * @returns {boolean}
   */
  evaluateCondition(params, expression, dependentFields): boolean {
    return this.evaluateClientExpression(params, expression, dependentFields);
  }
  /**
   * Evaluates the javascript expression
   * @param params
   * @param expression
   * @param dependentFields
   * @returns {boolean}
   */
  evaluateClientExpression(params, expression: string, dependentFields: string[]): boolean {
    const dfm = this.transformArray(params, dependentFields);
    expression = this.transfomExpression(dfm, expression);
    try {
      return Function('"use strict";return ' + expression)();
    } catch (e) {
      return false;
    }
  }
  /**
   * Creates an abject of the dependent fields
   * @param params
   * @param dependentFields
   * @returns {object}
   */
  private transformArray(params, dependentFields: string[]): object {
    const dfMap = {};
    dependentFields.forEach((element) => {
      dfMap[element] = this.getFieldValue(params, element);
    });
    return dfMap;
  }
  /**
   * Retrieves the field value
   * @param params
   * @param element
   * @returns {any}
   */
  private getFieldValue(params, element: string): any {
    return params['form'] && params['form'].controls[element] && params['form'].controls[element]
      ? params['form'].controls[element].value
      : params['data']
        ? params['data'][element]
        : params[element];
  }
  /**
   * Transforms the expression according to the dependent fields
   * @param dfm
   * @param expression
   * @returns {string}
   */
  private transfomExpression(dfm: object, expression: string): string {
    for (const key of Object.keys(dfm)) {
      expression = expression.replace(key, '"' + dfm[key] + '"');
    }
    return expression;
  }
}
