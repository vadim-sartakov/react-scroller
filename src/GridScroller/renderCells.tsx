import React from 'react';
import GridScrollerCell, { GridScrollerCellRenderProps } from './GridScrollerCell';

export interface RenderCellArgs<T> {
  visibleRowsIndexes: number[];
  visibleColumnsIndexes: number[];
  RowComponent: string | React.FC;
  rowComponentProps: Object;
  CellComponent: React.FC<GridScrollerCellRenderProps<T>>;
  cellComponentProps: Object;
  render: (props: GridScrollerCellRenderProps<T>) => ReturnType<React.FC>;
}

function renderCells<T>({
  visibleRowsIndexes,
  visibleColumnsIndexes,
  RowComponent = 'div',
  rowComponentProps,
  CellComponent,
  cellComponentProps,
  render,
}: RenderCellArgs<T>) {
  const elements = visibleRowsIndexes.map((rowIndex, curRowIndex) => (
    <RowComponent key={curRowIndex} {...rowComponentProps}>
      {visibleColumnsIndexes.map(
        (columnIndex, curColumnIndex) => (
          <GridScrollerCell
            key={curColumnIndex}
            Component={CellComponent}
            componentProps={cellComponentProps}
            render={render}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
          />
        ),
      )}
    </RowComponent>
  ));
  return elements;
}

export default renderCells;
