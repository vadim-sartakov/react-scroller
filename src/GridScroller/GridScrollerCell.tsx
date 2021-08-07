import { useContext, useMemo } from 'react';
import * as React from 'react';
import { GridScrollerRenderProps } from './types';
import ScrollerContext from './GridScrollerContext';

type GridScrollerCellProps<T> = GridScrollerRenderProps<T> & {
  rowIndex: number;
  columnIndex: number;
};

const GridScrollerCell = <T extends unknown>({
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
  const nextStyle = useMemo(() => ({ height, width }), [height, width]);
  const cellValue = value[rowIndex]?.[columnIndex];

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
  }

  if (render) {
    return render({
      style: nextStyle,
      value: cellValue,
      rowIndex,
      columnIndex,
    });
  }

  throw Error('Either cell Component or render function prop should be provided');
};

export default React.memo(GridScrollerCell);
