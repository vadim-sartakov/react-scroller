import React, { useContext } from 'react';
import ScrollerContext from './GridScrollerContext';

export interface GridScrollerCellRenderProps<T> {
  value: T;
  style: React.CSSProperties;
  rowIndex: number;
  columnIndex: number;
}

export interface GridScrollerCellProps<T> extends React.HTMLAttributes<HTMLElement> {
  rowIndex: number;
  columnIndex: number;
  Component?: React.FC<GridScrollerCellRenderProps<T>>;
  componentProps?: Object;
  render?: (props: GridScrollerCellRenderProps<T>) => ReturnType<React.FC>;
}

const GridScrollerCell = <T extends unknown>({
  style,
  rowIndex,
  columnIndex,
  Component,
  componentProps,
  render,
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
  const cellValue = rowValue && rowValue[columnIndex];

  if (Component) {
    return (
      <Component
        style={nextStyle}
        value={cellValue}
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        {...componentProps}
      />
    );
  } else if (render) {
    return render({
      style: nextStyle,
      value: cellValue,
      rowIndex,
      columnIndex,
    });
  } else {
    throw Error('Either cell Component or render prop should be provided');
  }
};

const Wrapper = React.memo(GridScrollerCell) as typeof GridScrollerCell;

export default Wrapper;
