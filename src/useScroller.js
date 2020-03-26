import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import {
  getCustomSizesTotal,
  getScrollDataWithDefaultSize,
  getScrollDataWithCustomSizes,
  shiftScroll,
  getCellsSize
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
  onScroll,
  overscroll = 0,
  focusedCell,
  scrollerContainerRef: scrollerContainerRefProp,
  rowsScrollData: rowsScrollDataProp,
  onRowsScrollDataChange: onRowsScrollDataChangeProp,
  columnsScrollData: columnsScrollDataProp,
  onColumnsScrollDataChange: onColumnsScrollDataChangeProp
}) => {
  const scrollerContainerRefLocal = useRef();
  const scrollerContainerRef = scrollerContainerRefProp || scrollerContainerRefLocal;
  
  useEffect(function focusCell() {

  }, [focusedCell]);

  const [containerSizes, setContainerSizes] = useState({
    width: typeof width === 'number' ? width : 800,
    height: typeof height === 'number' ? height: 600
  });

  const getColumnsScrollData = useCallback(scroll => {
    if (!totalColumns) return;
    const containerSize = containerSizes.width;
    if (columnsSizes.length) {
      return getScrollDataWithCustomSizes({ scroll, sizes: columnsSizes, containerSize, defaultSize: defaultColumnWidth, totalCount: totalColumns, overscroll });
    } else {
      return getScrollDataWithDefaultSize({ scroll, containerSize, defaultSize: defaultColumnWidth, totalCount: totalColumns, overscroll })
    }
  }, [containerSizes.width, columnsSizes, defaultColumnWidth, overscroll, totalColumns]);

  const [columnsScrollDataState, setColumnsScrollDataState] = useState(getColumnsScrollData(0));
  const columnsScrollData = columnsScrollDataProp || columnsScrollDataState;
  const onColumnsScrollDataChange = onColumnsScrollDataChangeProp || setColumnsScrollDataState;

  const getRowsScrollData = useCallback(scroll => {
    const containerSize = containerSizes.height;
    if (rowsSizes.length) {
      return getScrollDataWithCustomSizes({ scroll, sizes: rowsSizes, containerSize, defaultSize: defaultRowHeight, totalCount: totalRows, overscroll });
    } else {
      return getScrollDataWithDefaultSize({ scroll, containerSize, defaultSize: defaultRowHeight, totalCount: totalRows, overscroll })
    }
  }, [containerSizes.height, defaultRowHeight, overscroll, rowsSizes, totalRows]);

  const [rowsScrollDataState, setRowsScrollDataState] = useState(getRowsScrollData(0));
  const rowsScrollData = rowsScrollDataProp || rowsScrollDataState;
  const onRowsScrollDataChange = onRowsScrollDataChangeProp || setRowsScrollDataState;

  const prevRowsScrollData = useRef();
  const prevColumnsScrollData = useRef();
  prevRowsScrollData.current = { ...rowsScrollData };
  prevColumnsScrollData.current = { ...columnsScrollData };

  useEffect(function observeContainerResize() {
    // Do not recalculate if sizes specified explicitly as numbers by props
    if (typeof width === 'number' && typeof height === 'number') return;

    const updateContainerSize = () => {
      const scrollerContainerRect = scrollerContainerRef.current.getBoundingClientRect();
      setContainerSizes(containerSizes => {
        return containerSizes.width === scrollerContainerRect.width && containerSizes.height === scrollerContainerRect.height ?
            containerSizes : { width: scrollerContainerRect.width, height: scrollerContainerRect.height }
      });
    };

    const mutationCallback = (mutations, observer) => {
      const changedScrollerItems = mutations.some(mutation => scrollerContainerRef.current.contains(mutation.target));
      if (!changedScrollerItems) updateContainerSize();
    };

    const resizeCallback = () => updateContainerSize();

    const observer = new MutationObserver(mutationCallback);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    window.addEventListener('resize', resizeCallback);

    // Initial update
    updateContainerSize();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resizeCallback);
    };
  }, [width, height, scrollerContainerRef, getColumnsScrollData]);

  useEffect(function updateScrollDataOnContainerSizeChange() {
    if (typeof width !== 'number') {
      const columnsScrollData = getColumnsScrollData(scrollerContainerRef.current.scrollLeft);
      onColumnsScrollDataChange(columnsScrollData);
    }
    if (typeof height !== 'number') {
      const rowsScrollData = getRowsScrollData(scrollerContainerRef.current.scrollTop);
      onRowsScrollDataChange(rowsScrollData);
    }
  }, [onColumnsScrollDataChange, onRowsScrollDataChange, width, height, scrollerContainerRef, containerSizes, getColumnsScrollData, getRowsScrollData]);

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
          containerSize: containerSizes.width,
          totalCount: totalColumns,
          defaultSize: defaultColumnWidth,
          overscroll
        });
      } else {
        nextColumnsScrollData = getScrollDataWithDefaultSize({
          containerSize: containerSizes.width,
          defaultSize: defaultColumnWidth,
          totalCount: totalColumns,
          scroll: e.target.scrollLeft,
          overscroll
        });
      }
      onColumnsScrollDataChange(nextColumnsScrollData);
    }
    
    if (rowsSizes.length) {
      nextRowsScrollData = shiftScroll({
        prevScrollData: prevRowsScrollData.current,
        prevScroll: prevScrollTop.current,
        sizes: rowsSizes,
        scroll: e.target.scrollTop,
        containerSize: containerSizes.height,
        totalCount: totalRows,
        defaultSize: defaultRowHeight,
        overscroll
      });
    } else {
      nextRowsScrollData = getScrollDataWithDefaultSize({
        containerSize: containerSizes.height,
        defaultSize: defaultRowHeight,
        totalCount: totalRows,
        scroll: e.target.scrollTop,
        overscroll
      });
    }
    onRowsScrollDataChange(nextRowsScrollData);

    prevScrollTop.current = e.target.scrollTop;
    prevScrollLeft.current = e.target.scrollLeft;

    if (onScroll) onScroll(e);
  }, [
    onColumnsScrollDataChange,
    onRowsScrollDataChange,
    containerSizes.height,
    containerSizes.width,
    columnsSizes,
    rowsSizes,
    defaultColumnWidth,
    defaultRowHeight,
    onScroll,
    overscroll,
    totalRows,
    totalColumns
  ]);

  const visibleRowsSize = useMemo(() => {
    return lazy ?
      getCellsSize({
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