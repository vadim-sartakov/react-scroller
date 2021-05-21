import { ScrollData, LoadPage } from '../../types';
import { ListScrollerProps } from '../ListScroller/types';

export interface GridScrollerProps<T> extends Omit<ListScrollerProps<T>, 'value' | 'focusedCell'> {
  value: T[][];
  defaultColumnWidth: number;
  totalColumns: number;
  columnsSizes?: number[];
  /* Scroller container width. Could be any valid css string */
  width?: number | string;
  /* Controllable scroll data */
  columnsScrollData?: ScrollData;
  onColumnsScrollDataChange?: (scrollData: ScrollData) => void;
  /* Number of elements which should be rendered out of visible scroller container */
  focusedCell?: { row: number, cell: number };
}

export interface GridScrollerAsyncProps<T> extends Omit<GridScrollerProps<T>, 'value'> {
  itemsPerPage: number;
  loadPage: LoadPage<T[]>;
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
}

export interface GridScrollerRenderFuncProps<T> {
  render: (props: GridScrollerCellRenderProps<T>) => ReturnType<React.FC>;
}
