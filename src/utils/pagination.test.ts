import {
  getItemsCountOnPage,
  getPagesToLoad,
} from './pagination';

describe('Scroller pagination', () => {
  describe('getItemsCountOnPage', () => {
    it('should return items per page count on middle page', () => {
      expect(getItemsCountOnPage(1, 10, 35)).toBe(10);
    });

    it('should return only remained items on last page', () => {
      expect(getItemsCountOnPage(3, 10, 35)).toBe(5);
    });
  });

  describe('getPagesToLoad', () => {
    it('should return pages 0, 1 at the start with no overscroll', () => {
      const result = getPagesToLoad({
        visibleIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        itemsPerPage: 5,
        totalPages: 5,
      });
      expect(result).toEqual([0, 1]);
    });

    it('should return 0, 1, 2, 3 pages at the start with and overscroll = 2', () => {
      const result = getPagesToLoad({
        visibleIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        itemsPerPage: 5,
        totalPages: 5,
        overscrollPages: 2,
      });
      expect(result).toEqual([0, 1, 2, 3]);
    });

    it('should return 1, 2 pages at the middle and no overscroll', () => {
      const result = getPagesToLoad({
        visibleIndexes: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        itemsPerPage: 5,
        totalPages: 5,
      });
      expect(result).toEqual([1, 2]);
    });

    it('should return 0, 1, 2, 3 pages at the middle and overscroll = 1', () => {
      const result = getPagesToLoad({
        visibleIndexes: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
        itemsPerPage: 5,
        totalPages: 5,
        overscrollPages: 1,
      });
      expect(result).toEqual([0, 1, 2, 3]);
    });
  });
});
