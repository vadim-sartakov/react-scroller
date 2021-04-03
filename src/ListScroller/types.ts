import { ScrollData, ScrollerPropsBase, LoadPage } from 'types';
import { ListScrollerRenderProps } from './ListScrollerRow';

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
  RowComponent?: React.FC<ListScrollerRenderProps<T>>;
  rowComponentProps?: Object;
  render?: (props: ListScrollerRenderProps<T>) => ReturnType<React.FC>;
}

export interface ListScrollerAsyncProps<T> extends Omit<ListScrollerProps<T>, 'value'> {
  itemsPerPage: number;
  loadPage: LoadPage<T>;
}
