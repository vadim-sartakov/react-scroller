import {
  GridScrollerPropsBase,
  GridScrollerSyncPropsBase,
  GridScrollerAsyncPropsBase,
  GridScrollerRenderProps,
  GridScrollerRenderFuncProps,
  GridScrollerComponentRenderProps,
} from './types';

export const isGridScrollerProps = (
  props: any,
): props is GridScrollerPropsBase => (
  'defaultColumnWidth' in props
);

export const isRenderFuncProps = <T>(
  props: GridScrollerRenderProps<T>,
): props is GridScrollerRenderFuncProps<T> => (
    'render' in props
  );

export const isComponentRenderProps = <T>(
  props: GridScrollerRenderProps<T>,
): props is GridScrollerComponentRenderProps<T> => (
    'CellComponent' in props
  );

export const isSyncGridScroller = <T>(
  props: GridScrollerSyncPropsBase<T> | GridScrollerAsyncPropsBase<T>,
): props is GridScrollerSyncPropsBase<T> => (
    'value' in props
  );

export const isAsyncListScroller = <T>(
  props: GridScrollerSyncPropsBase<T> | GridScrollerAsyncPropsBase<T>,
): props is GridScrollerAsyncPropsBase<T> => (
    'loadPage' in props && 'itemsPerPage' in props
  );
