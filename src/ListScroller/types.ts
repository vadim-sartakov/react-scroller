import { ScrollData, LoadPage } from '../types';

export interface ListScrollerSizesProps {
  defaultRowHeight: number;
  totalRows: number;
  rowsSizes?: number[];
  /* Scroller container height. Could be any valid css string */
  height?: number | string;
  /* Scroller container width. Could be any valid css string */
  width?: number | string;
}

export interface ListScrollerSyncPropsBase<T> {
  value: T[];
  itemsPerPage?: never;
  loadPage?: never;
  loadTimeout?: never;
}

export interface ListScrollerAsyncPropsBase<T> {
  itemsPerPage: number;
  loadPage: LoadPage<T>;
  loadTimeout?: number;
  value?: never;
}

export interface ListScrollerRowRenderProps<T> {
  value: T;
  style: React.CSSProperties;
  rowIndex: number;
}

export interface ListScrollerComponentRenderProps<T> {
  RowComponent: React.FC<ListScrollerRowRenderProps<T>>;
  rowComponentProps?: Record<string, unknown>;
  render?: never;
}

export interface ListScrollerRenderFuncProps<T> {
  render: (props: ListScrollerRowRenderProps<T>) => ReturnType<React.FC>;
  RowComponent?: never;
  rowComponentProps?: never;
}

export type ListScrollerRenderProps<T> =
  ListScrollerComponentRenderProps<T> |
  ListScrollerRenderFuncProps<T>;

export interface UseListScrollerProps extends ListScrollerSizesProps {
  scrollerContainerRef?: React.MutableRefObject<HTMLDivElement>;
  /* Number of elements which should be rendered outside of visible area */
  overscroll?: number;
  rowsScrollData?: ScrollData;
  onRowsScrollDataChange?: (scrollData: ScrollData) => void;
  focusedCell?: number;
  onScroll?: React.UIEventHandler<HTMLDivElement>;
}
