# React Scroller

A set of hooks, components and utilities for scrolling large datasets. Standalone components could be used as well as lower level hooks to achieve maximum flexibility.


## Demo and Documentation
Live examples available [here](https://vadim-sartakov.github.io/react-scroller/storybook/).

Documentation available [here](https://vadim-sartakov.github.io/react-scroller/docs/).

## Features
- Rendering only visible subset of data;
- Automatic scroll container resize;

## Scrollable list
```javascript
import Scroller from '@vadim-sartakov/react-scroller';

const ListCellComponent = ({ value, style }) => {
  return (
    <div style={style}>
      {value || 'Loading...'}
    </div>
  )
};

const listValue = [...new Array(1000).keys()];

const element = (
  <Scroller
      defaultRowHeight={40}
      totalRows={listValue.length}
      value={listValue}
      height="100vh"
      overscroll={2}
      {...props} />
);
```

## Scrollable grid
```javascript
const GridCellComponent = ({ value, style }) => <div style={style}>{value}</div>;

// gridValue is simple array of arrays
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
      {...props} />
);
```

## Props

|Prop|Type|Optional|Description
|---|---|---|---
|value|any[]||Array of values
|totalRows|number||Total number of rows
|totalColumns|number|yes|Total number of columns
|defaultRowHeight|number||Default height of scroller cell
|defaultColumnWidth|number|yes|Default width of scroller cell
|rowsSizes|number[]|yes|Array of scroller cell heights
|columnsSizes|number[]|yes|Array of scroller cell widths
|width|number, string|yes|Scroller container width. Could be any valid css string
|height|number, string|yes|Scroller container height. Could be any valid css string
|overscroll|number|yes|Number of elements which should be rendered out of visible scroller container
|lazy|boolean|yes|If set to true than scroll container will be expanded only when reached end scroll threshold
|RowComponent|React component|yes|Custom row component for grid rows. Default is div.
|CellComponent|React component||Cell component which will be rendered as scroller cell

## Custom scroller component

Custom scroller component composing is pretty straightforward with lower level hooks and components:

```javascript
import { useScroller, ScrollerCell, ScrollerContainer } from '@vadim-sartakov/react-scroller';

const ListScroller = inputProps => {
  const scrollerProps = useScroller(inputProps);
  const {
    scrollerContainerRef,
    scrollAreaStyle,
    visibleAreaStyle,
    visibleRowsIndexes,
    ...resultProps
  } = { ...inputProps, ...scrollerProps };
  return (
    <ScrollerContainer ref={scrollerContainerRef} {...resultProps}>
      <div style={scrollAreaStyle}>
        <div style={visibleAreaStyle}>
          {visibleRowsIndexes.map(index => <ScrollerCell Component={RowComponent} key={index} rowIndex={index} />)}
        </div>
      </div>
    </ScrollerContainer>
  );
};

const listValue = [...new Array(1000).keys()];

const element = (
  <ListScroller
      value={listValue}
      defaultRowHeight={50}
      height="100vh"
      totalRows={listValue.length} />
);

```