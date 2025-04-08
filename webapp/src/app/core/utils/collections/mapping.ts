import { ComboboxItem } from '@app/core/api';
import { get, sumBy, uniqBy } from 'lodash';

export function mapComboboxValues(data: any[], keys: string[], separator: string): ComboboxItem[] {
  return (data || []).map((item) => ({
    value: item instanceof Object ? { ...item } : item,
    label:
      item instanceof Object
        ? (keys && keys.map((key) => get(item, key)).join(separator || ' ')) || item
        : item,
  }));
}

/**
 * Filters the provided value
 * @param value
 * @param props
 * @returns
 */
export function filterList(value, props) {
  return value instanceof Array
    ? value.filter((item, index) => {
        if (typeof props.filterBy === 'function') {
          item._index = index;
          return props.filterBy(item);
        }
        return true;
      })
    : value;
}
/**
 *
 * @param values
 * @returns
 */
export function getCategories(values, props) {
  return uniqBy(values, props.groupedBy).map((item: any) => {
    return {
      name: get(item, props.groupedBy).toString(),
      id: get(item, props.groupIdentifier),
      items: values.filter(
        (subItem) => get(subItem, props.groupedBy) === get(item, props.groupedBy)
      ),
    };
  });
}
/**
 *
 * @param values
 * @returns
 */
export function groupItems(values, groupedBy, filterBy = undefined, _index = undefined) {
  const props = { groupedBy, groupIdentifier: groupedBy, filterBy, _index };
  return getCategories(filterList(values, props), props);
}
/**
 * return the total items number of display grouped
 */
export function groupingCounter(value) {
  return sumBy(value, 'items.length');
}
