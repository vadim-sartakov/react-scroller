export interface ScrollData {
  offset: number;
  visibleIndexes: number[];
}

export interface Page<T> {
  index: number;
  data: T[];
}

export type LoadPage<T> = (page: number, itemsPerPage: number) => Promise<T[]>;

export interface ScrollerCustomProps {
  scrollAreaProps?: React.HTMLAttributes<HTMLDivElement>;
  visibleAreaProps?: React.HTMLAttributes<HTMLDivElement>;
  scrollerContainerProps?: React.HTMLAttributes<HTMLDivElement>;
  resizerContainerRef?: React.MutableRefObject<HTMLDivElement>;
}
