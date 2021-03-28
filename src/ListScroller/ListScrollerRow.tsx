import React, { useContext, useMemo } from 'react';
import ListScrollerContext from './ListScrollerContext';

export interface ListScrollerRowComponentProps<T> {
  value: T;
  style: React.CSSProperties;
  rowIndex?: number;
  columnIndex?: number;
}

export interface ListScrollerRowProps<T> extends React.HTMLAttributes<HTMLElement> {
  rowIndex: number;
  columnIndex?: number;
  RowComponent?: React.FC<ListScrollerRowComponentProps<T>>;
  rowComponentProps?: Object;
}

const ListScrollerRow = <T extends unknown>({
  style,
  rowIndex,
  columnIndex,
  RowComponent,
  rowComponentProps,
}: ListScrollerRowProps<T>): ReturnType<React.FC> => {
  const {
    value,
    defaultRowHeight,
    rowsSizes,
  } = useContext(ListScrollerContext);

  const height = rowsSizes[rowIndex] || defaultRowHeight;
  const nextStyle = useMemo(() => ({ height, ...style }), [height, style]);
  const rowValue = value[rowIndex];
  const cellValue = columnIndex !== undefined && rowValue && rowValue[columnIndex];

  return (
    <RowComponent
      style={nextStyle}
      value={cellValue || rowValue}
      rowIndex={rowIndex}
      columnIndex={columnIndex}
      {...rowComponentProps}
    />
  );
};

const Wrapper = React.memo(ListScrollerRow) as typeof ListScrollerRow;

export default Wrapper;
