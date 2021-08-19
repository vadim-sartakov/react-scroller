import {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import * as React from 'react';
import { ScrollData } from '../types';
import Scroller from '../utils/Scroller';
import { UseListScrollerProps } from '../ListScroller/types';
import { UseGridScrollerProps } from '../GridScroller/types';
import { isGridScrollerProps } from '../GridScroller/utils';

interface UseScrollerResult {
  scrollerContainerRef: React.MutableRefObject<HTMLDivElement>;
  visibleRowsIndexes: number[];
  visibleColumnsIndexes: number[];
  onScroll: React.UIEventHandler<HTMLDivElement>;
  scrollAreaStyle: React.CSSProperties;
  visibleAreaStyle: React.CSSProperties;
  rowsScroller: Scroller;
  onRowsScrollDataChange: (scrollData: ScrollData) => void;
  columnsScroller: Scroller;
  onColumnsScrollDataChange: (scrollData: ScrollData) => void;
  handleInitialize: VoidFunction;
}

const defaultArray: number[] = [];

const useScroller = ({
  defaultRowHeight,
  totalRows,
  rowsSizes = defaultArray,
  height,
  overscroll = 0,
  focusedCell,
  scrollerContainerRef: scrollerContainerRefProp,
  reinitialize = true,
  ...props
}: UseListScrollerProps | UseGridScrollerProps): UseScrollerResult => {
  let defaultColumnWidth: UseGridScrollerProps['defaultColumnWidth'];
  let totalColumns: UseGridScrollerProps['totalColumns'];
  let columnsSizes = defaultArray;
  let width: UseGridScrollerProps['width'];
  let gridLayout: UseGridScrollerProps['gridLayout'];

  if (isGridScrollerProps(props)) {
    ({
      defaultColumnWidth,
      totalColumns,
      columnsSizes = defaultArray,
      width,
      gridLayout,
    } = props);
  }

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

  const columnsScrollerRef = useRef(totalColumns && new Scroller({
    defaultSize: defaultColumnWidth,
    scroll: 0,
    containerSize: typeof width === 'number' ? width : 800,
    totalCount: totalColumns,
    overscroll,
    sizes: columnsSizes,
  }));

  const [rowsScrollData, setRowsScrollData] = useState(
    rowsScrollerRef.current.scrollData,
  );
  const [columnsScrollData, setColumnsScrollData] = useState(
    totalColumns && columnsScrollerRef.current.scrollData,
  );

  const handleInitializeRows = useCallback(() => {
    rowsScrollerRef.current.initialize({
      scroll: scrollerContainerRef.current.scrollTop,
      defaultSize: defaultRowHeight,
      totalCount: totalRows,
      overscroll,
      containerSize: rowsScrollerRef.current.containerSize,
      sizes: rowsSizes,
    });
    setRowsScrollData(rowsScrollerRef.current.scrollData);
  }, [
    rowsSizes,
    defaultRowHeight,
    totalRows,
    overscroll,
    scrollerContainerRef,
  ]);

  const handleInitializeColumns = useCallback(() => {
    columnsScrollerRef.current.initialize({
      scroll: scrollerContainerRef.current.scrollLeft,
      defaultSize: defaultColumnWidth,
      totalCount: totalColumns,
      overscroll,
      containerSize: columnsScrollerRef.current.containerSize,
      sizes: columnsSizes,
    });
    setColumnsScrollData(columnsScrollerRef.current.scrollData);
  }, [
    columnsSizes,
    defaultColumnWidth,
    totalColumns,
    overscroll,
    scrollerContainerRef,
  ]);

  const handleInitialize = useCallback(() => {
    handleInitializeRows();
    if (totalColumns) handleInitializeColumns();
  }, [totalColumns, handleInitializeRows, handleInitializeColumns]);

  useEffect(() => {
    if (!reinitialize) return;
    handleInitializeRows();
  }, [reinitialize, handleInitializeRows]);

  useEffect(() => {
    if (!reinitialize || !totalColumns) return;
    handleInitializeColumns();
  }, [reinitialize, totalColumns, handleInitializeColumns]);

  useEffect(() => {
    if (!focusedCell) return;

    if (typeof focusedCell === 'number') {
      rowsScrollerRef.current.scrollToIndex(focusedCell);
      scrollerContainerRef.current.scrollTop = rowsScrollerRef.current.scroll;
    } else {
      rowsScrollerRef.current.scrollToIndex(focusedCell.row);
      columnsScrollerRef.current.scrollToIndex(focusedCell.cell);
      scrollerContainerRef.current.scrollTo({
        top: rowsScrollerRef.current.scroll,
        left: columnsScrollerRef.current.scroll,
      });
    }
  }, [scrollerContainerRef, focusedCell]);

  const handleScroll: React.UIEventHandler<HTMLDivElement> = useCallback(e => {
    const nextRowsScrollData = rowsScrollerRef.current
      .scrollTo(e.currentTarget.scrollTop)
      .scrollData;
    setRowsScrollData(nextRowsScrollData);

    if (!totalColumns) return;

    const nextColumnsScrollData = columnsScrollerRef.current
      .scrollTo(e.currentTarget.scrollLeft)
      .scrollData;
    setColumnsScrollData(nextColumnsScrollData);
  }, [totalColumns]);

  const scrollAreaHeight = rowsScrollerRef.current.totalSize;
  const scrollAreaWidth = totalColumns && columnsScrollerRef.current.totalSize;

  const scrollAreaStyle: React.CSSProperties = useMemo(() => ({
    height: scrollAreaHeight,
    width: scrollAreaWidth,
    position: 'relative',
  }), [scrollAreaHeight, scrollAreaWidth]);

  const visibleAreaStyle: React.CSSProperties = useMemo(() => ({
    top: rowsScrollData.offset,
    left: columnsScrollData && columnsScrollData.offset,
    position: 'absolute',
    ...gridLayout && {
      display: 'grid',
      gridTemplateRows: rowsScrollData.visibleIndexes
        .map(index => `${rowsSizes[index] || defaultRowHeight}px`)
        .join(' '),
      gridTemplateColumns: columnsScrollData?.visibleIndexes
        .map(index => `${columnsSizes[index] || defaultColumnWidth}px`)
        .join(' '),
    },
  }), [
    rowsScrollData,
    columnsScrollData,
    columnsSizes,
    defaultColumnWidth,
    rowsSizes,
    defaultRowHeight,
    gridLayout,
  ]);

  return {
    scrollerContainerRef,
    visibleRowsIndexes: rowsScrollData.visibleIndexes,
    onScroll: handleScroll,
    scrollAreaStyle,
    visibleAreaStyle,
    onRowsScrollDataChange: setRowsScrollData,
    rowsScroller: rowsScrollerRef.current,
    ...(totalColumns && {
      visibleColumnsIndexes: columnsScrollData.visibleIndexes,
      columnsScroller: columnsScrollerRef.current,
      onColumnsScrollDataChange: setColumnsScrollData,
    }),
    handleInitialize,
  };
};

export default useScroller;
