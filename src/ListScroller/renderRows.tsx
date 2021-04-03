import React from 'react';
import ListScrollerRow, { ListScrollerRenderProps } from './ListScrollerRow';

export interface RenderRowsArgs<T> {
  visibleRowsIndexes: number[];
  RowComponent?: React.FC<ListScrollerRenderProps<T>>;
  rowComponentProps?: Object;
  render?: (props: ListScrollerRenderProps<T>) => ReturnType<React.FC>;
}

function renderRows<T>({
  visibleRowsIndexes,
  RowComponent,
  rowComponentProps,
  render,
}: RenderRowsArgs<T>) {
  const elements = visibleRowsIndexes.map((rowIndex, curRowIndex) => (
    <ListScrollerRow
      key={curRowIndex}
      rowIndex={rowIndex}
      RowComponent={RowComponent}
      rowComponentProps={rowComponentProps}
      render={render}
    />
  ));
  return elements;
}

export default renderRows;
