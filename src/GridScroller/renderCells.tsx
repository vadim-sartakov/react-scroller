import * as React from 'react';
import {
  GridScrollerRowRenderProps,
  GridScrollerRenderProps,
  GridScrollerSizesProps,
} from './types';
import GridScrollerCell from './GridScrollerCell';

type RenderCellsArgs<T> = GridScrollerRowRenderProps &
GridScrollerRenderProps<T> &
Pick<GridScrollerSizesProps, 'rowsSizes' | 'columnsSizes' | 'defaultRowHeight' | 'defaultColumnWidth'> &
{
  value: T[][];
  visibleRowsIndexes: number[];
  visibleColumnsIndexes: number[];
};

const renderCells = <T extends unknown>({
  value,
  visibleRowsIndexes,
  visibleColumnsIndexes,
  RowComponent = 'div',
  rowComponentProps,
  rowsSizes,
  columnsSizes,
  defaultRowHeight,
  defaultColumnWidth,
  ...props
}: RenderCellsArgs<T>) => {
  const elements = visibleRowsIndexes.map(rowIndex => {
    const height = rowsSizes?.[rowIndex] || defaultRowHeight;
    return (
      <RowComponent key={rowIndex} {...rowComponentProps}>
        {visibleColumnsIndexes.map(columnIndex => {
          const width = columnsSizes?.[columnIndex] || defaultColumnWidth;
          const cellValue = value[rowIndex]?.[columnIndex];
          return (
            <GridScrollerCell
              key={columnIndex}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              width={width}
              height={height}
              value={cellValue}
              {...props}
            />
          );
        })}
      </RowComponent>
    );
  });
  return elements;
};

export default renderCells;
