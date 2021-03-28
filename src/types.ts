export interface ScrollData {
  offset: number;
  visibleIndexes: number[];
}

export interface Page<T> {
  page: number;
  data: T[];
}

export interface ScrollerPropsBase {
  /* Number of elements which should be rendered out of visible scroller container */
  overscroll?: number;
}
