import { ListScrollerRenderProps, ListScrollerSizesProps } from './types';
import ListScrollerRow from './ListScrollerRow';

interface RenderRowsArgsBase<T> extends Pick<ListScrollerSizesProps, 'defaultRowHeight' | 'rowsSizes'> {
  visibleRowsIndexes: number[];
  value: T[];
}

type RenderRowsType<T> = RenderRowsArgsBase<T> & ListScrollerRenderProps<T>;

const renderRows = <T extends unknown>({
  visibleRowsIndexes,
  rowsSizes,
  defaultRowHeight,
  value,
  ...args
}: RenderRowsType<T>) => {
  const elements = visibleRowsIndexes.map(rowIndex => {
    const height = rowsSizes[rowIndex] || defaultRowHeight;
    const rowValue = value[rowIndex];
    return (
      <ListScrollerRow
        key={rowIndex}
        rowIndex={rowIndex}
        height={height}
        value={rowValue}
        {...args}
      />
    );
  });
  return elements;
};

export default renderRows;
