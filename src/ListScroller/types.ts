import { LoadPage } from '../types';

export interface ListScrollerSizesProps {
  defaultRowHeight: number;
  totalRows: number;
  rowsSizes?: number[];
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
  focusedCell?: number;
  /**
   * If set to true then scroll data will be reinitialized when sizes data change.
   * Default is true
   */
  reinitialize?: boolean;
}
