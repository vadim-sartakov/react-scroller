import React, { forwardRef } from 'react';
import { useScroller, ScrollerContainer, ScrollerCell } from './';

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
    staticContainer,
    RowComponent = 'div',
    rowComponentProps
  } = props;

  const elements = visibleRowsIndexes.map(rowIndex => {
    if (visibleColumnsIndexes) {
      const columnsElements = visibleColumnsIndexes.map(columnIndex => {
        return <ScrollerCell Component={CellComponent} key={`${rowIndex}-${columnIndex}`} rowIndex={rowIndex} columnIndex={columnIndex} {...cellComponentProps} />;
      });
      return (
        <RowComponent key={rowIndex} {...rowComponentProps}>
          {columnsElements}
        </RowComponent>
      );
    } else {
      return <ScrollerCell Component={CellComponent} key={rowIndex} rowIndex={rowIndex} {...cellComponentProps} />;
    }
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
        height={height}>
      {staticContainer ? elements : (
        <div style={scrollAreaStyle}>
          <div style={visibleAreaStyle}>
            {elements}
          </div>
        </div>
      )}
    </ScrollerContainer>
  )
});

export default Scroller;