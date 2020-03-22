import React from 'react';
import ScrollerCell from './ScrollerCell';

function renderCells({
  visibleRowsIndexes,
  visibleColumnsIndexes,
  RowComponent = 'div',
  rowComponentProps,
  CellComponent = ScrollerCell,
  cellComponentProps
}) {
  const elements = visibleRowsIndexes.map(rowIndex => {
    if (visibleColumnsIndexes) {
      const columnsElements = visibleColumnsIndexes.map(columnIndex => {
        return <CellComponent key={columnIndex} rowIndex={rowIndex} columnIndex={columnIndex} {...cellComponentProps} />;
      });
      return <RowComponent key={rowIndex} {...rowComponentProps}>{columnsElements}</RowComponent>;
    } else {
      return <CellComponent key={rowIndex} rowIndex={rowIndex} {...cellComponentProps} />;
    }
  });
  return elements;
};

export default renderCells;