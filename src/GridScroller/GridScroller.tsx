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
  width,
  height,
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
  rowsScrollData,
  onRowsScrollDataChange: onRowsScrollDataChangeProp,
  columnsScrollData,
  onColumnsScrollDataChange: onColumnsScrollDataChangeProp,
  scrollerContainerRef: scrollerContainerRefProp,
  scrollerContainerProps,
  scrollAreaProps,
  visibleAreaProps,
  onScroll: onScrollProp,
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
    height,
    width,
    defaultRowHeight,
    defaultColumnWidth,
    totalRows,
    totalColumns,
    rowsSizes,
    columnsSizes,
    overscroll,
    focusedCell,
    rowsScrollData,
    onRowsScrollDataChange: onRowsScrollDataChangeProp,
    columnsScrollData,
    onColumnsScrollDataChange: onColumnsScrollDataChangeProp,
    onScroll: onScrollProp,
    gridLayout,
  });

  useResizer({
    scrollerContainerRef,
    rowsScroller,
    columnsScroller,
    width,
    height,
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

  const elements = render ? renderCells({
    visibleRowsIndexes,
    visibleColumnsIndexes,
    defaultRowHeight,
    defaultColumnWidth,
    rowsSizes,
    columnsSizes,
    value,
    RowComponent,
    rowComponentProps,
    render,
  }) : renderCells({
    visibleRowsIndexes,
    visibleColumnsIndexes,
    defaultRowHeight,
    defaultColumnWidth,
    rowsSizes,
    columnsSizes,
    value,
    RowComponent,
    rowComponentProps,
    CellComponent,
    cellComponentProps,
  });

  return (
    <GridScrollerContainer
      containerRef={scrollerContainerRef}
      onScroll={onScroll}
      width={width}
      height={height}
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
