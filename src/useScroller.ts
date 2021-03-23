import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { ScrollData, ScrollerPropsBase } from 'types';
import {
  getCustomSizesTotal,
  getScrollDataWithDefaultSize,
  getScrollDataWithCustomSizes,
  shiftScroll,
} from 'utils';

export interface UseScrollerProps extends ScrollerPropsBase {
  scrollerContainerRef?: React.MutableRefObject<HTMLDivElement>;
}

export interface UseScrollerResult {
  scrollerContainerRef: React.MutableRefObject<HTMLDivElement>;
  visibleRowsIndexes: number[];
  visibleColumnsIndexes: number[];
  onScroll: React.UIEventHandler<HTMLDivElement>;
  scrollAreaStyle: React.CSSProperties;
  visibleAreaStyle: React.CSSProperties;
}

const defaultArray: number[] = [];

function useScroller({
  defaultRowHeight,
  defaultColumnWidth,
  totalRows,
  totalColumns,
  rowsSizes = defaultArray,
  columnsSizes = defaultArray,
  width,
  height,
  overscroll = 0,
  focusedCell,
  scrollerContainerRef: scrollerContainerRefProp,
  rowsScrollData: rowsScrollDataProp,
  onRowsScrollDataChange: onRowsScrollDataChangeProp,
  columnsScrollData: columnsScrollDataProp,
  onColumnsScrollDataChange: onColumnsScrollDataChangeProp,
}: UseScrollerProps): UseScrollerResult {
  const scrollerContainerRefLocal = useRef<HTMLDivElement>();
  const scrollerContainerRef = scrollerContainerRefProp || scrollerContainerRefLocal;

  useEffect(() => {
    // TODO: Implement focused cell
  }, [focusedCell]);

  const [containerSizes, setContainerSizes] = useState({
    width: typeof width === 'number' ? width : 800,
    height: typeof height === 'number' ? height : 600,
  });

  const getColumnsScrollData = useCallback((scroll) => {
    if (!totalColumns) return undefined;
    const containerSize = containerSizes.width;
    if (columnsSizes.length) {
      return getScrollDataWithCustomSizes({
        scroll,
        sizes: columnsSizes,
        containerSize,
        defaultSize: defaultColumnWidth,
        totalCount: totalColumns,
        overscroll,
      });
    }
    return getScrollDataWithDefaultSize({
      scroll,
      containerSize,
      defaultSize: defaultColumnWidth,
      totalCount: totalColumns,
      overscroll,
    });
  }, [containerSizes.width, columnsSizes, defaultColumnWidth, overscroll, totalColumns]);

  const [columnsScrollDataState, setColumnsScrollDataState] = useState(getColumnsScrollData(0));
  const columnsScrollData = columnsScrollDataProp || columnsScrollDataState;
  const onColumnsScrollDataChange = onColumnsScrollDataChangeProp || setColumnsScrollDataState;

  const getRowsScrollData = useCallback((scroll) => {
    const containerSize = containerSizes.height;
    if (rowsSizes.length) {
      return getScrollDataWithCustomSizes({
        scroll,
        sizes: rowsSizes,
        containerSize,
        defaultSize: defaultRowHeight,
        totalCount: totalRows,
        overscroll,
      });
    }
    return getScrollDataWithDefaultSize({
      scroll, containerSize, defaultSize: defaultRowHeight, totalCount: totalRows, overscroll,
    });
  }, [containerSizes.height, defaultRowHeight, overscroll, rowsSizes, totalRows]);

  const [rowsScrollDataState, setRowsScrollDataState] = useState(getRowsScrollData(0));
  const rowsScrollData = rowsScrollDataProp || rowsScrollDataState;
  const onRowsScrollDataChange = onRowsScrollDataChangeProp || setRowsScrollDataState;

  const prevRowsScrollData = useRef<ScrollData>();
  const prevColumnsScrollData = useRef<ScrollData>();
  prevRowsScrollData.current = { ...rowsScrollData };
  prevColumnsScrollData.current = { ...columnsScrollData };

  useEffect(() => {
    // Do not recalculate if sizes specified explicitly as numbers by props
    if (typeof width === 'number' && typeof height === 'number') return undefined;

    const updateContainerSize = () => {
      const scrollerContainerRect = scrollerContainerRef.current.getBoundingClientRect();
      setContainerSizes(
        (containerSizes) => (
          containerSizes.width === scrollerContainerRect.width
          && containerSizes.height === scrollerContainerRect.height
            ? containerSizes
            : { width: scrollerContainerRect.width, height: scrollerContainerRect.height }
        ),
      );
    };

    const mutationCallback: MutationCallback = (mutations) => {
      const changedScrollerItems = mutations
        .some((mutation) => scrollerContainerRef.current.contains(mutation.target));
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

  useEffect(() => {
    const columnsScrollData = getColumnsScrollData(scrollerContainerRef.current.scrollLeft);
    onColumnsScrollDataChange(columnsScrollData);
    const rowsScrollData = getRowsScrollData(scrollerContainerRef.current.scrollTop);
    onRowsScrollDataChange(rowsScrollData);
  }, [
    onColumnsScrollDataChange,
    onRowsScrollDataChange,
    width,
    height,
    scrollerContainerRef,
    containerSizes,
    getColumnsScrollData,
    getRowsScrollData,
  ]);

  const prevScrollTop = useRef(0);
  const prevScrollLeft = useRef(0);

  const handleScroll = useCallback((e) => {
    let nextRowsScrollData; let
      nextColumnsScrollData;
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
          overscroll,
        });
      } else {
        nextColumnsScrollData = getScrollDataWithDefaultSize({
          containerSize: containerSizes.width,
          defaultSize: defaultColumnWidth,
          totalCount: totalColumns,
          scroll: e.target.scrollLeft,
          overscroll,
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
        overscroll,
      });
    } else {
      nextRowsScrollData = getScrollDataWithDefaultSize({
        containerSize: containerSizes.height,
        defaultSize: defaultRowHeight,
        totalCount: totalRows,
        scroll: e.target.scrollTop,
        overscroll,
      });
    }
    onRowsScrollDataChange(nextRowsScrollData);

    prevScrollTop.current = e.target.scrollTop;
    prevScrollLeft.current = e.target.scrollLeft;
  }, [
    onColumnsScrollDataChange,
    onRowsScrollDataChange,
    containerSizes.height,
    containerSizes.width,
    columnsSizes,
    rowsSizes,
    defaultColumnWidth,
    defaultRowHeight,
    overscroll,
    totalRows,
    totalColumns,
  ]);

  const coverWidth = useMemo(() => {
    if (!totalColumns) return undefined;
    if (columnsSizes.length) {
      return getCustomSizesTotal(
        { sizes: columnsSizes, totalCount: totalColumns, defaultSize: defaultColumnWidth },
      );
    }
    return totalColumns * defaultColumnWidth;
  }, [columnsSizes, defaultColumnWidth, totalColumns]);

  const coverHeight = useMemo(() => {
    if (rowsSizes.length) {
      return getCustomSizesTotal(
        { sizes: rowsSizes, totalCount: totalRows, defaultSize: defaultRowHeight },
      );
    }
    return totalRows * defaultRowHeight;
  }, [rowsSizes, defaultRowHeight, totalRows]);

  const scrollAreaStyle: React.CSSProperties = useMemo(() => ({
    height: coverHeight,
    width: coverWidth,
    position: 'relative',
  }), [coverHeight, coverWidth]);

  const visibleAreaStyle: React.CSSProperties = useMemo(() => ({
    top: rowsScrollData.offset,
    left: columnsScrollData && columnsScrollData.offset,
    position: 'absolute',
  }), [rowsScrollData.offset, columnsScrollData]);

  return {
    scrollerContainerRef,
    visibleRowsIndexes: rowsScrollData.visibleIndexes,
    visibleColumnsIndexes: columnsScrollData && columnsScrollData.visibleIndexes,
    onScroll: handleScroll,
    scrollAreaStyle,
    visibleAreaStyle,
  };
}

export default useScroller;
