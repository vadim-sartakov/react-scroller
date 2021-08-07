import { useContext, useMemo } from 'react';
import * as React from 'react';
import { ListScrollerRenderProps } from './types';
import {
  isComponentRenderProps,
  isRenderFuncProps,
} from './utils';
import ListScrollerContext from './ListScrollerContext';

interface ListScrollerRowPropsBase extends React.HTMLAttributes<HTMLElement> {
  rowIndex: number;
}

type ListScrollerRowProps<T> = ListScrollerRowPropsBase & ListScrollerRenderProps<T>;

const ListScrollerRow = <T extends unknown>({
  style,
  rowIndex,
  ...props
}: ListScrollerRowProps<T>): ReturnType<React.FC> => {
  const {
    value,
    defaultRowHeight,
    rowsSizes,
  } = useContext(ListScrollerContext);

  const height = rowsSizes[rowIndex] || defaultRowHeight;
  const nextStyle = useMemo(() => ({ height, ...style }), [height, style]);
  const rowValue = value[rowIndex];

  if (isComponentRenderProps(props)) {
    const { RowComponent, rowComponentProps } = props;
    return (
      <RowComponent
        style={nextStyle}
        value={rowValue}
        rowIndex={rowIndex}
        {...rowComponentProps}
      />
    );
  }

  if (isRenderFuncProps(props)) {
    const { render } = props;
    return render({
      rowIndex,
      style: nextStyle,
      value: rowValue,
    });
  }

  throw Error('Either Component prop or render should be provided');
};

export default React.memo(ListScrollerRow);
