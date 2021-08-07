import { ListScrollerRenderProps } from './types';
import ListScrollerRow from './ListScrollerRow';

interface RenderRowsArgsBase {
  visibleRowsIndexes: number[];
}

type RenderRowsType<T> = RenderRowsArgsBase & ListScrollerRenderProps<T>;

const renderRows = <T extends unknown>({
  visibleRowsIndexes,
  ...args
}: RenderRowsType<T>) => {
  const elements = visibleRowsIndexes.map((rowIndex, curRowIndex) => (
    <ListScrollerRow
      key={curRowIndex}
      rowIndex={rowIndex}
      {...args}
    />
  ));
  return elements;
};

export default renderRows;
