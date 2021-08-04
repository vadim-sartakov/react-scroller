import {
  ListScrollerSyncPropsBase,
  ListScrollerAsyncPropsBase,
  ListScrollerRenderProps,
  ListScrollerRenderFuncProps,
  ListScrollerComponentRenderProps,
} from './types';

export const isRenderFuncProps = <T>(
  props: ListScrollerRenderProps<T>,
): props is ListScrollerRenderFuncProps<T> => (
    'render' in props
  );

export const isComponentRenderProps = <T>(
  props: ListScrollerRenderProps<T>,
): props is ListScrollerComponentRenderProps<T> => (
    'RowComponent' in props
  );

export const isSyncListScroller = <T>(
  props: ListScrollerSyncPropsBase<T> | ListScrollerAsyncPropsBase<T>,
): props is ListScrollerSyncPropsBase<T> => (
    'value' in props
  );

export const isAsyncListScroller = <T>(
  props: ListScrollerSyncPropsBase<T> | ListScrollerAsyncPropsBase<T>,
): props is ListScrollerAsyncPropsBase<T> => (
    'loadPage' in props && 'itemsPerPage' in props
  );
