import { LoadPage, Page } from 'types';

export function getTotalPages(totalCount: number, itemsPerPage: number) {
  return Math.ceil(totalCount / itemsPerPage);
}

export function getItemsCountOnPage(page: number, itemsPerPage: number, totalCount: number) {
  if (page === undefined) return 0;
  const totalPages = getTotalPages(totalCount, itemsPerPage);
  if (page >= totalPages) return 0;
  return page < totalPages - 1 ? itemsPerPage : totalCount - (page * itemsPerPage);
}

interface GetPagesToLoadArgs {
  visibleIndexes: number[],
  itemsPerPage: number;
  totalPages: number;
  overscrollPages?: number;
}

export function getPagesToLoad({
  visibleIndexes,
  itemsPerPage,
  overscrollPages = 0,
  totalPages,
}: GetPagesToLoadArgs): number[] {
  if (visibleIndexes.length === 0) return [];
  const result: number[] = [];
  for (
    let i = visibleIndexes[0];
    i < visibleIndexes[visibleIndexes.length - 1];
    i += itemsPerPage
  ) {
    const page = Math.floor(i / itemsPerPage);
    result.push(page);
  }

  for (let i = 0; i < overscrollPages; i++) {
    const firstPage = result[0];
    const lastPage = result[result.length - 1];
    if (firstPage > 0) result.unshift(firstPage - 1);
    if (lastPage < totalPages - 1) result.push(lastPage + 1);
  }

  return result;
}

interface LoadPagesArgs<T> {
  itemsPerPage: number;
  pagesToLoad: number[];
  loadPage: LoadPage<T>;
}

export async function loadPages<T>({
  itemsPerPage,
  pagesToLoad,
  loadPage,
}: LoadPagesArgs<T>) {
  const loadPromises = pagesToLoad.map<Promise<Page<T>>>(
    (page) => new Promise(
      (resolve) => {
        loadPage(page, itemsPerPage).then((data) => {
          resolve({ page, data });
        });
      },
    ),
  );
  return Promise.all(loadPromises);
}
