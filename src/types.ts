export interface ScrollData {
  offset: number;
  visibleIndexes: number[];
}
export interface ScrollerPropsBase {
  value: any[] | any[][];
  defaultRowHeight: number;
  defaultColumnWidth?: number;
  totalRows: number;
  totalColumns?: number;
  rowsSizes?: number[];
  columnsSizes?: number[];
  /* Scroller container height. Could be any valid css string */
  height: number | string;
  /* Scroller container width. Could be any valid css string */
  width?: number | string;
  rowsScrollData?: ScrollData;
  onRowsScrollDataChange?: (scrollData: ScrollData) => void;
  columnsScrollData?: ScrollData;
  onColumnsScrollDataChange?: (scrollData: ScrollData) => void;
  /* Number of elements which should be rendered out of visible scroller container */
  overscroll?: number;
  focusedCell?: number | { row: number, cell: number };
}

export interface ListScrollerProps {
  value: any[];
  defaultRowHeight: number;
  totalRows: number;
  rowsSizes?: number[];
  /* Scroller container height. Could be any valid css string */
  height: number | string;
  /* Controllable scroll data */
  rowsScrollData?: ScrollData;
  onRowsScrollDataChange?: (scrollData: ScrollData) => void;
  /* Number of elements which should be rendered out of visible scroller container */
  overscroll?: number;
  focusedCell?: number;
}

export interface GridScrollerProps extends Omit<ListScrollerProps, 'focusedCell'> {
  value: any[][];
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
