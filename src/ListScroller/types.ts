import { ScrollData, ScrollerPropsBase, LoadPage } from 'types';
import { ListScrollerRowComponentProps } from './ListScrollerRow';

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
  RowComponent: React.FC<ListScrollerRowComponentProps<T>>;
  rowComponentProps?: Object;
}

export interface ListScrollerAsyncProps<T> extends Omit<ListScrollerProps<T>, 'value'> {
  itemsPerPage: number;
  loadPage: LoadPage<T>;
}
