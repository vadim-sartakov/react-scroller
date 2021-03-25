# React Scroller

A set of hooks, components and utilities for scrolling large datasets. Standalone components could be used as well as lower level hooks to achieve maximum flexibility.


## Demo
Live examples available [here](https://vadim-sartakov.github.io/react-scroller/storybook/).

## Features
- Rendering only visible subset of data;
- Automatic scroll container resize;
- Lightweight;
- Fast

## Scrollable list
```javascript
import { ListScroller } from '@vadim-sartakov/react-scroller';

const ListCellComponent = ({ value, style }) => (
  <div style={style}>
    {value}
  </div>
);

const listValue = [...new Array(1000).keys()];

const element = (
  <ListScroller
    defaultRowHeight={40}
    totalRows={listValue.length}
    value={listValue}
    height="100vh"
    overscroll={2}
  />
);
```

## List scroller props

|Prop|Type|Optional|Description
|---|---|---|---
|value|any[]||Array of values
|totalRows|number||Total number of rows
|defaultRowHeight|number||Default height of scroller cell
|rowsSizes|number[]|Yes|Array of scroller cell heights
|height|number, string||Scroller container height. Could be any valid css string
|overscroll|number|Yes|Number of elements which should be rendered out of visible scroller container
|RowComponent|React component|Yes|Custom row component for grid rows. Default is div.
|rowComponentProps|Object|Yes|Props to pass to row component

## Scrollable grid
```javascript
import { GridScroller } from '@vadim-sartakov/react-scroller';

const GridCellComponent = ({ value, style }) => (
  <div style={style}>
    {value}
  </div>
);

// gridValue is a simple array of arrays
const element = (
  <Scroller
    defaultRowHeight={40}
    defaultColumnWidth={150}
    totalRows={gridValue.length}
    totalColumns={gridValue[0].length}
    value={gridValue}
    width="100%"
    height="100vh"
    overscroll={2}
  />
);
```

## Grid scroller props

|Prop|Type|Optional|Description
|---|---|---|---
|value|any[][]||Array of values
|totalRows|number||Total number of rows
|totalColumns|number|Yes|Total number of columns
|defaultRowHeight|number||Default height of scroller cell
|defaultColumnWidth|number|Yes|Default width of scroller cell
|rowsSizes|number[]|Yes|Array of scroller cell heights
|columnsSizes|number[]|Yes|Array of scroller cell widths
|width|number, string|Yes|Scroller container width. Could be any valid css string
|height|number, string||Scroller container height. Could be any valid css string
|onScroll|Callback|Yes|On scroll callback
|overscroll|number|Yes|Number of elements which should be rendered out of visible scroller container
|RowComponent|React component|Yes|Custom row component for grid rows. Default is div.
|rowComponentProps|Object|Yes|Props to pass to row component
|CellComponent|React component||Cell component which will be rendered as scroller cell
|cellComponentProps|Object|Yes|Props to pass to cell component