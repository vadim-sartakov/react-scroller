import React from 'react';
import { storiesOf } from '@storybook/react';
import { loadPage } from './utils';
import Scroller from './';
import classes from './Scroller-stories.module.sass';

export const generateRandomSizes = (count, start, end) => [...new Array(count).keys()].map(() => getRandomInt(start, end));

const generateMeta = count => {
  return [...new Array(count).keys()];
};

const generateListValues = count => {
  return generateMeta(count).map(row => {
    return `Value ${row}`;
  });
};

const generateGridValues = (rowsCount, columnsCount) => {
  return generateMeta(rowsCount).map(row => {
    return generateMeta(columnsCount).map(column => {
      return `Value ${row} - ${column}`;
    });
  });
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const listValue = generateListValues(1000);
const rowsSizes = generateRandomSizes(listValue.length, 40, 120);

const ListCellComponent = ({ value, style }) => {
  return (
    <div style={style}>
      {value || 'Loading...'}
    </div>
  )
};

export const ListTestComponent = props => {
  return <Scroller CellComponent={ListCellComponent} height={600} overscroll={2} {...props} />;
};

const gridValue = generateGridValues(1000, 50);
const columnsSizes = generateRandomSizes(gridValue[0].length, 80, 250);

const GridCellComponent = ({ value, ...props }) => {
  return (
    <div className={classes.cell} {...props}>
      {value || 'Loading...'}
    </div>
  )
};

export const GridTestComponent = props => {
  return <Scroller CellComponent={GridCellComponent} width={800} height={600} overscroll={2} {...props} />;
};

export const loadPageAsync = value => (page, itemsPerPage) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Loading async page %s', page);
      const result = loadPage(value, page, itemsPerPage);
      resolve(result);
    }, 1000);
  });
};

export const syncListWithDefaultSizes = props => (
  <ListTestComponent
      defaultRowHeight={40}
      totalRows={gridValue.length}
      value={listValue}
      {...props} />
);

export const syncListWithCustomSizes = props => (
  <ListTestComponent
      defaultRowHeight={40}
      totalRows={gridValue.length}
      rowsSizes={rowsSizes}
      value={listValue}
      {...props} />
);

export const syncGridWithDefaultSizes = props => (
  <GridTestComponent
      defaultRowHeight={40}
      defaultColumnWidth={150}
      totalRows={gridValue.length}
      totalColumns={gridValue[0].length}
      value={gridValue}
      {...props} />
);

export const syncGridWithCustomSizes = props => (
  <GridTestComponent
      defaultRowHeight={40}
      defaultColumnWidth={150}
      rowsSizes={rowsSizes}
      columnsSizes={columnsSizes}
      totalRows={gridValue.length}
      totalColumns={gridValue[0].length}
      rowsPerPage={30}
      columnsPerPage={10}
      value={gridValue}
      {...props} />
);

storiesOf('Scroller', module)
  .add('sync list with default row sizes', syncListWithDefaultSizes)
  .add('sync list with custom row sizes', syncListWithCustomSizes)
  .add('sync grid with default sizes', syncGridWithDefaultSizes)
  .add('sync grid with custom sizes', syncGridWithCustomSizes);