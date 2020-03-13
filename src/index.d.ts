import { FunctionComponent, Context, MutableRefObject, UIEventHandler, CSSProperties } from 'react';

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
  overscroll?: number;
  /**
   * If set to true than scroll container will be expanded only when reached end scroll threshold
   */
  lazy?: boolean;
  /** Scrolls to specified cell by it's address. */
  focusedCell?: Cell;
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
  /** Styles of scroll area. Contains final width and height */
  scrollAreaStyle: { width: number; height: number; position: 'relative' };
  /** Styles of visible area. Contains top and left absolute position on scroll area */
  visibleAreaStyle: { top: number; left: number; position: 'absolute' };
}

export declare function useScroller(options: UseScrollerOptions): UseScrollerResult

interface ScrollerContextProps {
  value: any[];
  defaultRowHeight: number;
  defaultColumnWidth?: number;
  rowsSizes?: number[];
  columnsSizes?: number[];
}

declare const ScrollerContext: Context<ScrollerContextProps>

export interface ScrollerContainerProps {
  value: any[];
  width?: number;
  height: number;
  defaultRowHeight: number;
  defaultColumnWidth: number;
  rowsSizes: number[];
  columnsSizes?: number[];
  style: CSSProperties;
  onScroll: UIEventHandler;
}

export declare const ScrollerContainer: FunctionComponent<ScrollerContainerProps>

export interface ScrollerCellProps {
  rowIndex: number;
  columnIndex?: number;
  /** Default is 'div' */
  Component: FunctionComponent;
}

export interface ScrollerProps extends UseScrollerOptions, ScrollerContainerProps {
  CellComponent: FunctionComponent;
}

declare const Scroller: FunctionComponent<ScrollerProps>

export default Scroller