import React, { useContext, useMemo } from 'react';
import { ListScrollerComponentRenderProps, ListScrollerRenderFuncProps } from './types';
import ListScrollerContext from './ListScrollerContext';

interface ListScrollerRowProps extends React.HTMLAttributes<HTMLElement> {
  rowIndex: number;
}

interface ListScrollerRowType {
  <T>(props: ListScrollerRowProps & ListScrollerComponentRenderProps<T>): ReturnType<React.FC>;
  <T>(props: ListScrollerRowProps & ListScrollerRenderFuncProps<T>): ReturnType<React.FC>;
}

const ListScrollerRow: ListScrollerRowType = <T extends unknown>({
  style,
  rowIndex,
  RowComponent,
  rowComponentProps,
  render,
}: ListScrollerRowProps &
ListScrollerComponentRenderProps<T> &
ListScrollerRenderFuncProps<T>): ReturnType<React.FC> => {
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

const Wrapper = React.memo(ListScrollerRow) as unknown as ListScrollerRowType;

export default Wrapper;
