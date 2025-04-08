import { get, isDate, mergeWith } from 'lodash';

let globalCounter = 0;

/**
 * Get the value of a property from a data object then
 * format the result to a standard format (Date for example)
 * @param value
 * @returns {string}
 */
export function getValue(data: any, property: string, defaultValue: any = ''): any {
  const value = get(data, property, defaultValue);
  return !isDate(value) ? value : value.toISOString();
}
/**
 * Decode the provided value, it is maily used to decode the Query parameters
 * @param value
 * @returns {string}
 */
export function getDecodedValue(value: any): any {
  return value ? decodeURIComponent(value) : value;
}

/**
 * Get the param value of a the field provided from the active params object
 * @param value
 * @returns {string}
 */
export function getParamValue(routeParams, fieldName) {
  return routeParams?.queryParams?.[fieldName] || routeParams?.params?.[fieldName];
}
/**
 * Merge the provided data objects into one object
 * @param oldData
 * @param newData
 * @returns
 */
export function mergeObjects(oldData, newData) {
  return mergeWith({ ...oldData }, { ...newData }, (target, source) =>
    source === null || source instanceof Array ? source : undefined
  );
}

/**
 * Retrieves the parameter code from the given params object.
 *
 * @param params - The params object containing the id.
 * @returns The parameter code if the id is valid and doesn't start with '{', otherwise undefined.
 */
export function getParamCode(params: any) {
  const id = params?.id;
  if (id === null || id === undefined) return undefined;
  if (typeof id === 'string') {
    return id && !id.startsWith('{') ? id : undefined;
  }
  return `${id}`;
}

/**
 * Merge the provided params and query params into new objects
 * @param oldParams - The old params object
 * @param oldQueryParams - The old query params object
 * @param params - The new params object
 * @param queryParams - The new query params object
 * @returns An array containing the merged params and query params objects
 */
export function mergeParams([oldParams, oldQueryParams], [params, queryParams]) {
  const newParams = { ...params };
  const newQueryParams = { ...queryParams };

  Object.keys(oldParams).forEach((key) => {
    if (!newParams[key]) newParams[key] = null;
  });

  Object.keys(oldQueryParams).forEach((key) => {
    if (!newQueryParams[key]) newQueryParams[key] = null;
  });

  return [newParams, newQueryParams];
}

/**
 * Generates a unique identifier by appending a global counter to the provided ID.
 *
 * @param id - The base string to which the global counter will be appended.
 * @returns A unique string identifier.
 */
export function uniq(id: string) {
  return id + globalCounter++;
}
