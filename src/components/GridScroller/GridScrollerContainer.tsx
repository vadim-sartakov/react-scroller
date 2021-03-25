import React, { useMemo, forwardRef } from 'react';
import GridScrollerContext from './GridScrollerContext';
import { GridScrollerProps } from './types';

const defaultArray: number[] = [];

export interface GridScrollerContainerProps extends
  React.HTMLAttributes<HTMLDivElement>, Pick<GridScrollerProps,
  'value'
  | 'width'
  | 'height'
  | 'defaultRowHeight'
  | 'defaultColumnWidth'
  | 'rowsSizes'
  | 'columnsSizes'> {}

const GridScrollerContainer = forwardRef<HTMLDivElement, GridScrollerContainerProps>(({
  value,
  width,
  height,
  defaultRowHeight,
  defaultColumnWidth,
  rowsSizes = defaultArray,
  columnsSizes = defaultArray,
  onScroll,
  style,
  ...props
}, ref) => {
  const contextValue = useMemo(() => ({
    value,
    defaultRowHeight,
    defaultColumnWidth,
    rowsSizes,
    columnsSizes,
  }), [value, defaultRowHeight, defaultColumnWidth, rowsSizes, columnsSizes]);

  return (
    <GridScrollerContext.Provider value={contextValue}>
      <div
        ref={ref}
        style={{
          width,
          height,
          overflow: height && 'auto',
          ...style,
        }}
        onScroll={onScroll}
        {...props}
      />
    </GridScrollerContext.Provider>
  );
});

export default GridScrollerContainer;
