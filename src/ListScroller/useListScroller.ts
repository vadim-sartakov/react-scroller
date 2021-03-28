import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import Scroller from 'utils/Scroller';
import { ListScrollerProps } from './types';

export interface UseListScrollerProps<T> extends Omit<ListScrollerProps<T>, 'RowComponent' | 'rowComponentProps'> {}

export interface UseListScrollerResult {
  scrollerContainerRef: React.MutableRefObject<HTMLDivElement>;
  visibleRowsIndexes: number[];
  onScroll: React.UIEventHandler<HTMLDivElement>;
  scrollAreaStyle: React.CSSProperties;
  visibleAreaStyle: React.CSSProperties;
}

const defaultArray: number[] = [];

function useListScroller<T>({
  defaultRowHeight,
  totalRows,
  rowsSizes = defaultArray,
  height,
  overscroll = 0,
  scrollerContainerRef: scrollerContainerRefProp,
  rowsScrollData: rowsScrollDataProp,
  onRowsScrollDataChange: onRowsScrollDataChangeProp,
}: UseListScrollerProps<T>): UseListScrollerResult {
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

  const [rowsScrollDataState, setRowsScrollDataState] = useState(
    rowsScrollerRef.current.scrollData,
  );
  const rowsScrollData = rowsScrollDataProp || rowsScrollDataState;
  const onRowsScrollDataChange = onRowsScrollDataChangeProp || setRowsScrollDataState;

  const [coverHeight, setCoverHeight] = useState(rowsScrollerRef.current.getTotalSize());

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
    // Do not recalculate if sizes specified explicitly as numbers by props
    if (typeof height === 'number') return undefined;

    const updateContainerSize = () => {
      const scrollerContainerRect = scrollerContainerRef.current.getBoundingClientRect();
      if (rowsScrollerRef.current.containerSize !== scrollerContainerRect.height) {
        const nextRowsScrollData = rowsScrollerRef.current.updateContainerSize(
          scrollerContainerRect.height,
        ).scrollData;
        onRowsScrollDataChange(nextRowsScrollData);
      }
    };

    const mutationCallback: MutationCallback = (mutations) => {
      const changedScrollerItems = mutations.some(
        (mutation) => scrollerContainerRef.current.contains(mutation.target),
      );
      if (!changedScrollerItems) updateContainerSize();
    };

    const observer = new MutationObserver(mutationCallback);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    window.addEventListener('resize', updateContainerSize);

    // Initial update
    updateContainerSize();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateContainerSize);
    };
  }, [height, scrollerContainerRef, onRowsScrollDataChange]);

  const handleScroll: React.UIEventHandler<HTMLDivElement> = useCallback((e) => {
    const nextRowsScrollData = rowsScrollerRef.current
      .scrollTo(e.currentTarget.scrollTop)
      .scrollData;
    onRowsScrollDataChange(nextRowsScrollData);
  }, [onRowsScrollDataChange]);

  const scrollAreaStyle: React.CSSProperties = useMemo(() => ({
    height: coverHeight,
    position: 'relative',
  }), [coverHeight]);

  const visibleAreaStyle: React.CSSProperties = useMemo(() => ({
    top: rowsScrollData.offset,
    position: 'absolute',
  }), [rowsScrollData.offset]);

  return {
    scrollerContainerRef,
    visibleRowsIndexes: rowsScrollData.visibleIndexes,
    onScroll: handleScroll,
    scrollAreaStyle,
    visibleAreaStyle,
  };
}

export default useListScroller;
