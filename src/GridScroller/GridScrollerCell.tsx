import React, { useContext } from 'react';
import { GridScrollerComponentRenderProps, GridScrollerRenderFuncProps } from './types';
import ScrollerContext from './GridScrollerContext';

interface GridScrollerCellProps extends React.HTMLAttributes<HTMLElement> {
  rowIndex: number;
  columnIndex: number;
}

interface GridScrollerCellType {
  <T>(props: GridScrollerCellProps & GridScrollerComponentRenderProps<T>): ReturnType<React.FC>;
  <T>(props: GridScrollerCellProps & GridScrollerRenderFuncProps<T>): ReturnType<React.FC>;
}

const GridScrollerCell: GridScrollerCellType = <T extends unknown>({
  style,
  rowIndex,
  columnIndex,
  CellComponent,
  cellComponentProps,
  render,
}: GridScrollerCellProps &
GridScrollerComponentRenderProps<T> &
GridScrollerRenderFuncProps<T>): ReturnType<React.FC> => {
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

const Wrapper = React.memo(GridScrollerCell) as unknown as GridScrollerCellType;

export default Wrapper;
