import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import {
  getCustomSizesTotal,
  getScrollDataWithDefaultSize,
  getScrollDataWithCustomSizes,
  shiftScroll,
  getItemsSize
} from './utils';

const defaultArray = [];

const useScroller = ({
  defaultRowHeight,
  defaultColumnWidth,
  totalRows,
  totalColumns,
  rowsSizes = defaultArray,
  columnsSizes = defaultArray,
  width,
  height,
  lazy,
  overscroll = 0,
  focusedCell,
  scrollerContainerRef: scrollerContainerRefProp
}) => {
  const scrollerContainerRefLocal = useRef();
  const scrollerContainerRef = scrollerContainerRefProp || scrollerContainerRefLocal;
  
  useEffect(function focusCell() {

  }, [focusedCell]);

  const containerSizes = useRef({ width, height });

  const getColumnsScrollData = useCallback(() => {
    if (!totalColumns) return;
    const containerSize = containerSizes.current.width;
    if (columnsSizes.length) {
      return getScrollDataWithCustomSizes({ scroll: 0, sizes: columnsSizes, containerSize, defaultSize: defaultColumnWidth, totalCount: totalColumns, overscroll });
    } else {
      return getScrollDataWithDefaultSize({ scroll: 0, containerSize, defaultSize: defaultColumnWidth, totalCount: totalColumns, overscroll })
    }
  }, [columnsSizes, defaultColumnWidth, overscroll, totalColumns]);

  const prevRowsScrollData = useRef();
  const prevColumnsScrollData = useRef();

  const [columnsScrollData, setColumnsScrollData] = useState(getColumnsScrollData());

  const [rowsScrollData, setRowsScrollData] = useState(() => {
    const containerSize = containerSizes.current.height;
    if (rowsSizes.length) {
      return getScrollDataWithCustomSizes({ scroll: 0, sizes: rowsSizes, containerSize, defaultSize: defaultRowHeight, totalCount: totalRows, overscroll });
    } else {
      return getScrollDataWithDefaultSize({ scroll: 0, containerSize, defaultSize: defaultRowHeight, totalCount: totalRows, overscroll })
    }
  });

  prevRowsScrollData.current = { ...rowsScrollData };
  prevColumnsScrollData.current = { ...columnsScrollData };

  useEffect(function calculateContainerWidth() {
    // Do not recalculate if width is specified explicitly by prop
    if (width) return;
    const scrollerContainerRect = scrollerContainerRef.current.getBoundingClientRect();
    containerSizes.current = { width: scrollerContainerRect.width, height: scrollerContainerRect.height };
    const columnsScrollData = getColumnsScrollData();
    setColumnsScrollData(columnsScrollData);
  }, [width, scrollerContainerRef, getColumnsScrollData]);

  const prevScrollTop = useRef(0);
  const prevScrollLeft = useRef(0);

  const handleScroll = useCallback(e => {
    let nextRowsScrollData, nextColumnsScrollData
    if (totalColumns) {
      if (columnsSizes.length) {
        nextColumnsScrollData = shiftScroll({
          prevScrollData: prevColumnsScrollData.current,
          prevScroll: prevScrollLeft.current,
          sizes: columnsSizes,
          scroll: e.target.scrollLeft,
          containerSize: containerSizes.current.width,
          totalCount: totalColumns,
          defaultSize: defaultColumnWidth,
          overscroll
        });
      } else {
        nextColumnsScrollData = getScrollDataWithDefaultSize({
          containerSize: containerSizes.current.width,
          defaultSize: defaultColumnWidth,
          totalCount: totalColumns,
          scroll: e.target.scrollLeft,
          overscroll
        });
      }
      setColumnsScrollData(nextColumnsScrollData);
    }
    
    if (rowsSizes.length) {
      nextRowsScrollData = shiftScroll({
        prevScrollData: prevRowsScrollData.current,
        prevScroll: prevScrollTop.current,
        sizes: rowsSizes,
        scroll: e.target.scrollTop,
        containerSize: containerSizes.current.height,
        totalCount: totalRows,
        defaultSize: defaultRowHeight,
        overscroll
      });
    } else {
      nextRowsScrollData = getScrollDataWithDefaultSize({
        containerSize: containerSizes.current.height,
        defaultSize: defaultRowHeight,
        totalCount: totalRows,
        scroll: e.target.scrollTop,
        overscroll
      });
    }
    setRowsScrollData(nextRowsScrollData);

    prevScrollTop.current = e.target.scrollTop;
    prevScrollLeft.current = e.target.scrollLeft;
  }, [
    columnsSizes,
    rowsSizes,
    defaultColumnWidth,
    defaultRowHeight,
    overscroll,
    totalRows,
    totalColumns
  ]);

  const visibleRowsSize = useMemo(() => {
    return lazy ?
      getItemsSize({
        startIndex: rowsScrollData.visibleIndexes[0],
        sizes: rowsSizes,
        defaultSize: defaultRowHeight,
        count: rowsScrollData.visibleIndexes.length
      }) : 0;
  }, [lazy, rowsScrollData, rowsSizes, defaultRowHeight]);

  const coverWidth = useMemo(() => {
    if (!totalColumns) return;
    if (columnsSizes.length) {
      return getCustomSizesTotal({ sizes: columnsSizes, totalCount: totalColumns, defaultSize: defaultColumnWidth });
    } else {
      return totalColumns * defaultColumnWidth;
    }
  }, [columnsSizes, defaultColumnWidth, totalColumns]);

  const coverHeight = useMemo(() => {
    if (rowsSizes.length) {
      return getCustomSizesTotal({ sizes: rowsSizes, totalCount: totalRows, defaultSize: defaultRowHeight });
    } else {
      return totalRows * defaultRowHeight;
    }
  }, [rowsSizes, defaultRowHeight, totalRows]);

  const scrollAreaStyle = useMemo(() => {
    return {
      height: lazy ? rowsScrollData.offset + visibleRowsSize : coverHeight,
      width: coverWidth,
      position: 'relative'
    }
  }, [lazy, coverHeight, coverWidth, rowsScrollData.offset, visibleRowsSize]);

  const visibleAreaStyle = useMemo(() => {
    return {
      top: rowsScrollData.offset,
      left: columnsScrollData && columnsScrollData.offset,
      position: 'absolute'
    };
  }, [rowsScrollData.offset, columnsScrollData]);

  return {
    scrollerContainerRef,
    visibleRowsIndexes: rowsScrollData.visibleIndexes,
    visibleColumnsIndexes: columnsScrollData && columnsScrollData.visibleIndexes,
    onScroll: handleScroll,
    scrollAreaStyle,
    visibleAreaStyle
  };

};

export default useScroller;