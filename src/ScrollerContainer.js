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
  className,
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
          className={className}
          onScroll={onScroll}>
        {children}
      </div>
    </ScrollerContext.Provider>
  );
});

export default ScrollerContainer;