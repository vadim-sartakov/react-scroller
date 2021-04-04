import React from 'react';
import {
  GridScrollerRowRenderProps,
  GridScrollerComponentRenderProps,
  GridScrollerRenderFuncProps,
} from './types';
import GridScrollerCell from './GridScrollerCell';

interface RenderCellsArgs extends GridScrollerRowRenderProps {
  visibleRowsIndexes: number[];
  visibleColumnsIndexes: number[];
}

interface RenderCellsType {
  <T>(args: RenderCellsArgs & GridScrollerComponentRenderProps<T>): ReturnType<React.FC>[];
  <T>(args: RenderCellsArgs & GridScrollerRenderFuncProps<T>): ReturnType<React.FC>[];
}

const renderCells: RenderCellsType = <T extends unknown>({
  visibleRowsIndexes,
  visibleColumnsIndexes,
  RowComponent = 'div',
  rowComponentProps,
  CellComponent,
  cellComponentProps,
  render,
}: RenderCellsArgs & GridScrollerComponentRenderProps<T> & GridScrollerRenderFuncProps<T>) => {
  const elements = visibleRowsIndexes.map((rowIndex, curRowIndex) => (
    <RowComponent key={curRowIndex} {...rowComponentProps}>
      {visibleColumnsIndexes.map(
        (columnIndex, curColumnIndex) => (
          <GridScrollerCell
            key={curColumnIndex}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            {...render && {
              render,
            }}
            {...!render && {
              CellComponent,
              cellComponentProps,
            }}
          />
        ),
      )}
    </RowComponent>
  ));
  return elements;
};

export default renderCells;
