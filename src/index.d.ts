import { MutableRefObject, UIEventHandler } from 'react';

export interface Cell {
  row: number;
  column: number;
}

export interface UseScrollerOptions {
  defaultRowHeight: number;
  defaultColumnWidth?: number;
  totalRows: number;
  totalColumns?: number;
  rowsSizes: number[];
  columnsSizes: number[];
  /** Scroll container height */
  height: number;
  /** Scroll container width */
  width?: number;
  /**
   * Number of elements which should be rendered out of visible scroller container
   */
  overscroll: number;
  /**
   * If set to true than scroll container will be expanded only reaching end scroll threshold
   */
  lazy: boolean;
}

export interface UseScrollerResult {
  /** Scroll callback which should be passed to scroll container as 'onScroll' event handler */
  onScroll: UIEventHandler;
  /** Rows indexes which are visible at the current scroll position */
  visibleRowsIndexes: number[];
  /**
   * Columns indexes which are visible at the current scroll position.
   * Might be 'undefined' if no 'totalColumns' was specified, assuming it is a list, not a grid.
   */
  visibleColumnsIndexes?: number[];
  /**
   * Ref which should be passed to corresponding scroller container html element.
   * It is used by hook to control current scroll position if required (e.g. on focusing cell).
   */
  containerRef: MutableRefObject<Element>;
  /**
   * Focus cell callback. Scrolls to specified cell by it's address.
   */
  focusCell: (cell: Cell) => void;
  /** Styles of scroll area. Contains final width and height */
  scrollAreaStyle: { width: number; height: number; position: 'relative' };
  /** Styles of visible area. Contains top and left absolute position on scroll area */
  visibleAreaStyle: { top: number; left: number; position: 'absolute' }
}

export declare function useScroller(options: UseScrollerOptions): UseScrollerResult