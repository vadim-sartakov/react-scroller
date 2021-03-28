import React from 'react';
import { ListScrollerProps } from './types';
import useListScroller from './useListScroller';
import ListScrollerContainer from './ListScrollerContainer';
import renderRows from './renderRows';

const defaultArray: number[] = [];

const ListScroller = <T extends unknown>({
  height,
  rowsSizes = defaultArray,
  scrollerContainerRef: scrollerContainerRefProp,
  scrollerContainerProps,
  value,
  defaultRowHeight,
  totalRows,
  overscroll,
  focusedCell,
  RowComponent,
  rowComponentProps,
  rowsScrollData,
  onRowsScrollDataChange,
}: ListScrollerProps<T>): ReturnType<React.FC> => {
  const {
    visibleRowsIndexes,
    onScroll,
    scrollAreaStyle,
    visibleAreaStyle,
    scrollerContainerRef,
  } = useListScroller({
    scrollerContainerRef: scrollerContainerRefProp,
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
      value={value}
      rowsSizes={rowsSizes}
      defaultRowHeight={defaultRowHeight}
      onScroll={onScroll}
      height={height}
      containerRef={scrollerContainerRef}
      {...scrollerContainerProps}
    >
      <div style={scrollAreaStyle}>
        <div style={visibleAreaStyle}>
          {elements}
        </div>
      </div>
    </ListScrollerContainer>
  );
};

export default ListScroller;
