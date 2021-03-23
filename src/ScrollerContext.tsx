import { createContext } from 'react';

export interface ScrollerContextProps {
  value: any[] | any[][];
  defaultRowHeight: number;
  defaultColumnWidth?: number;
  rowsSizes?: number[];
  columnsSizes?: number[];
}

const ScrollerContext = createContext<ScrollerContextProps>(undefined);

export default ScrollerContext;
