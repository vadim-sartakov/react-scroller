import {
  useState,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import { LoadPage } from '../types';
import AsyncLoader from '../utils/AsyncLoader';
import debounce from '../utils/debounce';

export interface UseAsyncLoadProps<T> {
  visibleIndexes: number[];
  itemsPerPage: number;
  totalCount: number;
  loadPage: LoadPage<T>;
  loadTimeout?: number;
}

interface UseAsyncLoadResult<T> {
  value: T[];
}

function useAsyncLoad<T>({
  visibleIndexes,
  itemsPerPage,
  totalCount,
  loadPage,
  loadTimeout = 200,
}: UseAsyncLoadProps<T>): UseAsyncLoadResult<T> {
  const [value, setValue] = useState<T[]>([]);

  const asyncLoaderRef = useRef(loadPage && new AsyncLoader<T>({
    itemsPerPage,
    totalCount,
    loadPage,
  }));

  const handleLoadPages = useMemo(
    () => debounce(
      asyncLoaderRef.current?.loadPages.bind(asyncLoaderRef.current),
      loadTimeout,
    ),
    [loadTimeout],
  );

  useEffect(() => {
    if (!asyncLoaderRef.current) return;
    asyncLoaderRef.current.initialize({
      itemsPerPage,
      totalCount,
      loadPage,
    });
    setValue([]);
    asyncLoaderRef.current.loadPages(asyncLoaderRef.current.visibleIndexes, setValue);
  }, [itemsPerPage, totalCount, loadPage]);

  useEffect(() => {
    if (!asyncLoaderRef.current) return;
    handleLoadPages(visibleIndexes, setValue);
  }, [visibleIndexes, handleLoadPages]);

  return { value };
}

export default useAsyncLoad;
