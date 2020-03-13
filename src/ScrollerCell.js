import React, { useContext, forwardRef } from 'react';
import { ScrollerContext } from './';

const ScrollerCell = forwardRef(({
  style,
  rowIndex,
  columnIndex,
  Component = 'div',
  ...props
}, ref) => {
  const { defaultColumnWidth, defaultRowHeight, rowsSizes, columnsSizes } = useContext(ScrollerContext);
  const width = columnsSizes[columnIndex] || defaultColumnWidth;
  const height = rowsSizes[rowIndex] || defaultRowHeight;
  const nextStyle = { ...style, height, width };
  return <Component ref={ref} style={nextStyle} {...props} />;
});

export default ScrollerCell;