import React from 'react';
import useResizer from '../../hooks/useResizer';
import useAsyncLoad from '../../hooks/useAsyncLoad';
import useScroller from '../../hooks/useScroller';
import {
  GridScrollerProps,
  GridScrollerAsyncProps,
  GridScrollerComponentRenderProps,
  GridScrollerRowRenderProps,
  GridScrollerRenderFuncProps,
} from './types';
import GridScrollerContainer from './GridScrollerContainer';
import renderCells from './renderCells';

interface GridScrollerBase<T> extends GridScrollerProps<T>, GridScrollerRowRenderProps {}
interface GridScrollerAsyncBase<T> extends GridScrollerAsyncProps<T>, GridScrollerRowRenderProps {}

interface GridScrollerType {
  <T>(props: GridScrollerBase<T> & GridScrollerComponentRenderProps<T>): ReturnType<React.FC>;
  <T>(props: GridScrollerBase<T> & GridScrollerRenderFuncProps<T>): ReturnType<React.FC>;
  <T>(props: GridScrollerAsyncBase<T> & GridScrollerComponentRenderProps<T>): ReturnType<React.FC>;
  <T>(props: GridScrollerAsyncBase<T> & GridScrollerRenderFuncProps<T>): ReturnType<React.FC>;
}

const defaultArray: number[] = [];

const GridScroller: GridScrollerType = <T extends unknown>({
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
      <div style={scrollAreaStyle}>
        <div style={visibleAreaStyle}>
          {elements}
        </div>
      </div>
    </GridScrollerContainer>
  );
};

export default GridScroller;
