import React from 'react';
import ListScrollerRow, { ListScrollerRowComponentProps } from './ListScrollerRow';

export interface RenderRowsArgs {
  visibleRowsIndexes: number[];
  RowComponent: React.FC<ListScrollerRowComponentProps>;
  rowComponentProps: Object;
}

function renderRows({
  visibleRowsIndexes,
  RowComponent,
  rowComponentProps,
}: RenderRowsArgs) {
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
