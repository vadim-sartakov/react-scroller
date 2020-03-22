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
    visibleRowsIndexes,
    visibleColumnsIndexes,
    onScroll,
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
    RowComponent = 'div',
    rowComponentProps,
    totalRows,
    totalColumns,
    OuterComponent,
    outerComponentProps,
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
      <div style={scrollAreaStyle}>
        <div style={visibleAreaStyle}>
          {elements}
        </div>
      </div>
      {OuterComponent && <OuterComponent {...outerComponentProps} />}
    </ScrollerContainer>
  )
});

export default Scroller;