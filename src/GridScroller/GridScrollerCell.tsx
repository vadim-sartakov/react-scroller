import React, { useContext } from 'react';
import ScrollerContext from './GridScrollerContext';

export interface GridScrollerCellComponentProps {
  value: any;
  style: React.CSSProperties;
  rowIndex?: number;
  columnIndex?: number;
}

export interface GridScrollerCellProps extends React.HTMLAttributes<HTMLElement> {
  rowIndex: number;
  columnIndex?: number;
  Component?: React.FC<GridScrollerCellComponentProps>;
  componentProps?: Object;
}

const GridScrollerCell: React.FC<GridScrollerCellProps> = React.memo(({
  style,
  rowIndex,
  columnIndex,
  Component,
  componentProps,
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
      {...componentProps}
    />
  );
});

export default GridScrollerCell;
