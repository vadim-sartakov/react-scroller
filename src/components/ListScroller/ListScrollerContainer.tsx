import React, { useMemo, forwardRef } from 'react';
import ListScrollerContext from './ListScrollerContext';
import { ListScrollerProps } from './types';

const defaultArray: number[] = [];

export interface ListScrollerContainerProps extends
  React.HTMLAttributes<HTMLDivElement>, Pick<ListScrollerProps,
  'value'
  | 'height'
  | 'defaultRowHeight'
  | 'rowsSizes'> {}

const ListScrollerContainer = forwardRef<HTMLDivElement, ListScrollerContainerProps>(({
  value,
  height,
  defaultRowHeight,
  rowsSizes = defaultArray,
  onScroll,
  style,
  ...props
}, ref) => {
  const contextValue = useMemo(() => ({
    value,
    defaultRowHeight,
    rowsSizes,
  }), [value, defaultRowHeight, rowsSizes]);

  return (
    <ListScrollerContext.Provider value={contextValue}>
      <div
        ref={ref}
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
});

export default ListScrollerContainer;
