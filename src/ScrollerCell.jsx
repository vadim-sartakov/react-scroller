import React, { useContext, forwardRef } from 'react';
import ScrollerContext from './ScrollerContext';

const ScrollerCell = React.memo(forwardRef(({
  style,
  rowIndex,
  columnIndex,
  Component = 'div',
  ...props
}, ref) => {
  const {
    value,
    defaultColumnWidth,
    defaultRowHeight,
    rowsSizes,
    columnsSizes,
  } = useContext(ScrollerContext);

  const width = columnsSizes[columnIndex] || defaultColumnWidth;
  const height = rowsSizes[rowIndex] || defaultRowHeight;
  const nextStyle = { ...style, height, width };
  const rowValue = value[rowIndex];
  const cellValue = columnIndex !== undefined && rowValue && rowValue[columnIndex];

  return (
    <Component
      ref={ref}
      style={nextStyle}
      value={cellValue || rowValue}
      rowIndex={rowIndex}
      columnIndex={columnIndex}
      {...props}
    />
  );
}));

export default ScrollerCell;
