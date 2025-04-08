/**
 * Group items by number of cards per row
 * @param data
 * @param chunk
 * @returns {Array}
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
 * Calculate number of cards per row based on screen size
 * @param row
 * @returns {number}
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
 * Calculate scroll height
 * @param rowCols
 * @param itemSize
 * @param pageSize
 * @returns {number}
 */
export function getScrollHeight(rowCols, itemSize, pageSize) {
  return itemSize * (pageSize / getNumberOfCardsPerRow(rowCols));
}

/**
 * initilize empty array
 */
export function getEmpty(rowsnm) {
  return Array.from({ length: rowsnm });
}
