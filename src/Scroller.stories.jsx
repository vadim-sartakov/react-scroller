import React from 'react';
import { loadPage } from './utils';
import Scroller from '.';
import './styles.stories.css';

export default {
  component: Scroller,
  title: 'Scroller',
};

const getRandomInt = (min, max) => {
  const ceilMin = Math.ceil(min);
  const floorMax = Math.floor(max);
  return Math.floor(Math.random() * (floorMax - ceilMin + 1)) + ceilMin;
};

const generateRandomSizes = (count, start, end) => [...new Array(count).keys()]
  .map(() => getRandomInt(start, end));

const generateMeta = (count) => [...new Array(count).keys()];

const generateListValues = (count) => generateMeta(count).map((row) => `Value ${row}`);

const generateGridValues = (rowsCount, columnsCount) => generateMeta(rowsCount).map((row) => generateMeta(columnsCount).map((column) => `Value ${row} - ${column}`));

const listValue = generateListValues(1000);
const rowsSizes = generateRandomSizes(listValue.length, 40, 120);

const ListCellComponent = ({ value, style }) => (
  <div style={style}>
    {value || 'Loading...'}
  </div>
);

const ListTestComponent = (props) => <Scroller CellComponent={ListCellComponent} {...props} />;

const gridValue = generateGridValues(1000, 50);
const columnsSizes = generateRandomSizes(gridValue[0].length, 80, 250);

const GridCellComponent = ({ value, style }) => (
  <div className="cell" style={style}>
    {value || 'Loading...'}
  </div>
);

const GridTestComponent = (props) => <Scroller CellComponent={GridCellComponent} {...props} />;

const loadPageAsync = (value) => (page, itemsPerPage) => new Promise((resolve) => {
  setTimeout(() => {
    console.log('Loading async page %s', page);
    const result = loadPage(value, page, itemsPerPage);
    resolve(result);
  }, 1000);
});

export const syncListWithDefaultSizes = (props) => (
  <ListTestComponent
    defaultRowHeight={40}
    totalRows={gridValue.length}
    value={listValue}
    height="100vh"
    overscroll={2}
    {...props}
  />
);

export const syncListWithRandomSizes = (props) => (
  <ListTestComponent
    defaultRowHeight={40}
    totalRows={gridValue.length}
    rowsSizes={rowsSizes}
    value={listValue}
    height="100vh"
    overscroll={2}
    {...props}
  />
);

export const syncGridWithDefaultSizes = (props) => (
  <GridTestComponent
    defaultRowHeight={40}
    defaultColumnWidth={150}
    totalRows={gridValue.length}
    totalColumns={gridValue[0].length}
    value={gridValue}
    height="100vh"
    overscroll={2}
    rowComponentProps={{ className: 'row' }}
    {...props}
  />
);

export const syncGridWithRandomSizes = (props) => (
  <GridTestComponent
    defaultRowHeight={40}
    defaultColumnWidth={150}
    rowsSizes={rowsSizes}
    columnsSizes={columnsSizes}
    totalRows={gridValue.length}
    totalColumns={gridValue[0].length}
    value={gridValue}
    height="100vh"
    overscroll={2}
    rowComponentProps={{ className: 'row' }}
    {...props}
  />
);
