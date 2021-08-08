import {
  useRef, useEffect, useState, useMemo, useCallback,
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
  rowsScrollData: rowsScrollDataProp,
  onRowsScrollDataChange: onRowsScrollDataChangeProp,
  onScroll,
  ...props
}: UseListScrollerProps | UseGridScrollerProps): UseScrollerResult => {
  let defaultColumnWidth: UseGridScrollerProps['defaultColumnWidth'];
  let totalColumns: UseGridScrollerProps['totalColumns'];
  let columnsSizes = defaultArray;
  let width: UseGridScrollerProps['width'];
  let columnsScrollDataProp: UseGridScrollerProps['columnsScrollData'];
  let onColumnsScrollDataChangeProp: UseGridScrollerProps['onColumnsScrollDataChange'];

  if (isGridScrollerProps(props)) {
    ({
      defaultColumnWidth,
      totalColumns,
      columnsSizes,
      width,
      columnsScrollData: columnsScrollDataProp,
      onColumnsScrollDataChange: onColumnsScrollDataChangeProp,
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

  const [rowsScrollDataState, setRowsScrollDataState] = useState(
    rowsScrollerRef.current.scrollData,
  );
  const rowsScrollData = rowsScrollDataProp || rowsScrollDataState;
  const onRowsScrollDataChange = onRowsScrollDataChangeProp || setRowsScrollDataState;

  const [columnsScrollDataState, setColumnsScrollDataState] = useState(
    totalColumns && columnsScrollerRef.current.scrollData,
  );
  const columnsScrollData = columnsScrollDataProp || columnsScrollDataState;
  const onColumnsScrollDataChange = onColumnsScrollDataChangeProp || setColumnsScrollDataState;

  const [coverHeight, setCoverHeight] = useState(rowsScrollerRef.current.getTotalSize());
  const [coverWidth, setCoverWidth] = useState(
    totalColumns && columnsScrollerRef.current.getTotalSize(),
  );

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
    if (!totalColumns) return;
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
    onScroll?.(e);

    const nextRowsScrollData = rowsScrollerRef.current
      .scrollTo(e.currentTarget.scrollTop)
      .scrollData;
    onRowsScrollDataChange(nextRowsScrollData);

    if (!totalColumns) return;

    const nextColumnsScrollData = columnsScrollerRef.current
      .scrollTo(e.currentTarget.scrollLeft)
      .scrollData;
    onColumnsScrollDataChange(nextColumnsScrollData);
  }, [totalColumns, onColumnsScrollDataChange, onRowsScrollDataChange, onScroll]);

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
    onScroll: handleScroll,
    scrollAreaStyle,
    visibleAreaStyle,
    onRowsScrollDataChange,
    rowsScroller: rowsScrollerRef.current,
    ...(totalColumns && {
      visibleColumnsIndexes: columnsScrollData.visibleIndexes,
      columnsScroller: columnsScrollerRef.current,
      onColumnsScrollDataChange,
    }),
  };
};

export default useScroller;
