import {
  getScrollDataWithDefaultSize,
  getScrollDataWithCustomSizes,
  shiftScroll,
  getCellPosition,
  getCellsSize,
} from './scroll';

//             0   20  50  100 180 200 210 260 350 390 offsets
//             20  50  100 180 200 210 260 350 390 420 scroll
const sizes = [20, 30, 50, 80, 20, 10, 50, 90, 40, 30]; // 420 - total size
//             0   1   2   3   4   5   6   7   8   9  index

describe('Scroller utils', () => {
  describe('getScrollDataWithDefaultSize', () => {
    it('should return first visible indexes with default overscroll', () => {
      const result = getScrollDataWithDefaultSize({
        containerSize: 50, defaultSize: 10, scroll: 0, totalCount: 200,
      });
      expect(result).toEqual({
        offset: 0,
        visibleIndexes: [0, 1, 2, 3, 4],
      });
    });

    it('should not get out of start bounds with overscroll value', () => {
      const result = getScrollDataWithDefaultSize({
        containerSize: 50, defaultSize: 10, scroll: 10, totalCount: 200, overscroll: 2,
      });
      expect(result).toEqual({
        offset: 0,
        visibleIndexes: [0, 1, 2, 3, 4, 5, 6, 7],
      });
    });

    it('should not get out of end bounds with overscroll value', () => {
      const result = getScrollDataWithDefaultSize({
        containerSize: 50, defaultSize: 10, scroll: 1955, totalCount: 200, overscroll: 2,
      });
      expect(result).toEqual({
        offset: 1930,
        visibleIndexes: [193, 194, 195, 196, 197, 198, 199],
      });
    });

    it('should return visible indexes in middle scroll and default overscroll', () => {
      const result = getScrollDataWithDefaultSize({
        containerSize: 50, defaultSize: 10, scroll: 55, totalCount: 200,
      });
      expect(result).toEqual({
        offset: 50,
        visibleIndexes: [5, 6, 7, 8, 9],
      });
    });

    it('should return visible indexes in middle scroll and provided overscroll value', () => {
      const result = getScrollDataWithDefaultSize({
        containerSize: 50, defaultSize: 10, scroll: 50, totalCount: 200, overscroll: 2,
      });
      expect(result).toEqual({
        offset: 30,
        visibleIndexes: [3, 4, 5, 6, 7, 8, 9, 10, 11],
      });
    });

    it('should return last visible indexes when overscrolled', () => {
      const result = getScrollDataWithDefaultSize({
        containerSize: 50, defaultSize: 10, scroll: 80, totalCount: 10,
      });
      expect(result).toEqual({
        offset: 80,
        visibleIndexes: [8, 9],
      });
    });
  });

  describe('getScrollDataWithCustomSizes', () => {
    it('should return first visible indexes', () => {
      const result = getScrollDataWithCustomSizes({
        sizes, containerSize: 50, defaultSize: 10, totalCount: 200, scroll: 0,
      });
      expect(result).toEqual({
        offset: 0,
        visibleIndexes: [0, 1],
      });
    });

    it('should return first extended visible indexes when overscroll specified', () => {
      const result = getScrollDataWithCustomSizes({
        sizes, containerSize: 50, defaultSize: 10, totalCount: 200, scroll: 0, overscroll: 2,
      });
      expect(result).toEqual({
        offset: 0,
        visibleIndexes: [0, 1, 2, 3],
      });
    });

    it('should return middle visible indexes when scrolled', () => {
      const result = getScrollDataWithCustomSizes({
        sizes, containerSize: 50, defaultSize: 10, totalCount: 200, scroll: 175,
      });
      expect(result).toEqual({
        offset: 100,
        visibleIndexes: [3, 4, 5, 6],
      });
    });

    it('should return extended middle visible indexes when scrolled and overscroll value provided', () => {
      const result = getScrollDataWithCustomSizes({
        sizes, containerSize: 50, defaultSize: 10, totalCount: 200, scroll: 175, overscroll: 2,
      });
      expect(result).toEqual({
        offset: 20,
        visibleIndexes: [1, 2, 3, 4, 5, 6, 7, 8],
      });
    });

    it('should return last visible indexes when overscrolled', () => {
      const result = getScrollDataWithCustomSizes({
        sizes, containerSize: 50, defaultSize: 10, scroll: 389, totalCount: 10,
      });
      expect(result).toEqual({
        offset: 350,
        visibleIndexes: [8, 9],
      });
    });
  });

  describe('shiftScroll', () => {
    it('should shift forward on scroll', () => {
      const prevScrollData = {
        offset: 100,
        visibleIndexes: [3, 4, 5, 6],
      };
      const result = shiftScroll({
        sizes,
        prevScrollData,
        defaultSize: 10,
        totalCount: 200,
        containerSize: 50,
        prevScroll: 175,
        scroll: 205,
      });
      expect(result).toEqual({
        offset: 200,
        visibleIndexes: [5, 6],
      });
    });

    it('should shift forward with overscroll', () => {
      const prevScrollData = {
        offset: 50,
        visibleIndexes: [2, 3, 4, 5, 6, 7],
      };
      const result = shiftScroll({
        sizes,
        prevScrollData,
        defaultSize: 10,
        totalCount: 200,
        containerSize: 50,
        prevScroll: 175,
        scroll: 205,
        overscroll: 1,
      });
      expect(result).toEqual({
        offset: 180,
        visibleIndexes: [4, 5, 6, 7],
      });
    });

    it('should shift forward to the last element', () => {
      const prevScrollData = {
        offset: 100,
        visibleIndexes: [3, 4, 5, 6],
      };
      const result = shiftScroll({
        sizes,
        prevScrollData,
        defaultSize: 10,
        totalCount: 200,
        containerSize: 50,
        prevScroll: 175,
        scroll: 2280,
      });
      expect(result).toEqual({
        offset: 2270,
        visibleIndexes: [195, 196, 197, 198, 199],
      });
    });

    it('should stay on same position when scrolled forward by small value', () => {
      const prevScrollData = {
        offset: 100,
        visibleIndexes: [3, 4, 5, 6],
      };
      const result = shiftScroll({
        sizes,
        prevScrollData,
        defaultSize: 10,
        totalCount: 200,
        containerSize: 50,
        prevScroll: 175,
        scroll: 176,
      });
      expect(result).toEqual({
        offset: 100,
        visibleIndexes: [3, 4, 5, 6],
      });
    });

    it('should shift backward', () => {
      const prevScrollData = {
        offset: 100,
        visibleIndexes: [3, 4, 5, 6],
      };
      const result = shiftScroll({
        sizes,
        prevScrollData,
        defaultSize: 10,
        totalCount: 200,
        containerSize: 50,
        prevScroll: 175,
        scroll: 95,
      });
      expect(result).toEqual({
        offset: 50,
        visibleIndexes: [2, 3],
      });
    });

    it('should stay on same position when scrolled backward by small value with overscroll', () => {
      const prevScrollData = {
        offset: 50,
        visibleIndexes: [2, 3, 4, 5, 6, 7],
      };
      const result = shiftScroll({
        sizes,
        prevScrollData,
        defaultSize: 10,
        totalCount: 200,
        containerSize: 50,
        prevScroll: 176,
        scroll: 175,
        overscroll: 1,
      });
      expect(result).toEqual({
        offset: 50,
        visibleIndexes: [2, 3, 4, 5, 6, 7],
      });
    });

    it('should stay on same position on start and shift on end when scrolled backward by small value with overscroll', () => {
      const sizes = [50, 50, 1, 1, 1, 1];
      const prevScrollData = {
        offset: 0,
        visibleIndexes: [0, 1, 2, 3, 4],
      };
      const result = shiftScroll({
        sizes,
        prevScrollData,
        defaultSize: 10,
        totalCount: 200,
        containerSize: 50,
        prevScroll: 52,
        scroll: 51,
        overscroll: 1,
      });
      expect(result).toEqual({
        offset: 0,
        visibleIndexes: [0, 1, 2, 3],
      });
    });

    it('should not add end overscroll when scrolled back on small sized items', () => {
      const sizes = [1, 1, 1, 50, 1, 1];
      const prevScrollData = {
        offset: 2,
        visibleIndexes: [2, 3, 4, 5],
      };
      const result = shiftScroll({
        sizes,
        prevScrollData,
        defaultSize: 10,
        totalCount: 200,
        containerSize: 2,
        prevScroll: 53,
        scroll: 51,
        overscroll: 1,
      });
      expect(result).toEqual({
        offset: 2,
        visibleIndexes: [2, 3, 4],
      });
    });

    it('should move backward to scroll 0', () => {
      const prevScrollData = {
        offset: 100,
        visibleIndexes: [3, 4, 5, 6],
      };
      const result = shiftScroll({
        sizes,
        prevScrollData,
        defaultSize: 10,
        totalCount: 200,
        containerSize: 50,
        prevScroll: 175,
        scroll: 0,
      });
      expect(result).toEqual({
        offset: 0,
        visibleIndexes: [0, 1],
      });
    });
  });

  describe('getCellPosition', () => {
    it('should calculate cells position', () => {
      const sizes = [undefined, 30, 40, 50];
      const result = getCellPosition({ sizes, index: 3, defaultSize: 10 });
      expect(result).toBe(80);
    });
  });

  describe('getCellsSize', () => {
    it('should calculate cells size with specified index', () => {
      const sizes = [20, undefined, 40, 50];
      const result = getCellsSize({
        sizes, startIndex: 1, count: 2, defaultSize: 10,
      });
      expect(result).toBe(50);
    });
  });
});
