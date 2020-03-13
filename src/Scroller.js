import React from 'react';
import { useScroller, ScrollerContainer, ScrollerCell } from './';

const defaultArray = [];

const Scroller = inputProps => {

  const scrollerProps = useScroller(inputProps);

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
    RowComponent = 'div'
  } = props;

  const elements = visibleRowsIndexes.map(rowIndex => {
    if (visibleColumnsIndexes) {
      const columnsElements = visibleColumnsIndexes.map(columnIndex => {
        return <ScrollerCell Component={CellComponent} key={`${rowIndex}-${columnIndex}`} rowIndex={rowIndex} columnIndex={columnIndex} />;
      });
      return (
        <RowComponent key={rowIndex} style={{ display: 'flex' }}>
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
        height={height}>
      <div style={scrollAreaStyle}>
        <div style={visibleAreaStyle}>
          {elements}
        </div>
      </div>
    </ScrollerContainer>
  )
};

export default Scroller;