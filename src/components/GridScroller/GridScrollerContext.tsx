import { createContext } from 'react';

export interface GridScrollerContextProps<T = any> {
  value: T[][];
  defaultRowHeight: number;
  defaultColumnWidth: number;
  rowsSizes?: number[];
  columnsSizes?: number[];
}

const GridScrollerContext = createContext<GridScrollerContextProps>(undefined);

export default GridScrollerContext;
