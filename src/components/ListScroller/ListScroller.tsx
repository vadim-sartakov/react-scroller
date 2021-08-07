import * as React from 'react';
import useScroller from '../../hooks/useScroller';
import useAsyncLoad from '../../hooks/useAsyncLoad';
import useResizer from '../../hooks/useResizer';
import {
  ListScrollerPropsBase,
  ListScrollerSyncPropsBase,
  ListScrollerAsyncPropsBase,
  ListScrollerRenderProps,
} from './types';
import ListScrollerContainer from './ListScrollerContainer';
import renderRows from './renderRows';

export type ListScrollerProps<T> =
ListScrollerPropsBase &
ListScrollerRenderProps<T> &
ListScrollerSyncPropsBase<T>;

export type ListScrollerAsyncProps<T> =
ListScrollerPropsBase &
ListScrollerRenderProps<T> &
ListScrollerAsyncPropsBase<T>;

const defaultArray: number[] = [];

const ListScroller = <T extends unknown>({
  value,
  loadPage,
  itemsPerPage,
  height,
  width,
  rowsSizes = defaultArray,
  scrollerContainerRef: scrollerContainerRefProp,
  scrollerContainerProps,
  defaultRowHeight,
  totalRows,
  overscroll,
  focusedCell,
  rowsScrollData,
  onRowsScrollDataChange: onRowsScrollDataChangeProp,
  render,
  RowComponent,
  rowComponentProps,
  scrollAreaProps,
  visibleAreaProps,
}: ListScrollerProps<T> | ListScrollerAsyncProps<T>): ReturnType<React.FC> => {
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

  let elements: React.ReactElement[];
  if (render) {
    elements = renderRows({
      visibleRowsIndexes,
      render,
    });
  }

  if (RowComponent) {
    elements = renderRows({
      visibleRowsIndexes,
      RowComponent,
      rowComponentProps,
    });
  }

  return (
    <ListScrollerContainer
      value={value || asyncValue}
      rowsSizes={rowsSizes}
      defaultRowHeight={defaultRowHeight}
      onScroll={onScroll}
      height={height}
      width={width}
      containerRef={scrollerContainerRef}
      {...scrollerContainerProps}
    >
      <div
        {...scrollAreaProps}
        style={{
          ...scrollAreaProps?.style,
          ...scrollAreaStyle,
        }}
      >
        <div
          {...visibleAreaProps}
          style={{
            ...visibleAreaProps?.style,
            ...visibleAreaStyle,
          }}
        >
          {elements}
        </div>
      </div>
    </ListScrollerContainer>
  );
};

export default ListScroller;
