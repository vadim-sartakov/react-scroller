import React from 'react';
import { GridScrollerProps } from './types';
import useGridScroller from './useGridScroller';
import GridScrollerContainer from './GridScrollerContainer';
import renderCells from './renderCells';

const defaultArray: number[] = [];

const GridScroller = <T extends unknown>({
  width,
  height,
  rowsSizes = defaultArray,
  columnsSizes = defaultArray,
  value,
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
  rowsScrollData,
  onRowsScrollDataChange,
  columnsScrollData,
  onColumnsScrollDataChange,
  scrollerContainerRef: scrollerContainerRefProp,
  scrollerContainerProps,
}: GridScrollerProps<T>): ReturnType<React.FC> => {
  const {
    visibleRowsIndexes,
    visibleColumnsIndexes,
    onScroll,
    scrollAreaStyle,
    visibleAreaStyle,
    scrollerContainerRef,
  } = useGridScroller({
    scrollerContainerRef: scrollerContainerRefProp,
    value,
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
