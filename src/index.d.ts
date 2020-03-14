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
  /** On scroll callback. When additional processing is required by parent components */
  onScroll: UIEventHandler;
  /** Scroll container height. Could be any valid css string */
  height: number | string;
  /** Scroll container width. Could be any valid css string */
  width?: number | string;
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
  /**
   * Ref which should be passed to corresponding scroller container html element.
   * It is used by hook to control current scroll position if required (e.g. on focusing cell).
   * If not specified, then local ref object will be created and returned as hook result
   */
  scrollerContainerRef?: MutableRefObject<Element>;
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
  scrollerContainerRef: MutableRefObject<Element>;
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
  style?: CSSProperties;
  className?: string;
  onScroll: UIEventHandler;
  scrollAreaStyle: CSSProperties;
  visibleAreaStyle: CSSProperties;
  /** Component which will be rendered outside of visible area */
  OutsideComponent: FunctionComponent;
  /** Props that will be passed to OutsideComponent */
  outsideComponentProps: Object;
}

export declare const ScrollerContainer: FunctionComponent<ScrollerContainerProps>

export interface ScrollerCellComponentProps {
  style: { width: number; height: number };
  value: any;
}

export interface ScrollerCellProps {
  rowIndex: number;
  columnIndex?: number;
  /** Default is 'div' */
  Component: FunctionComponent<ScrollerCellComponentProps>;
}

export declare const ScrollerCell: FunctionComponent<ScrollerCellProps>

export interface OutsideComponentProps {
  visibleRowsIndexes: number[];
  visibleColumnsIndexes: number[];
}

export interface ScrollerProps extends UseScrollerOptions, ScrollerContainerProps {
  /** Custom row component */
  RowComponent?: FunctionComponent;
  /** Props to pass to RowComponent */
  rowComponentProps?: Object;
  /** Cell component */
  CellComponent: FunctionComponent;
  OutsideComponent?: FunctionComponent<OutsideComponentProps>;
}

declare const Scroller: FunctionComponent<ScrollerProps>

export default Scroller