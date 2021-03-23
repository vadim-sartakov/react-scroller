import React, { useMemo, forwardRef } from 'react';
import ScrollerContext from './ScrollerContext';
import { ScrollerPropsBase } from './types';

const defaultArray: number[] = [];

export interface ScrollContainerProps extends
  React.HTMLAttributes<HTMLDivElement>, Pick<ScrollerPropsBase,
  'value'
  | 'width'
  | 'height'
  | 'defaultRowHeight'
  | 'defaultColumnWidth'
  | 'rowsSizes'
  | 'columnsSizes'> {}

const ScrollerContainer = forwardRef<HTMLDivElement, ScrollContainerProps>(({
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
    <ScrollerContext.Provider value={contextValue}>
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
    </ScrollerContext.Provider>
  );
});

export default ScrollerContainer;
