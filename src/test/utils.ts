export function getRandomInt(min: number, max: number) {
  const ceilMin = Math.ceil(min);
  const floorMax = Math.floor(max);
  return Math.floor(Math.random() * (floorMax - ceilMin + 1)) + ceilMin;
}

export function loadPage<T>(value: Array<T>, page: number, itemsPerPage: number): Array<T> {
  return value.slice(page * itemsPerPage, (page + 1) * itemsPerPage);
}

export function generateRandomSizes(count: number, start: number, end: number) {
  return [...new Array(count).keys()].map(() => getRandomInt(start, end));
}

export function generateMeta(count: number) {
  return [...new Array(count).keys()];
}

export function generateListValues(count: number) {
  return generateMeta(count).map((row) => `Value ${row}`);
}

export function generateGridValues(rowsCount: number, columnsCount: number) {
  return generateMeta(rowsCount).map((row) => generateMeta(columnsCount).map((column) => `Value ${row} - ${column}`));
}

export function sleep(timeout: number) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
