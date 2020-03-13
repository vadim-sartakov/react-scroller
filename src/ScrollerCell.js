import React, { useContext, forwardRef } from 'react';
import { ScrollerContext } from './';

/** @type {import('react').FunctionComponent<import('.').ScrollerCellProps>} */
const ScrollerCell = forwardRef(({
  style,
  rowIndex,
  columnIndex,
  row,
  column,
  Component = 'div',
  ...props
}, ref) => {
  const { defaultColumnWidth, defaultRowHeight } = useContext(ScrollerContext);
  
  const { size: rowSize, offset: rowOffset } = row || {};
  const { size: columnSize, offset: columnOffset } = column || {};
  const width = columnSize || defaultColumnWidth;
  const height = rowSize || defaultRowHeight;
  let nextStyle = { height, width };
  if (columnOffset !== undefined) {
    nextStyle.position = 'sticky';
    nextStyle.left = columnOffset;
    nextStyle.zIndex = 2;
  }
  if (rowOffset !== undefined) {
    nextStyle.position = 'sticky';
    nextStyle.top = rowOffset;
    nextStyle.zIndex = 4;
  }
  if (columnOffset !== undefined && rowOffset !== undefined) {
    nextStyle.zIndex = 6;
  }
  nextStyle = { ...nextStyle, ...style };
  return (
    <Component ref={ref} style={nextStyle} {...props} />
  );
});

export default ScrollerCell;