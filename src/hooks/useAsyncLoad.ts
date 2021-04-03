import { useState, useEffect, useRef } from 'react';
import { LoadPage } from 'types';
import AsyncLoader from 'utils/AsyncLoader';

export interface UseAsyncLoadProps<T> {
  visibleIndexes: number[];
  itemsPerPage: number;
  totalCount: number;
  loadPage: LoadPage<T>;
}

interface UseAsyncLoadResult<T> {
  value: T[];
}

function useAsyncLoad<T>({
  visibleIndexes,
  itemsPerPage,
  totalCount,
  loadPage,
}: UseAsyncLoadProps<T>): UseAsyncLoadResult<T> {
  const [value, setValue] = useState<T[]>([]);

  const asyncLoaderRef = useRef(loadPage && new AsyncLoader<T>({
    itemsPerPage,
    totalCount,
    loadPage,
  }));

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
    asyncLoaderRef.current.loadPages(visibleIndexes, setValue);
  }, [visibleIndexes]);

  return { value };
}

export default useAsyncLoad;
