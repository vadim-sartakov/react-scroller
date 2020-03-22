import React from 'react';
import ScrollerCell from './ScrollerCell';

function renderCells({
  visibleRowsIndexes,
  visibleColumnsIndexes,
  RowComponent,
  rowComponentProps,
  CellComponent,
  cellComponentProps
}) {
  const elements = visibleRowsIndexes.map(rowIndex => {
    if (visibleColumnsIndexes) {
      const columnsElements = visibleColumnsIndexes.map(columnIndex => {
        return <ScrollerCell Component={CellComponent} key={`${rowIndex}-${columnIndex}`} rowIndex={rowIndex} columnIndex={columnIndex} {...cellComponentProps} />;
      });
      return (
        <RowComponent key={rowIndex} {...rowComponentProps}>
          {columnsElements}
        </RowComponent>
      );
    } else {
      return <ScrollerCell Component={CellComponent} key={rowIndex} rowIndex={rowIndex} {...cellComponentProps} />;
    }
  });
  return elements;
};

export default renderCells;