import React, { useMemo, forwardRef } from 'react';
import ScrollerContext from './ScrollerContext';

const defaultArray = [];

const ScrollerContainer = forwardRef(({
  value,
  width,
  height,
  defaultRowHeight,
  defaultColumnWidth,
  rowsSizes = defaultArray,
  columnsSizes = defaultArray,
  style,
  onScroll,
  children
}, ref) => {
  const contextValue = useMemo(() => ({
    value,
    defaultRowHeight,
    defaultColumnWidth,
    rowsSizes,
    columnsSizes
  }), [value, defaultRowHeight, defaultColumnWidth, rowsSizes, columnsSizes]);
  return (
    <ScrollerContext.Provider value={contextValue}>
      <div
          ref={ref}
          style={{ width, height, overflow: height && 'auto', ...style }}
          onScroll={onScroll}>
        {children}
      </div>
    </ScrollerContext.Provider>
  );
});

export default ScrollerContainer;