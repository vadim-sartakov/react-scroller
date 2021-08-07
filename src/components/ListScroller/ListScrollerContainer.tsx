import { useMemo } from 'react';
import * as React from 'react';
import ListScrollerContext from './ListScrollerContext';
import { ListScrollerPropsBase, ListScrollerSyncPropsBase } from './types';

const defaultArray: number[] = [];

export interface ListScrollerContainerProps<T> extends
  React.HTMLAttributes<HTMLDivElement>,
  Pick<ListScrollerSyncPropsBase<T>, 'value'>,
  Pick<ListScrollerPropsBase,
  | 'height'
  | 'width'
  | 'defaultRowHeight'
  | 'rowsSizes'> {
  containerRef?: React.MutableRefObject<HTMLDivElement>,
}

const ListScrollerContainer = <T extends unknown>({
  value,
  height,
  width,
  defaultRowHeight,
  rowsSizes = defaultArray,
  onScroll,
  style,
  containerRef,
  ...props
}: ListScrollerContainerProps<T>) => {
  const contextValue = useMemo(() => ({
    value,
    defaultRowHeight,
    rowsSizes,
  }), [value, defaultRowHeight, rowsSizes]);

  return (
    <ListScrollerContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        style={{
          width,
          height,
          overflow: height && 'auto',
          ...style,
        }}
        onScroll={onScroll}
        {...props}
      />
    </ListScrollerContext.Provider>
  );
};

export default ListScrollerContainer;
