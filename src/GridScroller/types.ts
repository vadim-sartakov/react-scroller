import { ScrollData } from 'types';
import { ListScrollerProps } from 'ListScroller/types';

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
