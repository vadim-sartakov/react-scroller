import React from 'react';
import ScrollerCell, { ScrollerCellComponentProps } from './ScrollerCell';

export interface RenderCellArgs {
  visibleRowsIndexes: number[];
  visibleColumnsIndexes: number[];
  RowComponent: string | React.FC;
  rowComponentProps: Object;
  CellComponent: React.FC<ScrollerCellComponentProps>;
}

function renderCells({
  visibleRowsIndexes,
  visibleColumnsIndexes,
  RowComponent = 'div',
  rowComponentProps,
  CellComponent,
}: RenderCellArgs) {
  const elements = visibleRowsIndexes.map((rowIndex) => {
    if (visibleColumnsIndexes) {
      const columnsElements = visibleColumnsIndexes.map(
        (columnIndex) => (
          <ScrollerCell
            key={columnIndex}
            Component={CellComponent}
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
    }

    return (
      <ScrollerCell
        key={rowIndex}
        Component={CellComponent}
        rowIndex={rowIndex}
      />
    );
  });
  return elements;
}

export default renderCells;
