import * as React from 'react';
import useResizer from '../hooks/useResizer';
import useAsyncLoad from '../hooks/useAsyncLoad';
import useScroller from '../hooks/useScroller';
import { ScrollerCustomProps } from '../types';
import {
  UseGridScrollerProps,
  GridScrollerRowRenderProps,
  GridScrollerSyncPropsBase,
  GridScrollerAsyncPropsBase,
  GridScrollerRenderProps,
} from './types';
import GridScrollerContainer from './GridScrollerContainer';
import renderCells from './renderCells';

export type GridScrollerProps<T> =
  ScrollerCustomProps &
  UseGridScrollerProps &
  GridScrollerSyncPropsBase<T> &
  GridScrollerRowRenderProps &
  GridScrollerRenderProps<T>;

export type GridScrollerAsyncProps<T> =
  ScrollerCustomProps &
  UseGridScrollerProps &
  GridScrollerAsyncPropsBase<T> &
  GridScrollerRowRenderProps &
  GridScrollerRenderProps<T>;

const defaultArray: number[] = [];

const GridScroller = <T extends unknown>({
  value: valueProp,
  itemsPerPage,
  loadPage,
  loadTimeout,
  rowsSizes = defaultArray,
  columnsSizes = defaultArray,
  defaultRowHeight,
  defaultColumnWidth,
  totalRows,
  totalColumns,
  overscroll,
  focusedCell,
  RowComponent,
  rowComponentProps,
  CellComponent,
  cellComponentProps,
  render,
  scrollerContainerRef: scrollerContainerRefProp,
  scrollerContainerProps,
  scrollAreaProps,
  visibleAreaProps,
  gridLayout,
}: GridScrollerProps<T> | GridScrollerAsyncProps<T>): ReturnType<React.FC> => {
  const {
    visibleRowsIndexes,
    visibleColumnsIndexes,
    onScroll,
    scrollAreaStyle,
    visibleAreaStyle,
    scrollerContainerRef,
    onRowsScrollDataChange,
    onColumnsScrollDataChange,
    rowsScroller,
    columnsScroller,
  } = useScroller({
    scrollerContainerRef: scrollerContainerRefProp,
    defaultRowHeight,
    defaultColumnWidth,
    totalRows,
    totalColumns,
    rowsSizes,
    columnsSizes,
    overscroll,
    focusedCell,
    gridLayout,
  });

  useResizer({
    scrollerContainerRef,
    rowsScroller,
    columnsScroller,
    onRowsScrollDataChange,
    onColumnsScrollDataChange,
  });

  const { value: asyncValue } = useAsyncLoad<T[]>({
    visibleIndexes: visibleRowsIndexes,
    itemsPerPage,
    totalCount: totalRows,
    loadPage,
    loadTimeout,
  });

  const value = valueProp || asyncValue;

  const elements = renderCells({
    visibleRowsIndexes,
    visibleColumnsIndexes,
    defaultRowHeight,
    defaultColumnWidth,
    rowsSizes,
    columnsSizes,
    value,
    RowComponent: gridLayout ? React.Fragment : RowComponent,
    rowComponentProps,
    ...render ? { render } : { CellComponent, cellComponentProps },
  });

  return (
    <GridScrollerContainer
      containerRef={scrollerContainerRef}
      onScroll={onScroll}
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
    </GridScrollerContainer>
  );
};

export default GridScroller;
