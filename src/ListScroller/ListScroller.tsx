import React, { forwardRef } from 'react';
import { ListScrollerProps as ListScrollerPropsBase } from './types';
import { ListScrollerRowComponentProps } from './ListScrollerRow';
import useListScroller from './useListScroller';
import ListScrollerContainer from './ListScrollerContainer';
import renderRows from './renderRows';

const defaultArray: number[] = [];

export interface ListScrollerProps extends
  ListScrollerPropsBase, React.HTMLAttributes<HTMLDivElement> {
  RowComponent: React.FC<ListScrollerRowComponentProps>;
  rowComponentProps?: Object;
}

const ListScroller = forwardRef<HTMLDivElement, ListScrollerProps>(({
  style,
  className,
  height,
  rowsSizes = defaultArray,
  value,
  defaultRowHeight,
  totalRows,
  overscroll,
  focusedCell,
  RowComponent,
  rowComponentProps,
  rowsScrollData,
  onRowsScrollDataChange,
  ...props
}, ref) => {
  const {
    visibleRowsIndexes,
    onScroll,
    scrollAreaStyle,
    visibleAreaStyle,
    scrollerContainerRef,
  } = useListScroller({
    scrollerContainerRef: typeof ref === 'function' ? undefined : ref,
    value,
    height,
    defaultRowHeight,
    totalRows,
    rowsSizes,
    overscroll,
    focusedCell,
    rowsScrollData,
    onRowsScrollDataChange,
  });

  const elements = renderRows({
    visibleRowsIndexes,
    RowComponent,
    rowComponentProps,
  });

  return (
    <ListScrollerContainer
      ref={scrollerContainerRef}
      style={style}
      className={className}
      value={value}
      rowsSizes={rowsSizes}
      defaultRowHeight={defaultRowHeight}
      onScroll={onScroll}
      height={height}
      {...props}
    >
      <div style={scrollAreaStyle}>
        <div style={visibleAreaStyle}>
          {elements}
        </div>
      </div>
    </ListScrollerContainer>
  );
});

export default ListScroller;
