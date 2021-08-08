import { useMemo } from 'react';
import * as React from 'react';
import { GridScrollerRenderProps } from './types';

type GridScrollerCellProps<T> = GridScrollerRenderProps<T> & {
  rowIndex: number;
  columnIndex: number;
  value: T;
  width: number;
  height: number;
};

const GridScrollerCell = <T extends unknown>({
  rowIndex,
  columnIndex,
  value,
  width,
  height,
  CellComponent,
  cellComponentProps,
  render,
}: GridScrollerCellProps<T>): ReturnType<React.FC> => {
  const nextStyle = useMemo(() => ({ height, width }), [height, width]);

  if (CellComponent) {
    return (
      <CellComponent
        style={nextStyle}
        value={value}
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        {...cellComponentProps}
      />
    );
  }

  if (render) {
    return render({
      style: nextStyle,
      value,
      rowIndex,
      columnIndex,
    });
  }

  throw Error('Either cell Component or render function prop should be provided');
};

export default React.memo(GridScrollerCell);
