import { ScrollData } from 'types';
import { ListScrollerProps } from 'ListScroller/types';
import { GridScrollerCellComponentProps } from './GridScrollerCell';

export interface GridScrollerProps<T> extends Omit<ListScrollerProps<T>, 'value' | 'focusedCell' | 'RowComponent' | 'rowComponentProps'> {
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
  RowComponent?: string | React.FC;
  rowComponentProps?: Object;
  CellComponent: React.FC<GridScrollerCellComponentProps<T>>;
  cellComponentProps?: Object;
}
