import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import Scroller from 'utils/Scroller';
import ResizeObserver from 'utils/ResizeObserver';
import { GridScrollerProps } from './types';

type UseGridScrollerProps<T> = Omit<GridScrollerProps<T>, 'value'>;

interface UseGridScrollerResult {
  scrollerContainerRef: React.MutableRefObject<HTMLDivElement>;
  visibleRowsIndexes: number[];
  visibleColumnsIndexes: number[];
  onScroll: React.UIEventHandler<HTMLDivElement>;
  scrollAreaStyle: React.CSSProperties;
  visibleAreaStyle: React.CSSProperties;
}

const defaultArray: number[] = [];

function useGridScroller<T>({
  defaultRowHeight,
  defaultColumnWidth,
  totalRows,
  totalColumns,
  rowsSizes = defaultArray,
  columnsSizes = defaultArray,
  width,
  height,
  overscroll = 0,
  scrollerContainerRef: scrollerContainerRefProp,
  rowsScrollData: rowsScrollDataProp,
  onRowsScrollDataChange: onRowsScrollDataChangeProp,
  columnsScrollData: columnsScrollDataProp,
  onColumnsScrollDataChange: onColumnsScrollDataChangeProp,
}: UseGridScrollerProps<T>): UseGridScrollerResult {
  const scrollerContainerRefLocal = useRef<HTMLDivElement>();
  const scrollerContainerRef = scrollerContainerRefProp || scrollerContainerRefLocal;

  const rowsScrollerRef = useRef(new Scroller({
    defaultSize: defaultRowHeight,
    scroll: 0,
    containerSize: typeof height === 'number' ? height : 600,
    totalCount: totalRows,
    overscroll,
    sizes: rowsSizes,
  }));

  const columnsScrollerRef = useRef(new Scroller({
    defaultSize: defaultColumnWidth,
    scroll: 0,
    containerSize: typeof width === 'number' ? width : 800,
    totalCount: totalColumns,
    overscroll,
    sizes: columnsSizes,
  }));

  const [rowsScrollDataState, setRowsScrollDataState] = useState(
    rowsScrollerRef.current.scrollData,
  );
  const rowsScrollData = rowsScrollDataProp || rowsScrollDataState;
  const onRowsScrollDataChange = onRowsScrollDataChangeProp || setRowsScrollDataState;

  const [columnsScrollDataState, setColumnsScrollDataState] = useState(
    columnsScrollerRef.current.scrollData,
  );
  const columnsScrollData = columnsScrollDataProp || columnsScrollDataState;
  const onColumnsScrollDataChange = onColumnsScrollDataChangeProp || setColumnsScrollDataState;

  const [coverHeight, setCoverHeight] = useState(rowsScrollerRef.current.getTotalSize());
  const [coverWidth, setCoverWidth] = useState(columnsScrollerRef.current.getTotalSize());

  useEffect(() => {
    rowsScrollerRef.current.initialize({
      scroll: scrollerContainerRef.current.scrollTop,
      defaultSize: defaultRowHeight,
      totalCount: totalRows,
      overscroll,
      containerSize: rowsScrollerRef.current.containerSize,
      sizes: rowsSizes,
    });
    onRowsScrollDataChange(rowsScrollerRef.current.scrollData);
    setCoverHeight(rowsScrollerRef.current.getTotalSize());
  }, [
    rowsSizes,
    defaultRowHeight,
    totalRows,
    overscroll,
    onRowsScrollDataChange,
    scrollerContainerRef,
  ]);

  useEffect(() => {
    columnsScrollerRef.current.initialize({
      scroll: scrollerContainerRef.current.scrollLeft,
      defaultSize: defaultColumnWidth,
      totalCount: totalColumns,
      overscroll,
      containerSize: columnsScrollerRef.current.containerSize,
      sizes: columnsSizes,
    });
    onColumnsScrollDataChange(columnsScrollerRef.current.scrollData);
    setCoverWidth(columnsScrollerRef.current.getTotalSize());
  }, [
    columnsSizes,
    defaultColumnWidth,
    totalColumns,
    overscroll,
    onColumnsScrollDataChange,
    scrollerContainerRef,
  ]);

  useEffect(() => {
    // Do not recalculate if sizes specified explicitly as numbers by props
    if (typeof width === 'number' && typeof height === 'number') return undefined;

    const resizeObserver = new ResizeObserver(scrollerContainerRef.current);

    const updateContainerSize = () => {
      const scrollerContainerRect = scrollerContainerRef.current.getBoundingClientRect();
      if (rowsScrollerRef.current.containerSize !== scrollerContainerRect.height) {
        const nextRowsScrollData = rowsScrollerRef.current.updateContainerSize(
          scrollerContainerRect.height,
        ).scrollData;
        onRowsScrollDataChange(nextRowsScrollData);
      }

      if (columnsScrollerRef.current.containerSize !== scrollerContainerRect.width) {
        const nextColumnsScrollData = columnsScrollerRef.current.updateContainerSize(
          scrollerContainerRect.width,
        ).scrollData;
        onColumnsScrollDataChange(nextColumnsScrollData);
      }
    };

    resizeObserver.listen(updateContainerSize);

    // Initial update
    updateContainerSize();
    return () => resizeObserver.cleanup();
  }, [
    width,
    height,
    scrollerContainerRef,
    onRowsScrollDataChange,
    onColumnsScrollDataChange,
  ]);

  const handleScroll: React.UIEventHandler<HTMLDivElement> = useCallback((e) => {
    const nextRowsScrollData = rowsScrollerRef.current
      .scrollTo(e.currentTarget.scrollTop)
      .scrollData;
    onRowsScrollDataChange(nextRowsScrollData);

    const nextColumnsScrollData = columnsScrollerRef.current
      .scrollTo(e.currentTarget.scrollLeft)
      .scrollData;
    onColumnsScrollDataChange(nextColumnsScrollData);
  }, [onColumnsScrollDataChange, onRowsScrollDataChange]);

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

export default useGridScroller;
