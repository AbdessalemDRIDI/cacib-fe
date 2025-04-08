import { orderBy } from 'lodash';

/**
 * The column interface's properties
 */
export interface Column {
  /**
   * The column's width
   */
  width?: string;
  /**
   * The column's name
   */
  name: string;
  /**
   * The technical related field(s)
   */
  field: string | String[];
  /**
   * Option to froze the column of `true`
   */
  frozen?: boolean;
  /**
   * The responsive styleName
   */
  resolutionClass?: ResponsiveResolution;
  /**
   * The column's type
   */
  type?: string;
  /**
   * Used with Data component
   */
  temporalType?: string;
  /**
   * Used with Data component
   */
  datePrecision?: string;
  /**
   * A grouped column if `true`
   */
  isGrouped?: boolean;
}
/**
 * The supported web responsive breakpoints
 */
export enum ResponsiveResolution {
  L = 'ui-l',
  M = 'ui-m',
  SM = 'ui-s',
  XS = 'ui-xs',
}
/**
 * The grouped column interface's properties
 */
export interface ColumnGroup {
  /**
   * The column name
   */
  label: string;
  /**
   * Defines the number of columns a cell should span
   */
  colSpan: number;
  /**
   * Defines the number of rows a row should span
   */
  rowSpan: number;
}
/**
 * Gets the number of pages
 * @param totalItems
 * @param itemsByPage
 */
export function getNumberOfPages(totalItems: number, itemsByPage): number {
  if (totalItems <= itemsByPage) {
    return 1;
  } else {
    return Math.ceil(totalItems / itemsByPage);
  }
}
/**
 * Gets the page to load
 */
export function getTargetPage(index, pageSize, currentPage) {
  let page = index === 0 ? 1 : (index + pageSize) / pageSize;
  if (index > 0) {
    if (Math.round(page) === currentPage) {
      page = Math.round(page - 1);
    } else {
      page = Math.round(page) < currentPage ? Math.round(page) : Math.round(page);
    }
  }
  return page;
}

/**
 * Sort the options of dropdown, multiselect, autocomplete
 * @param result
 * @param key
 * @param order
 */
export function sortOptions(result, key, order) {
  return orderBy(result, key, order);
}

/**
 * Retirive the diffrences from comparator rowData
 * @param {array} fields
 * @param {array} items
 * @returns diffrences
 */
export function getComparatorDifferences(fields, items) {
  let result = [];
  let diff = [];
  items.rowsData &&
    items.rowsData[0].forEach((values, index) => {
      for (let i = 1; i < values.length; i++) {
        if (typeof values[i] !== 'object') {
          if (values[i] !== values[i - 1]) {
            diff.push(`${fields[index]}`);
            result.push(`${fields[index]}-${i}`);
          }
        } else {
          if (JSON.stringify(values[i]) !== JSON.stringify(values[i - 1])) {
            diff.push(`${fields[index]}`);
            result.push(`${fields[index]}-${i}`);
          }
        }
      }
    });
  diff = [...new Set(diff)];
  return { highlight: result, differenceLine: diff };
}

/**
 * Generates data chunks from an array.
 * @param data - The array of data to be chunked.
 * @param chunk - The size of each chunk. Default is 3.
 * @returns An array of data chunks.
 */
export function generateDataChunk(data, chunk = 3) {
  let index: number;
  let dataChunk: [][] = [];
  for (index = 0; index < data.length; index += chunk) {
    dataChunk.push(data.slice(index, index + chunk));
  }
  return dataChunk;
}

/**
 * Calculates the number of cards per row based on the given row configuration and the current screen width.
 *
 * @param {string} row - The row configuration string, e.g. "row-lg-4".
 * @returns {number} - The number of cards per row.
 */
export function getNumberOfCardsPerRow(row) {
  let cardsPerRow;
  let screenWidth = window.innerWidth;
  if (screenWidth >= 992) {
    row = row?.split(' ').filter((i) => i.indexOf('lg') > -1)[0];
    cardsPerRow = row?.split('-')[row.split('-').length - 1];
  } else if (screenWidth > 576 && screenWidth < 992) {
    row = row?.split(' ').filter((i) => i.indexOf('md') > -1)[0];
    cardsPerRow = row?.split('-')[row.split('-').length - 1];
  } else if (screenWidth <= 576) {
    row = row?.split(' ').filter((i) => i.indexOf('sm') > -1)[0];
    cardsPerRow = row?.split('-')[row.split('-').length - 1];
  }
  return 12 / parseInt(cardsPerRow);
}

/**
 * Calculates the scroll height based on the number of rows and columns, item size, and page size.
 *
 * @param {number} rowCols - The number of rows and columns.
 * @param {number} itemSize - The size of each item.
 * @param {number} pageSize - The number of items per page.
 * @returns {number} The calculated scroll height.
 */
export function getScrollHeight(rowCols, itemSize, pageSize) {
  return itemSize * (pageSize / getNumberOfCardsPerRow(rowCols));
}

/**
 * Returns an empty array with the specified number of rows.
 *
 * @param numberOfRows - The number of rows for the empty array.
 * @returns An empty array with the specified number of rows.
 */
export function getEmptyArray(numberOfRows) {
  return Array.from({ length: numberOfRows });
}
