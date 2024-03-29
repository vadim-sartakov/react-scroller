import * as React from 'react';
import useScroller from '../hooks/useScroller';
import useAsyncLoad from '../hooks/useAsyncLoad';
import useResizer from '../hooks/useResizer';
import { ScrollerCustomProps } from '../types';
import {
  UseListScrollerProps,
  ListScrollerSyncPropsBase,
  ListScrollerAsyncPropsBase,
  ListScrollerRenderProps,
} from './types';
import ListScrollerContainer from './ListScrollerContainer';
import renderRows from './renderRows';

export type ListScrollerProps<T> =
ScrollerCustomProps &
UseListScrollerProps &
ListScrollerRenderProps<T> &
ListScrollerSyncPropsBase<T>;

export type ListScrollerAsyncProps<T> =
ScrollerCustomProps &
UseListScrollerProps &
ListScrollerRenderProps<T> &
ListScrollerAsyncPropsBase<T>;

const defaultArray: number[] = [];

const ListScroller = <T extends unknown>({
  value: valueProp,
  loadPage,
  itemsPerPage,
  loadTimeout,
  rowsSizes = defaultArray,
  scrollerContainerRef: scrollerContainerRefProp,
  scrollerContainerProps,
  defaultRowHeight,
  totalRows,
  overscroll,
  focusedCell,
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
    defaultRowHeight,
    totalRows,
    rowsSizes,
    overscroll,
    focusedCell,
  });

  useResizer({
    scrollerContainerRef,
    rowsScroller,
    onRowsScrollDataChange,
  });

  const { value: asyncValue } = useAsyncLoad({
    visibleIndexes: visibleRowsIndexes,
    itemsPerPage,
    totalCount: totalRows,
    loadPage,
    loadTimeout,
  });

  const value = valueProp || asyncValue;

  let elements: React.ReactElement[];
  if (render) {
    elements = renderRows({
      value,
      defaultRowHeight,
      rowsSizes,
      visibleRowsIndexes,
      render,
    });
  }

  if (RowComponent) {
    elements = renderRows({
      value,
      defaultRowHeight,
      rowsSizes,
      visibleRowsIndexes,
      RowComponent,
      rowComponentProps,
    });
  }

  return (
    <ListScrollerContainer
      onScroll={onScroll}
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
