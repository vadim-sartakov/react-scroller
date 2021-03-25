import { createContext } from 'react';

export interface ListScrollerContextProps {
  value: any[];
  defaultRowHeight: number;
  rowsSizes?: number[];
}

const ListScrollerContext = createContext<ListScrollerContextProps>(undefined);

export default ListScrollerContext;
