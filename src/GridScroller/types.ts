import { LoadPage } from '../types';
import { ListScrollerSizesProps, UseListScrollerProps } from '../ListScroller/types';

export interface GridScrollerSizesProps extends ListScrollerSizesProps {
  defaultColumnWidth: number;
  totalColumns: number;
  columnsSizes?: number[];
}

export interface GridScrollerSyncPropsBase<T> {
  value: T[][];
  itemsPerPage?: never;
  loadPage?: never;
  loadTimeout?: never;
}

export interface GridScrollerAsyncPropsBase<T> {
  itemsPerPage: number;
  loadPage: LoadPage<T[]>;
  loadTimeout?: number;
  value?: never;
}

export interface GridScrollerCellRenderProps<T> {
  value: T;
  style: React.CSSProperties;
  rowIndex: number;
  columnIndex: number;
}

export interface GridScrollerRowRenderProps {
  RowComponent?: string | React.FC;
  rowComponentProps?: Record<string, unknown>;
}

export interface GridScrollerComponentRenderProps<T> {
  CellComponent: React.FC<GridScrollerCellRenderProps<T>>;
  cellComponentProps?: Record<string, unknown>;
  render?: never;
}

export interface GridScrollerRenderFuncProps<T> {
  render: (props: GridScrollerCellRenderProps<T>) => ReturnType<React.FC>;
  CellComponent?: never;
  cellComponentProps?: never;
}

export type GridScrollerRenderProps<T> =
  GridScrollerComponentRenderProps<T> |
  GridScrollerRenderFuncProps<T>;

export interface UseGridScrollerProps extends Omit<UseListScrollerProps, 'focusedCell'>, GridScrollerSizesProps {
  /** If set to true, then css grid compatible layout will be rendered */
  gridLayout?: boolean;
  focusedCell?: { row: number, cell: number };
}
