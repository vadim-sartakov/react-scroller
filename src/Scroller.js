import React, { forwardRef } from 'react';
import { useScroller, ScrollerContainer } from './';
import renderCells from './renderCells';

const defaultArray = [];

const Scroller = forwardRef((inputProps, ref) => {

  const scrollerProps = useScroller({ ...inputProps, scrollerContainerRef: ref });

  const props = {
    ...inputProps,
    ...scrollerProps
  };

  const {
    style,
    className,
    rowsScrollData,
    onRowsScrollDataChange,
    columnsScrollData,
    onColumnsScrollDataChange,
    visibleRowsIndexes,
    visibleColumnsIndexes,
    onScroll,
    overscroll,
    lazy,
    focusedCell,
    width,
    height,
    scrollAreaStyle,
    visibleAreaStyle,
    scrollerContainerRef,
    rowsSizes = defaultArray,
    columnsSizes = defaultArray,
    defaultRowHeight,
    defaultColumnWidth,
    value,
    CellComponent,
    cellComponentProps,
    RowComponent,
    rowComponentProps,
    totalRows,
    totalColumns,
    PreOuterComponent,
    preOuterComponentProps,
    PostOuterComponent,
    postOuterComponentProps,
    ...restProps
  } = props;

  const elements = renderCells({
    visibleRowsIndexes,
    visibleColumnsIndexes,
    RowComponent,
    rowComponentProps,
    CellComponent,
    cellComponentProps
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
        {...restProps}>
      {PreOuterComponent && <PreOuterComponent {...preOuterComponentProps} />}
      <div style={scrollAreaStyle}>
        <div style={visibleAreaStyle}>
          {elements}
        </div>
      </div>
      {PostOuterComponent && <PostOuterComponent {...postOuterComponentProps} />}
    </ScrollerContainer>
  )
});

export default Scroller;