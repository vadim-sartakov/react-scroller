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
    RowComponent = 'div',
    rowComponentProps,
    OutsideComponent
  } = props;

  const elements = visibleRowsIndexes.map(rowIndex => {
    if (visibleColumnsIndexes) {
      const columnsElements = visibleColumnsIndexes.map(columnIndex => {
        return <ScrollerCell Component={CellComponent} key={`${rowIndex}-${columnIndex}`} rowIndex={rowIndex} columnIndex={columnIndex} />;
      });
      return (
        <RowComponent key={rowIndex} {...rowComponentProps}>
          {columnsElements}
        </RowComponent>
      );
    } else {
      return <ScrollerCell Component={CellComponent} key={rowIndex} rowIndex={rowIndex} />;
    }
  });

  return (
    <ScrollerContainer
        ref={scrollerContainerRef}
        value={value}
        rowsSizes={rowsSizes}
        columnsSizes={columnsSizes}
        defaultRowHeight={defaultRowHeight}
        defaultColumnWidth={defaultColumnWidth}
        onScroll={onScroll}
        width={width}
        height={height}
        scrollAreaStyle={scrollAreaStyle}
        visibleAreaStyle={visibleAreaStyle}
        OutsideComponent={OutsideComponent}
        externalComponentProps={{ visibleRowsIndexes, visibleColumnsIndexes }}>
      {elements}
    </ScrollerContainer>
  )
});

export default Scroller;