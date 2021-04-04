import React from 'react';
import {
  GridScrollerProps,
  GridScrollerAsyncProps,
  GridScrollerComponentRenderProps,
  GridScrollerRowRenderProps,
  GridScrollerRenderFuncProps,
} from './types';
import useGridScroller from './useGridScroller';
import GridScrollerContainer from './GridScrollerContainer';
import renderCells from './renderCells';

interface GridScrollerBase<T> extends GridScrollerProps<T>, GridScrollerRowRenderProps {}
interface GridScrollerAsyncBase<T> extends GridScrollerAsyncProps<T>, GridScrollerRowRenderProps {}

interface GridScrollerType {
  <T>(
    props: GridScrollerBase<T> &
    GridScrollerComponentRenderProps<T>
  ): ReturnType<React.FC>;
  <T>(
    props: GridScrollerBase<T> &
    GridScrollerRenderFuncProps<T>
  ): ReturnType<React.FC>;
  <T>(
    props: GridScrollerAsyncBase<T> &
    GridScrollerComponentRenderProps<T>
  ): ReturnType<React.FC>;
  <T>(
    props: GridScrollerAsyncBase<T> &
    GridScrollerRenderFuncProps<T>
  ): ReturnType<React.FC>;
}

const defaultArray: number[] = [];

const GridScroller: GridScrollerType = <T extends unknown>({
  width,
  height,
  value,
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
  onRowsScrollDataChange,
  columnsScrollData,
  onColumnsScrollDataChange,
  scrollerContainerRef: scrollerContainerRefProp,
  scrollerContainerProps,
}: GridScrollerBase<T> &
GridScrollerAsyncBase<T> &
GridScrollerComponentRenderProps<T> &
GridScrollerRenderFuncProps<T>): ReturnType<React.FC> => {
  const {
    visibleRowsIndexes,
    visibleColumnsIndexes,
    onScroll,
    scrollAreaStyle,
    visibleAreaStyle,
    scrollerContainerRef,
  } = useGridScroller({
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
    onRowsScrollDataChange,
    columnsScrollData,
    onColumnsScrollDataChange,
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
      value={value}
      rowsSizes={rowsSizes}
      columnsSizes={columnsSizes}
      defaultRowHeight={defaultRowHeight}
      defaultColumnWidth={defaultColumnWidth}
      onScroll={onScroll}
      width={width}
      height={height}
      {...scrollerContainerProps}
    >
      <div style={scrollAreaStyle}>
        <div style={visibleAreaStyle}>
          {elements}
        </div>
      </div>
    </GridScrollerContainer>
  );
};

export default GridScroller;
