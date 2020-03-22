import React from 'react';
import ScrollerCell from './ScrollerCell';

function renderCells({
  visibleRowsIndexes,
  visibleColumnsIndexes,
  RowComponent = 'div',
  rowComponentProps,
  CellComponent,
  cellComponentProps
}) {
  const elements = visibleRowsIndexes.map(rowIndex => {
    if (visibleColumnsIndexes) {
      const columnsElements = visibleColumnsIndexes.map(columnIndex => {
        return <ScrollerCell {...cellComponentProps} key={columnIndex} Component={CellComponent} rowIndex={rowIndex} columnIndex={columnIndex} />;
      });
      return <RowComponent {...rowComponentProps} key={rowIndex}>{columnsElements}</RowComponent>;
    } else {
      return <ScrollerCell {...cellComponentProps} key={rowIndex} Component={CellComponent} rowIndex={rowIndex} />;
    }
  });
  return elements;
};

export default renderCells;