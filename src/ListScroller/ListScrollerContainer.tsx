import React, { useMemo } from 'react';
import ListScrollerContext from './ListScrollerContext';
import { ListScrollerProps } from './types';

const defaultArray: number[] = [];

export interface ListScrollerContainerProps<T> extends
  React.HTMLAttributes<HTMLDivElement>, Pick<ListScrollerProps<T>,
  'value'
  | 'height'
  | 'defaultRowHeight'
  | 'rowsSizes'> {
  containerRef?: React.Ref<HTMLDivElement>,
}

const ListScrollerContainer = <T extends unknown>({
  value,
  height,
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
