import React from 'react';
import useAsyncLoad from 'hooks/useAsyncLoad';
import { ListScrollerProps, ListScrollerAsyncProps } from './types';
import useListScroller from './useListScroller';
import ListScrollerContainer from './ListScrollerContainer';
import renderRows from './renderRows';

interface ListScrollerType {
  <T>(props: ListScrollerProps<T>): ReturnType<React.FC>;
  <T>(props: ListScrollerAsyncProps<T>): ReturnType<React.FC>;
}

const defaultArray: number[] = [];

const ListScroller: ListScrollerType = <T extends unknown>({
  height,
  rowsSizes = defaultArray,
  scrollerContainerRef: scrollerContainerRefProp,
  scrollerContainerProps,
  value,
  defaultRowHeight,
  totalRows,
  overscroll,
  focusedCell,
  itemsPerPage,
  loadPage,
  RowComponent,
  rowComponentProps,
  render,
  rowsScrollData,
  onRowsScrollDataChange,
}: ListScrollerProps<T> & ListScrollerAsyncProps<T>): ReturnType<React.FC> => {
  const {
    visibleRowsIndexes,
    onScroll,
    scrollAreaStyle,
    visibleAreaStyle,
    scrollerContainerRef,
  } = useListScroller({
    scrollerContainerRef: scrollerContainerRefProp,
    height,
    defaultRowHeight,
    totalRows,
    rowsSizes,
    overscroll,
    focusedCell,
    rowsScrollData,
    onRowsScrollDataChange,
  });

  const { value: asyncValue } = useAsyncLoad({
    visibleIndexes: visibleRowsIndexes,
    itemsPerPage,
    totalCount: totalRows,
    loadPage,
  });

  const elements = renderRows({
    visibleRowsIndexes,
    RowComponent,
    rowComponentProps,
    render,
  });

  return (
    <ListScrollerContainer
      value={value || asyncValue}
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
