import React, { useContext } from 'react';
import ScrollerContext from './GridScrollerContext';

export interface GridScrollerCellComponentProps<T> {
  value: T;
  style: React.CSSProperties;
  rowIndex?: number;
  columnIndex?: number;
}

export interface GridScrollerCellProps<T> extends React.HTMLAttributes<HTMLElement> {
  rowIndex: number;
  columnIndex?: number;
  Component?: React.FC<GridScrollerCellComponentProps<T>>;
  componentProps?: Object;
}

const GridScrollerCell = <T extends unknown>({
  style,
  rowIndex,
  columnIndex,
  Component,
  componentProps,
}: GridScrollerCellProps<T>): ReturnType<React.FC> => {
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
};

const Wrapper = React.memo(GridScrollerCell) as typeof GridScrollerCell;

export default Wrapper;
