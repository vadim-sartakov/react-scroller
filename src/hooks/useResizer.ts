import { useEffect, MutableRefObject } from 'react';
import { ScrollData } from '../types';
import ResizeObserver from '../utils/ResizeObserver';
import Scroller from '../utils/Scroller';

interface UseResizerProps {
  scrollerContainerRef: MutableRefObject<HTMLDivElement>;
  rowsScroller: Scroller;
  columnsScroller?: Scroller;
  width?: number | string;
  height?: number | string;
  onRowsScrollDataChange: (scrollData: ScrollData) => void;
  onColumnsScrollDataChange?: (scrollData: ScrollData) => void;
}

function useResizer({
  scrollerContainerRef,
  rowsScroller,
  columnsScroller,
  width,
  height,
  onRowsScrollDataChange,
  onColumnsScrollDataChange,
}: UseResizerProps): void {
  useEffect(() => {
    const resizeObserver = new ResizeObserver(scrollerContainerRef.current);

    const updateContainerSize = () => {
      const scrollerContainerRect = scrollerContainerRef.current?.getBoundingClientRect();
      if (!scrollerContainerRect) return;

      if (typeof height !== 'number' && rowsScroller.containerSize !== scrollerContainerRect.height) {
        const nextRowsScrollData = rowsScroller.updateContainerSize(
          scrollerContainerRect.height,
        ).scrollData;
        onRowsScrollDataChange(nextRowsScrollData);
      }

      if (columnsScroller && typeof width !== 'number' && columnsScroller.containerSize !== scrollerContainerRect.width) {
        const nextColumnsScrollData = columnsScroller.updateContainerSize(
          scrollerContainerRect.width,
        ).scrollData;
        onColumnsScrollDataChange?.(nextColumnsScrollData);
      }
    };

    resizeObserver.listen(updateContainerSize);

    // Initial update
    updateContainerSize();
    return () => resizeObserver.cleanup();
  }, [
    rowsScroller,
    columnsScroller,
    width,
    height,
    scrollerContainerRef,
    onRowsScrollDataChange,
    onColumnsScrollDataChange,
  ]);
}

export default useResizer;
