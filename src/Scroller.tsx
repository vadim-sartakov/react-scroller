import React, { forwardRef } from 'react';
import { ScrollerPropsBase } from './types';
import { ScrollerCellComponentProps } from './ScrollerCell';
import useScroller from './useScroller';
import ScrollerContainer from './ScrollerContainer';
import renderCells from './renderCells';

const defaultArray: number[] = [];

export interface ScrollerProps extends ScrollerPropsBase, React.HTMLAttributes<HTMLDivElement> {
  RowComponent?: string | React.FC;
  rowComponentProps?: Object;
  CellComponent: React.FC<ScrollerCellComponentProps>;
}

const Scroller = forwardRef<HTMLDivElement, ScrollerProps>(({
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
  } = useScroller({
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
  });

  return (
    <ScrollerContainer
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
    </ScrollerContainer>
  );
});

export default Scroller;
