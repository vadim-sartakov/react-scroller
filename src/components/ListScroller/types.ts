import { ScrollData, ScrollerPropsBase, LoadPage } from '../../types';

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
}

export interface ListScrollerAsyncPropsBase<T> {
  itemsPerPage: number;
  loadPage: LoadPage<T>;
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

export interface ListScrollerPropsBase extends ScrollerPropsBase, ListScrollerSizesProps {
  rowsScrollData?: ScrollData;
  onRowsScrollDataChange?: (scrollData: ScrollData) => void;
  scrollAreaProps?: React.HTMLAttributes<HTMLDivElement>;
  visibleAreaProps?: React.HTMLAttributes<HTMLDivElement>;
  focusedCell?: number;
}
