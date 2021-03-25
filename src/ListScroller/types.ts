import { ScrollData, ScrollerPropsBase } from 'types';

export interface ListScrollerProps extends ScrollerPropsBase {
  value: any[];
  defaultRowHeight: number;
  totalRows: number;
  rowsSizes?: number[];
  /* Scroller container height. Could be any valid css string */
  height?: number | string;
  /* Controllable scroll data */
  rowsScrollData?: ScrollData;
  onRowsScrollDataChange?: (scrollData: ScrollData) => void;
  focusedCell?: number;
}
