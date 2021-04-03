import React, { useContext, useMemo } from 'react';
import ListScrollerContext from './ListScrollerContext';

export interface ListScrollerRenderProps<T> {
  value: T;
  style: React.CSSProperties;
  rowIndex: number;
}

export interface ListScrollerRowProps<T> extends React.HTMLAttributes<HTMLElement> {
  rowIndex: number;
  RowComponent?: React.FC<ListScrollerRenderProps<T>>;
  rowComponentProps?: Object;
  render?: (props: ListScrollerRenderProps<T>) => ReturnType<React.FC>;
}

const ListScrollerRow = <T extends unknown>({
  style,
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
  const nextStyle = useMemo(() => ({ height, ...style }), [height, style]);
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
  } else if (render) {
    return render({
      rowIndex,
      style: nextStyle,
      value: rowValue,
    });
  } else {
    throw Error('Either Component prop or render should be provided');
  }
};

const Wrapper = React.memo(ListScrollerRow) as typeof ListScrollerRow;

export default Wrapper;
