import React, { useContext } from 'react';
import ScrollerContext from './ScrollerContext';

export interface ScrollerCellComponentProps {
  value: any;
  style: React.CSSProperties;
  rowIndex?: number;
  columnIndex?: number;
}

export interface ScrollerCellProps extends React.HTMLAttributes<HTMLElement> {
  rowIndex: number;
  columnIndex?: number;
  Component?: React.FC<ScrollerCellComponentProps>;
}

const ScrollerCell: React.FC<ScrollerCellProps> = React.memo(({
  style,
  rowIndex,
  columnIndex,
  Component,
}) => {
  const {
    value,
    defaultColumnWidth,
    defaultRowHeight,
    rowsSizes,
    columnsSizes,
  } = useContext(ScrollerContext);

  const width = columnsSizes[columnIndex] || defaultColumnWidth;
  const height = rowsSizes[rowIndex] || defaultRowHeight;
  const nextStyle = { height, width, ...style };
  const rowValue = value[rowIndex];
  const cellValue = columnIndex !== undefined && rowValue && rowValue[columnIndex];

  return (
    <Component
      style={nextStyle}
      value={cellValue || rowValue}
      rowIndex={rowIndex}
      columnIndex={columnIndex}
    />
  );
});

export default ScrollerCell;
