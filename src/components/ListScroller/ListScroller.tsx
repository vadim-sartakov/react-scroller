import React from 'react';
import useScroller from 'hooks/useScroller';
import useAsyncLoad from 'hooks/useAsyncLoad';
import useResizer from 'hooks/useResizer';
import {
  ListScrollerProps,
  ListScrollerAsyncProps,
  ListScrollerComponentRenderProps,
  ListScrollerRenderFuncProps,
} from './types';
import ListScrollerContainer from './ListScrollerContainer';
import renderRows from './renderRows';

interface ListScrollerType {
  <T>(props: ListScrollerProps<T> & ListScrollerComponentRenderProps<T>): ReturnType<React.FC>;
  <T>(props: ListScrollerProps<T> & ListScrollerRenderFuncProps<T>): ReturnType<React.FC>;
  <T>(props: ListScrollerAsyncProps<T> & ListScrollerComponentRenderProps<T>): ReturnType<React.FC>;
  <T>(props: ListScrollerAsyncProps<T> & ListScrollerRenderFuncProps<T>): ReturnType<React.FC>;
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
  onRowsScrollDataChange: onRowsScrollDataChangeProp,
}: ListScrollerProps<T> &
ListScrollerAsyncProps<T> &
ListScrollerComponentRenderProps<T> &
ListScrollerRenderFuncProps<T>): ReturnType<React.FC> => {
  const {
    visibleRowsIndexes,
    onScroll,
    scrollAreaStyle,
    visibleAreaStyle,
    scrollerContainerRef,
    rowsScroller,
    onRowsScrollDataChange,
  } = useScroller({
    scrollerContainerRef: scrollerContainerRefProp,
    height,
    defaultRowHeight,
    totalRows,
    rowsSizes,
    overscroll,
    focusedCell,
    rowsScrollData,
    onRowsScrollDataChange: onRowsScrollDataChangeProp,
  });

  useResizer({
    scrollerContainerRef,
    rowsScroller,
    height,
    onRowsScrollDataChange,
  });

  const { value: asyncValue } = useAsyncLoad({
    visibleIndexes: visibleRowsIndexes,
    itemsPerPage,
    totalCount: totalRows,
    loadPage,
  });

  const elements = render ? renderRows({
    visibleRowsIndexes,
    render,
  }) : renderRows({
    visibleRowsIndexes,
    RowComponent,
    rowComponentProps,
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
