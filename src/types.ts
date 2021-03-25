export interface ScrollData {
  offset: number;
  visibleIndexes: number[];
}

export interface ScrollerPropsBase {
  /* Number of elements which should be rendered out of visible scroller container */
  overscroll?: number;
}
