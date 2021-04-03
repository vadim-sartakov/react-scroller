import React from 'react';
import { GridScrollerProps, GridScrollerAsyncProps } from './types';
import useGridScroller from './useGridScroller';
import GridScrollerContainer from './GridScrollerContainer';
import renderCells from './renderCells';

interface GridScrollerType {
  <T>(props: GridScrollerProps<T>): ReturnType<React.FC>;
  <T>(props: GridScrollerAsyncProps<T>): ReturnType<React.FC>;
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
}: GridScrollerAsyncProps<T> & GridScrollerProps<T>): ReturnType<React.FC> => {
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

  const elements = renderCells({
    visibleRowsIndexes,
    visibleColumnsIndexes,
    RowComponent,
    rowComponentProps,
    CellComponent,
    cellComponentProps,
    render,
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
