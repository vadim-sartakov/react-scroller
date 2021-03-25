import React from 'react';
import GridScrollerCell, { GridScrollerCellComponentProps } from './GridScrollerCell';

export interface RenderCellArgs {
  visibleRowsIndexes: number[];
  visibleColumnsIndexes: number[];
  RowComponent: string | React.FC;
  rowComponentProps: Object;
  CellComponent: React.FC<GridScrollerCellComponentProps>;
  cellComponentProps: Object;
}

function renderCells({
  visibleRowsIndexes,
  visibleColumnsIndexes,
  RowComponent = 'div',
  rowComponentProps,
  CellComponent,
  cellComponentProps,
}: RenderCellArgs) {
  const elements = visibleRowsIndexes.map((rowIndex) => {
    const columnsElements = visibleColumnsIndexes.map(
      (columnIndex) => (
        <GridScrollerCell
          key={columnIndex}
          Component={CellComponent}
          componentProps={cellComponentProps}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
        />
      ),
    );
    return (
      <RowComponent key={rowIndex} {...rowComponentProps}>
        {columnsElements}
      </RowComponent>
    );
  });
  return elements;
}

export default renderCells;
