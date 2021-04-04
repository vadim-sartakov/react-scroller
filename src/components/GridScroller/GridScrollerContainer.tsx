import React, { useMemo } from 'react';
import GridScrollerContext from './GridScrollerContext';
import { GridScrollerProps } from './types';

const defaultArray: number[] = [];

export interface GridScrollerContainerProps<T> extends
  React.HTMLAttributes<HTMLDivElement>, Pick<GridScrollerProps<T>,
  'value'
  | 'width'
  | 'height'
  | 'defaultRowHeight'
  | 'defaultColumnWidth'
  | 'rowsSizes'
  | 'columnsSizes'> {
  containerRef?: React.Ref<HTMLDivElement>,
}

const GridScrollerContainer = <T extends unknown>({
  value,
  width,
  height,
  defaultRowHeight,
  defaultColumnWidth,
  rowsSizes = defaultArray,
  columnsSizes = defaultArray,
  onScroll,
  style,
  containerRef,
  ...props
}: GridScrollerContainerProps<T>) => {
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
        ref={containerRef}
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
};

export default GridScrollerContainer;
