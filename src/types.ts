import React from 'react';

export interface ScrollData {
  offset: number;
  visibleIndexes: number[];
}

export interface Page<T> {
  page: number;
  data: T[];
}

export type LoadPage<T> = (page: number, itemsPerPage: number) => Promise<T[]> | T[];

export interface AsyncProps<T> {
  itemsPerPage: number;
  loadPage: LoadPage<T>;
}

export interface ScrollerPropsBase {
  scrollerContainerRef?: React.MutableRefObject<HTMLDivElement>;
  scrollerContainerProps?: React.HTMLAttributes<HTMLDivElement>;
  /* Number of elements which should be rendered out of visible scroller container */
  overscroll?: number;
}
