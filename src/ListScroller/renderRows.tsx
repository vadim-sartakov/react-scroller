import React from 'react';
import ListScrollerRow, { ListScrollerRowComponentProps } from './ListScrollerRow';

export interface RenderRowsArgs<T> {
  visibleRowsIndexes: number[];
  RowComponent: React.FC<ListScrollerRowComponentProps<T>>;
  rowComponentProps: Object;
}

function renderRows<T>({
  visibleRowsIndexes,
  RowComponent,
  rowComponentProps,
}: RenderRowsArgs<T>) {
  const elements = visibleRowsIndexes.map((rowIndex) => (
    <ListScrollerRow
      key={rowIndex}
      rowIndex={rowIndex}
      RowComponent={RowComponent}
      rowComponentProps={rowComponentProps}
    />
  ));
  return elements;
}

export default renderRows;
