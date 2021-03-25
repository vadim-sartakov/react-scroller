import React, { useContext, useMemo } from 'react';
import ListScrollerContext from './ListScrollerContext';

export interface ListScrollerRowComponentProps {
  value: any;
  style: React.CSSProperties;
  rowIndex?: number;
  columnIndex?: number;
}

export interface ListScrollerRowProps extends React.HTMLAttributes<HTMLElement> {
  rowIndex: number;
  columnIndex?: number;
  RowComponent?: React.FC<ListScrollerRowComponentProps>;
  rowComponentProps?: Object;
}

const ListScrollerRow: React.FC<ListScrollerRowProps> = React.memo(({
  style,
  rowIndex,
  columnIndex,
  RowComponent,
  rowComponentProps,
}) => {
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
});

export default ListScrollerRow;
