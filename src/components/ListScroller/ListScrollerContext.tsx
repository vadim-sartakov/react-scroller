import { createContext } from 'react';

export interface ListScrollerContextProps<T = any> {
  value: T[];
  defaultRowHeight: number;
  rowsSizes?: number[];
}

const ListScrollerContext = createContext<ListScrollerContextProps>(undefined);

export default ListScrollerContext;
