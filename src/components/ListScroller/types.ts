import { ScrollData, ScrollerPropsBase, LoadPage } from 'types';

export interface ListScrollerProps<T> extends ScrollerPropsBase {
  value: T[];
  defaultRowHeight: number;
  totalRows: number;
  rowsSizes?: number[];
  /* Scroller container height. Could be any valid css string */
  height?: number | string;
  /* Controllable scroll data */
  rowsScrollData?: ScrollData;
  onRowsScrollDataChange?: (scrollData: ScrollData) => void;
  scrollerContainerRef?: React.MutableRefObject<HTMLDivElement>;
  focusedCell?: number;
}

export interface ListScrollerAsyncProps<T> extends Omit<ListScrollerProps<T>, 'value'> {
  itemsPerPage: number;
  loadPage: LoadPage<T>;
}

export interface ListScrollerRenderProps<T> {
  value: T;
  style: React.CSSProperties;
  rowIndex: number;
}

export interface ListScrollerComponentRenderProps<T> {
  RowComponent: React.FC<ListScrollerRenderProps<T>>;
  rowComponentProps?: Record<string, unknown>;
}

export interface ListScrollerRenderFuncProps<T> {
  render: (props: ListScrollerRenderProps<T>) => ReturnType<React.FC>;
}
