import { Injectable } from '@angular/core';
import { camelCase, isBoolean, isDate, isEmpty, isNumber } from 'lodash';
/**
 * Service to build and return a criteria expression from the "SearchInput" screen.
 * The criteria expression is used as a query parameter and can be used as input to REST services.
 * The criteria is built with parameters, values, and operators, for example:
 * `fullName=='Bruno' && age <= 50`
 *
 * This class should not be modified directly. You can provide your own service which should extend the default one as follows:
 * ```
 * export class MyCriteriaService extends CriteriaService {
 *   ...
 * }
 * ```
 * And provide your class in the `custom-main.ts` file as follows:
 * ```
 * export const CUSTOM_APP_PROVIDERS = [
 *   { provide: CriteriaService, useClass: MyCriteriaService }
 * ];
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class CriteriaService {
  /**
   * Possible values of the number operator
   */
  protected numberOperators = ['==', '!=', '<', '>', '<=', '>='];
  /**
   * Possible values of the date operator
   * */
  protected dateOperators = ['==', '!=', '<', '>'];
  /**
   * Possible values of the string operator
   * */
  protected stringOperators = ['==', '!=', '~', '^'];
  /**
   * Possible values of the default operator
   * */
  protected defaultOperators = ['==', '!='];
  /**
   *  Possible values of  multiSelect and toggleButton operator
   * */
  protected listOperators = ['()', '!()'];
  /**
   * Map column filter operator
   */
  protected opratorMap = {
    equals: '==',
    notEquals: '!=',
    contains: '~',
    lt: '<',
    gt: '>',
    lte: '<=',
    gte: '>=',
    startsWith: '^',
  };
  protected opratorMapDate = {
    dateIs: '==',
    dateIsNot: '!=',
    dateBefore: '<',
    dateAfter: '>',
  };
  /**
   * Returns the operator's possible values used in the SearchInput screen
   * @param type
   * @param inColumnFilter
   * @returns {Array}
   */
  getOperatorValues(type?: string, inColumnFilter?: boolean): string[] {
    let result;
    switch (type) {
      case 'number':
        result = this.numberOperators;
        break;
      case 'date':
        result = this.dateOperators;
        break;
      case 'text':
      case 'string':
        result = this.stringOperators;
        break;
      case 'togglebuttonMultipleSeletion':
      case 'multiselect':
        result = this.listOperators;
        break;
      default:
        result = this.defaultOperators;
    }
    return result.map((item) => {
      return {
        label: item,
        value: inColumnFilter
          ? this.getKeyByValue(type === 'date' ? this.opratorMapDate : this.opratorMap, item)
          : item,
      };
    });
  }
  /**
   *
   * @param object
   * @param value
   * @returns
   */
  getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }
  /**
   * Retrieves the criteria to send to the server
   * @param form
   * @param keys
   * @param fromToDateFieldTypeArray
   * @returns {string}
   */
  buildCriteria(form: any, fromToDateFieldTypeArray?: string[], keys?: string): string {
    let criteria: string[] = [];
    const formKeys = Object.keys(form.controls).filter((key) => !key.endsWith('Operator'));
    formKeys &&
      formKeys.forEach((item) => {
        const controlName = camelCase(item);
        if (form.get(controlName)) {
          const keyValue = form.get(controlName).value;
          const operatorValue =
            form.get(controlName.concat('Operator')) &&
            form.get(controlName.concat('Operator')).value !== null
              ? form.get(controlName.concat('Operator')).value
              : form.get(controlName.concat('DefaultOperator')) &&
                  form.get(controlName.concat('DefaultOperator')).value !== null
                ? form.get(controlName.concat('DefaultOperator')).value
                : '==';
          if (
            keyValue !== undefined &&
            keyValue !== null &&
            (isNumber(keyValue) || isDate(keyValue) || isBoolean(keyValue) || !isEmpty(keyValue))
          ) {
            const subCriteria = this.getCriteria(
              isEmpty(keys) ? item : this.getCriteriaKey(`${keys},${formKeys.join(',')}`, item),
              keyValue,
              operatorValue,
              fromToDateFieldTypeArray
            );
            if (!isEmpty(subCriteria)) {
              criteria.push(subCriteria);
            }
          }
        }
      });
    return criteria.join('&');
  }
  /**
   * Gets the real key from the flat key passed as parameter
   * @param keys
   * @param flatKey
   * @returns
   */
  private getCriteriaKey(keys, flatKey) {
    return keys.split(',').find((item) => flatKey === camelCase(item.split('.').join(' ')));
  }
  /**
   * Retireves the criteria depending on the field type
   * @param key
   * @param value
   * @param operatorValue
   * @param fromToFieldTypeArray
   * @returns {string}
   */
  private getCriteria(
    key: string,
    value: any,
    operatorValue: string,
    fromToFieldTypeArray?: string[]
  ): string {
    if (value !== undefined && value !== null) {
      if (
        fromToFieldTypeArray &&
        fromToFieldTypeArray.includes(key) &&
        (value
          .toString()
          .split(',')
          .every((element) => isDate(element)) ||
          isNaN(Number(value)))
      ) {
        return this.getFromToCriteria(value, key, fromToFieldTypeArray);
      }
      if (isDate(value)) {
        return `${key} ${operatorValue} "${value.toISOString()}" `;
      }
      if (!isNaN(Number(value))) {
        const likeOperator = '%';
        switch (operatorValue) {
          case '~':
            return `${key} ${operatorValue} "${likeOperator}${value}${likeOperator}"`;
          case '^':
            return `${key}~"${value}${likeOperator}"`;
          default:
            return `${key} ${operatorValue} ${value}`;
        }
      }
      if (typeof value === 'boolean') {
        return `${key} ${operatorValue} ${value}`;
      }
      if (typeof value === 'string') {
        const likeOperator = '%';
        switch (operatorValue) {
          case '~':
            return `${key}  ${operatorValue} "${likeOperator}${value}${likeOperator}"`;
          case '^':
            return `${key}~"${value}${likeOperator}"`;
          default:
            return `${key}  ${operatorValue} "${value}"`;
        }
      }
      if (typeof value === 'object' && (value.code || value.id)) {
        return value.code
          ? `${key} ${operatorValue} "${value.code}"`
          : `${key} ${operatorValue} "${value.id}"`;
      }
      if (Array.isArray(value) && value.length > 0) {
        let filter =
          operatorValue === '!()'
            ? `! (KEY ${key}  IN "`
            : operatorValue === '()'
              ? `KEY ${key}  IN "`
              : `${key} ${operatorValue} "`;
        filter = filter
          .concat(
            value
              .map((item) => {
                return item.code ? item.code : item;
              })
              .join(`${operatorValue === '!()' || operatorValue === '()' ? '","' : ','}`)
          )
          .concat(`${operatorValue === '!()' ? '")' : operatorValue === '()' ? '"' : `"`}`);
        return filter;
      }
    }
    return '';
  }
  /**
   * Retrieves the criteria in case of fromTo date
   * @param value
   * @param key
   * @param fromToDateFieldTypeArray
   * @returns {string}
   */
  private getFromToCriteria(value: any, key: string, fromToDateFieldTypeArray) {
    let criteria = '';
    if (value) {
      if (value[0] !== value[1]) {
        if (fromToDateFieldTypeArray.includes(key)) {
          criteria = criteria.concat(this.getSubCriteria(value[0], '>=', key));
          if (value[1] && value[1] !== null) {
            criteria = criteria !== '' ? criteria.concat(' & ') : criteria;
            criteria = criteria.concat(this.getSubCriteria(value[1], '<=', key));
          }
        }
      } else {
        criteria = criteria.concat(this.getSubCriteria(value[0], '==', key));
      }
    }

    return criteria;
  }

  /**
   * Calculates the date criteria
   * @param value
   * @param operator
   * @param key
   * @returns {string}
   */
  private getSubCriteria(value: any, operator: string, key: string) {
    if (value || value >= 0) {
      return `${key} ${operator} "${(!isDate(value) && !isNaN(Number(value))) || typeof value === 'string' ? value : value.toISOString()}"`;
    }
    return '';
  }

  /**
   * Calculates the columnFilter criteria
   * @param filters
   * @param fromToCriteriaFields
   * @returns {string}
   */
  protected parseCriteria(filters, fromToCriteriaFields) {
    let result = [];
    filters &&
      Object.keys(filters).map((key) => {
        const criteria = filters[key][0];
        const value = criteria.value;
        if (value !== undefined && value !== null) {
          const matchMode = this.opratorMap[criteria.matchMode]
            ? this.opratorMap[criteria.matchMode]
            : criteria.matchMode;
          const subCriteria =
            value !== undefined &&
            value !== null &&
            this.getCriteria(key, value, matchMode, fromToCriteriaFields);
          if (!isEmpty(subCriteria)) {
            result.push(subCriteria);
          }
        }
      });
    return result.join(' & ');
  }
  /**
   * Calculates the search criteria
   * @param criteria
   * @param filters
   * @param fromToCriteriaFields
   * @returns {string}
   */
  public buildSearchCriteria(criteria, filters, fromToCriteriaFields) {
    const filterCriteria = this.parseCriteria(filters, fromToCriteriaFields);
    return criteria && filterCriteria
      ? `${criteria} & ${filterCriteria}`
      : filterCriteria
        ? filterCriteria
        : criteria;
  }
  /**
   * Calculates the order keys
   * @param event
   * @returns {string}
   */
  public buildOrderKeys(event) {
    return (
      event.multiSortMeta &&
      event.multiSortMeta.map((value) => `${value.field}${value.order === 1 ? '+' : '-'}`).join(',')
    );
  }

  /**
   * Prepares the criteria
   * @param queryParams
   * @param criteriaFromRouter
   * @param form
   * @param fromToFields
   * @param keys
   * @returns {string}
   */
  public getPreparedCriteria(criteriaFromRouter, form, fromToFields, keys): string {
    let mainCriteria = this.buildCriteria(form, fromToFields, keys);
    let allCriteria = Array.from(new Set([mainCriteria, criteriaFromRouter]))
      .filter((item) => item)
      .join('&');
    return allCriteria;
  }
}
