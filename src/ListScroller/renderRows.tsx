import React from 'react';
import {
  ListScrollerComponentRenderProps,
  ListScrollerRenderFuncProps,
} from './types';
import ListScrollerRow from './ListScrollerRow';

interface RenderRowsArgs {
  visibleRowsIndexes: number[];
}

interface RenderRowsType {
  <T>(args: RenderRowsArgs & ListScrollerComponentRenderProps<T>): ReturnType<React.FC>[];
  <T>(args: RenderRowsArgs & ListScrollerRenderFuncProps<T>): ReturnType<React.FC>[];
}

const renderRows: RenderRowsType = <T extends unknown>({
  visibleRowsIndexes,
  RowComponent,
  rowComponentProps,
  render,
}: RenderRowsArgs & ListScrollerComponentRenderProps<T> & ListScrollerRenderFuncProps<T>) => {
  const elements = visibleRowsIndexes.map((rowIndex, curRowIndex) => (
    <ListScrollerRow
      key={curRowIndex}
      rowIndex={rowIndex}
      {...render && {
        render,
      }}
      {...!render && {
        RowComponent,
        rowComponentProps,
      }}
    />
  ));
  return elements;
};

export default renderRows;
