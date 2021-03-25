import React, { forwardRef } from 'react';
import { GridScrollerProps as GridScrollerPropsBase } from './types';
import { GridScrollerCellComponentProps } from './GridScrollerCell';
import useGridScroller from './useGridScroller';
import GridScrollerContainer from './GridScrollerContainer';
import renderCells from './renderCells';

const defaultArray: number[] = [];

export interface GridScrollerProps extends
  GridScrollerPropsBase, React.HTMLAttributes<HTMLDivElement> {
  RowComponent?: string | React.FC;
  rowComponentProps?: Object;
  CellComponent: React.FC<GridScrollerCellComponentProps>;
  cellComponentProps?: Object;
}

const GridScroller = forwardRef<HTMLDivElement, GridScrollerProps>(({
  style,
  className,
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
  ...props
}, ref) => {
  const {
    visibleRowsIndexes,
    visibleColumnsIndexes,
    onScroll,
    scrollAreaStyle,
    visibleAreaStyle,
    scrollerContainerRef,
  } = useGridScroller({
    scrollerContainerRef: typeof ref === 'function' ? undefined : ref,
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
      ref={scrollerContainerRef}
      style={style}
      className={className}
      value={value}
      rowsSizes={rowsSizes}
      columnsSizes={columnsSizes}
      defaultRowHeight={defaultRowHeight}
      defaultColumnWidth={defaultColumnWidth}
      onScroll={onScroll}
      width={width}
      height={height}
      {...props}
    >
      <div style={scrollAreaStyle}>
        <div style={visibleAreaStyle}>
          {elements}
        </div>
      </div>
    </GridScrollerContainer>
  );
});

export default GridScroller;
