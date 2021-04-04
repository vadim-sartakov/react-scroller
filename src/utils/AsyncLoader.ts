import { LoadPage, Page } from 'types';
import {
  getTotalPages,
  getPagesToLoad,
} from 'utils/pagination';

interface AsyncLoaderProps<T> {
  itemsPerPage: number;
  totalCount: number;
  loadPage: LoadPage<T>;
  overscrollPages?: number;
}

class AsyncLoader<T> {
  pages: Page<T>[] = [];
  value: T[] = [];
  visibleIndexes: number[] = [];
  itemsPerPage: number;
  totalCount: number;
  totalPages: number;
  loadPage: LoadPage<T>;
  overscrollPages: number;

  canceled = false;

  constructor(args: AsyncLoaderProps<T>) {
    this.initialize(args);
  }

  initialize(args: AsyncLoaderProps<T>) {
    this.itemsPerPage = args.itemsPerPage;
    this.totalCount = args.totalCount;
    this.loadPage = args.loadPage;
    this.overscrollPages = args.overscrollPages;
    this.totalPages = getTotalPages(this.totalCount, this.itemsPerPage);
    this.pages = [];
    this.value = [];
  }

  loadPages(visibleIndexes: number[], onLoadPage: (value: T[]) => void) {
    this.visibleIndexes = visibleIndexes;
    const pagesToLoad = getPagesToLoad(this);

    pagesToLoad.forEach((pageIndex) => {
      if (this.pages[pageIndex]) return;

      this.pages = [...this.pages];
      this.pages[pageIndex] = { index: pageIndex, data: [] };

      this.loadPage(pageIndex, this.itemsPerPage).then((data) => {
        if (this.canceled) return;
        this.pages = [...this.pages];
        this.pages[pageIndex] = { index: pageIndex, data };
        this.value = [...this.value];
        data.forEach((item, curIndex) => {
          this.value[(pageIndex * this.itemsPerPage) + curIndex] = item;
        });
        onLoadPage(this.value);
      });
    });
  }

  cancel() {
    this.canceled = true;
  }
}

export default AsyncLoader;
