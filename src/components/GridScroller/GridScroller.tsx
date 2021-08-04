import React from 'react';
import useResizer from '../../hooks/useResizer';
import useAsyncLoad from '../../hooks/useAsyncLoad';
import useScroller from '../../hooks/useScroller';
import {
  GridScrollerPropsBase,
  GridScrollerRowRenderProps,
  GridScrollerSyncPropsBase,
  GridScrollerAsyncPropsBase,
  GridScrollerRenderProps,
} from './types';
import GridScrollerContainer from './GridScrollerContainer';
import renderCells from './renderCells';

export type GridScrollerProps<T> =
  GridScrollerPropsBase &
  GridScrollerSyncPropsBase<T> &
  GridScrollerRowRenderProps &
  GridScrollerRenderProps<T>;

export type GridScrollerAsyncProps<T> =
  GridScrollerPropsBase &
  GridScrollerAsyncPropsBase<T> &
  GridScrollerRowRenderProps &
  GridScrollerRenderProps<T>;

const defaultArray: number[] = [];

const GridScroller = <T extends unknown>({
  width,
  height,
  value,
  itemsPerPage,
  loadPage,
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
  });

  const elements = render ? renderCells({
    visibleRowsIndexes,
    visibleColumnsIndexes,
    RowComponent,
    rowComponentProps,
    render,
  }) : renderCells({
    visibleRowsIndexes,
    visibleColumnsIndexes,
    RowComponent,
    rowComponentProps,
    CellComponent,
    cellComponentProps,
  });

  return (
    <GridScrollerContainer
      containerRef={scrollerContainerRef}
      value={value || asyncValue}
      rowsSizes={rowsSizes}
      columnsSizes={columnsSizes}
      defaultRowHeight={defaultRowHeight}
      defaultColumnWidth={defaultColumnWidth}
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
