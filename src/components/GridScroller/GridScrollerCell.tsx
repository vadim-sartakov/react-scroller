import React, { useContext } from 'react';
import { GridScrollerRenderProps } from './types';
import ScrollerContext from './GridScrollerContext';

type GridScrollerCellProps<T> = React.HTMLAttributes<HTMLElement> & GridScrollerRenderProps<T> & {
  rowIndex: number;
  columnIndex: number;
};

const GridScrollerCell = <T extends unknown>({
  style,
  rowIndex,
  columnIndex,
  CellComponent,
  cellComponentProps,
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

  if (CellComponent) {
    return (
      <CellComponent
        style={nextStyle}
        value={cellValue}
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        {...cellComponentProps}
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

export default React.memo(GridScrollerCell);
