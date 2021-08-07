import { useContext, useMemo } from 'react';
import * as React from 'react';
import { ListScrollerRenderProps } from './types';
import ListScrollerContext from './ListScrollerContext';

type ListScrollerRowProps<T> = ListScrollerRenderProps<T> & {
  rowIndex: number;
};

const ListScrollerRow = <T extends unknown>({
  rowIndex,
  RowComponent,
  rowComponentProps,
  render,
}: ListScrollerRowProps<T>): ReturnType<React.FC> => {
  const {
    value,
    defaultRowHeight,
    rowsSizes,
  } = useContext(ListScrollerContext);

  const height = rowsSizes[rowIndex] || defaultRowHeight;
  const nextStyle = useMemo(() => ({ height }), [height]);
  const rowValue = value[rowIndex];

  if (RowComponent) {
    return (
      <RowComponent
        style={nextStyle}
        value={rowValue}
        rowIndex={rowIndex}
        {...rowComponentProps}
      />
    );
  }

  if (render) {
    return render({
      rowIndex,
      style: nextStyle,
      value: rowValue,
    });
  }

  throw Error('Either Component prop or render function should be provided');
};

export default React.memo(ListScrollerRow);
