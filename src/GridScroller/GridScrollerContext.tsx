import { createContext } from 'react';

export interface GridScrollerContextProps {
  value: any[][];
  defaultRowHeight: number;
  defaultColumnWidth: number;
  rowsSizes?: number[];
  columnsSizes?: number[];
}

const GridScrollerContext = createContext<GridScrollerContextProps>(undefined);

export default GridScrollerContext;
