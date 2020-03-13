import React, { useMemo, forwardRef } from 'react';
import { ScrollerContext } from './';

const defaultArray = [];

const ScrollerContainer = forwardRef(({
  width,
  height,
  defaultRowHeight,
  defaultColumnWidth,
  rowsSizes = defaultArray,
  columnsSizes = defaultArray,
  style,
  ...props
}, ref) => {
  const contextValue = useMemo(() => ({
    defaultRowHeight,
    defaultColumnWidth,
    rowsSizes,
    columnsSizes
  }), [defaultRowHeight, defaultColumnWidth, rowsSizes, columnsSizes]);
  return (
    <ScrollerContext.Provider value={contextValue}>
      <div
          ref={ref}
          {...props}
          style={{ width, height, overflow: height && 'auto', ...style }} />
    </ScrollerContext.Provider>
  );
});

export default ScrollerContainer;