import { useMemo } from 'react';
import * as React from 'react';
import GridScrollerContext from './GridScrollerContext';
import { GridScrollerSizesProps, GridScrollerSyncPropsBase } from './types';

const defaultArray: number[] = [];

export interface GridScrollerContainerProps<T> extends
  React.HTMLAttributes<HTMLDivElement>,
  GridScrollerSyncPropsBase<T>,
  Omit<GridScrollerSizesProps, 'totalRows' | 'totalColumns'> {
  containerRef?: React.MutableRefObject<HTMLDivElement>,
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
