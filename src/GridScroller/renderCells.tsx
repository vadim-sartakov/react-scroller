import {
  GridScrollerRowRenderProps,
  GridScrollerRenderProps,
} from './types';
import GridScrollerCell from './GridScrollerCell';

type RenderCellsArgs<T> = GridScrollerRowRenderProps & GridScrollerRenderProps<T> & {
  visibleRowsIndexes: number[];
  visibleColumnsIndexes: number[];
};

const renderCells = <T extends unknown>({
  visibleRowsIndexes,
  visibleColumnsIndexes,
  RowComponent = 'div',
  rowComponentProps,
  ...props
}: RenderCellsArgs<T>) => {
  const elements = visibleRowsIndexes.map((rowIndex, curRowIndex) => (
    <RowComponent key={curRowIndex} {...rowComponentProps}>
      {visibleColumnsIndexes.map(
        (columnIndex, curColumnIndex) => (
          <GridScrollerCell
            key={curColumnIndex}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            {...props}
          />
        ),
      )}
    </RowComponent>
  ));
  return elements;
};

export default renderCells;
