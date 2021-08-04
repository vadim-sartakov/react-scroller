import { HTMLAttributes } from 'react';
import { ScrollData, ScrollerPropsBase, LoadPage } from '../../types';

export interface ListScrollerPropsBase extends ScrollerPropsBase {
  defaultRowHeight: number;
  totalRows: number;
  rowsSizes?: number[];
  /* Scroller container height. Could be any valid css string */
  height?: number | string;
  /* Scroller container width. Could be any valid css string */
  width?: number | string;
  /* Controllable scroll data */
  rowsScrollData?: ScrollData;
  onRowsScrollDataChange?: (scrollData: ScrollData) => void;
  scrollerContainerRef?: React.MutableRefObject<HTMLDivElement>;
  focusedCell?: number;
  scrollAreaProps?: HTMLAttributes<HTMLDivElement>;
  visibleAreaProps?: HTMLAttributes<HTMLDivElement>;
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
