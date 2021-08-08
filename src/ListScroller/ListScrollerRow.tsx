import { useMemo } from 'react';
import * as React from 'react';
import { ListScrollerRenderProps } from './types';

type ListScrollerRowProps<T> = ListScrollerRenderProps<T> & {
  rowIndex: number;
  value: T;
  height: number;
};

const ListScrollerRow = <T extends unknown>({
  rowIndex,
  RowComponent,
  rowComponentProps,
  render,
  height,
  value,
}: ListScrollerRowProps<T>): ReturnType<React.FC> => {
  const nextStyle = useMemo(() => ({ height }), [height]);
  if (RowComponent) {
    return (
      <RowComponent
        style={nextStyle}
        value={value}
        rowIndex={rowIndex}
        {...rowComponentProps}
      />
    );
  }

  if (render) {
    return render({
      rowIndex,
      style: nextStyle,
      value,
    });
  }

  throw Error('Either Component prop or render function should be provided');
};

export default React.memo(ListScrollerRow);
