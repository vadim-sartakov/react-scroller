import React from 'react';
import { useScroller, ScrollerContainer } from './';
import renderCells from './renderCells';

const defaultArray = [];

const Scroller = inputProps => {
  const {
    scrollerContainerRef: scrollerContainerRefInput,
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
    lazy,
    overscroll,
    focusedCell,
    RowComponent,
    rowComponentProps,
    CellComponent,
    cellComponentProps,
    PreOuterComponent,
    preOuterComponentProps,
    PostOuterComponent,
    postOuterComponentProps,
    rowsScrollData,
    onRowsScrollDataChange,
    columnsScrollData,
    onColumnsScrollDataChange,
    ...restInputProps
  } = inputProps;

  const {
    visibleRowsIndexes,
    visibleColumnsIndexes,
    onScroll,
    scrollAreaStyle,
    visibleAreaStyle,
    scrollerContainerRef    
  } = useScroller({ ...inputProps, scrollerContainerRef: scrollerContainerRefInput });

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
        {...restInputProps}
        ref={scrollerContainerRefInput ? undefined : scrollerContainerRef}
        style={style}
        className={className}
        value={value}
        rowsSizes={rowsSizes}
        columnsSizes={columnsSizes}
        defaultRowHeight={defaultRowHeight}
        defaultColumnWidth={defaultColumnWidth}
        onScroll={onScroll}
        width={width}
        height={height}>
      {PreOuterComponent && <PreOuterComponent {...preOuterComponentProps} />}
      <div style={scrollAreaStyle}>
        <div style={visibleAreaStyle}>
          {elements}
        </div>
      </div>
      {PostOuterComponent && <PostOuterComponent {...postOuterComponentProps} />}
    </ScrollerContainer>
  )
};

export default Scroller;