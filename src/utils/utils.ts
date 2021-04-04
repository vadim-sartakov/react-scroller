import { ScrollData } from 'types';

function applyStartOverscroll(startIndex: number, overscroll = 0) {
  return Math.max(startIndex - overscroll, 0);
}

function applyEndOverscroll(endIndex: number, totalCount: number, overscroll = 0) {
  return Math.min(endIndex + overscroll, totalCount - 1);
}

function getVisibleIndexesRange(startIndex: number, endIndex: number) {
  const result = [];
  for (let i = startIndex; i <= endIndex; i++) result.push(i);
  return result;
}

interface FindLastIndexArgs {
  targetScroll: number;
  offset: number;
  firstIndex: number;
  sizes: number[];
  totalCount: number;
  defaultSize: number;
  containerSize: number;
  overscroll?: number;
}

function findLastIndex({
  targetScroll,
  offset,
  firstIndex,
  sizes,
  totalCount,
  defaultSize,
  containerSize,
  overscroll = 0,
}: FindLastIndexArgs) {
  let lastIndex;
  let curIndex = firstIndex;
  let curOffset = offset;
  while (lastIndex === undefined && curIndex <= totalCount) {
    const curSize = sizes[curIndex] || defaultSize;
    curOffset += curSize;
    if (curOffset >= targetScroll + containerSize) lastIndex = curIndex;
    curIndex++;
  }
  // Assuming we reached a last element
  if (lastIndex === undefined) lastIndex = totalCount - 1;
  lastIndex = applyEndOverscroll(lastIndex, totalCount, overscroll);
  return lastIndex;
}

interface ReduceOverscrolledOffsetArgs {
  offset: number;
  overscroll: number;
  firstIndex: number;
  sizes: number[];
  defaultSize: number;
}

function reduceOverscrolledOffset({
  offset, overscroll, firstIndex, sizes, defaultSize,
}: ReduceOverscrolledOffsetArgs) {
  let resultOffset = offset;
  if (overscroll) {
    for (let i = 1; i <= overscroll; i++) {
      const curIndex = firstIndex - i;
      if (curIndex < 0) break;
      const curSize = sizes[curIndex] || defaultSize;
      resultOffset -= curSize;
    }
  }
  return resultOffset;
}

interface FindNextFirstIndexAndOffset {
  startIndex: number;
  startScroll: number;
  targetScroll: number;
  sizes: number[];
  totalCount: number;
  defaultSize: number;
  overscroll?: number;
}

function findNextFirstIndexAndOffset({
  startIndex, startScroll, targetScroll, sizes, totalCount, defaultSize, overscroll = 0,
}: FindNextFirstIndexAndOffset) {
  let firstIndex; let
    offset;
  let curIndex = startIndex;
  let curScroll = startScroll;
  let curOffset = startScroll;

  while (firstIndex === undefined && curIndex < totalCount) {
    const curSize = sizes[curIndex] || defaultSize;
    curScroll += curSize;
    if (curScroll >= targetScroll) {
      firstIndex = curIndex;
      offset = curOffset;
    }
    curOffset += curSize;
    curIndex++;
  }
  offset = reduceOverscrolledOffset({
    offset, overscroll, firstIndex, sizes, defaultSize,
  });
  firstIndex = applyStartOverscroll(firstIndex, overscroll);
  return { firstIndex, offset };
}

interface GetScrollDataWithDefaultSizeArgs {
  containerSize: number;
  defaultSize: number;
  totalCount: number;
  scroll: number;
  overscroll?: number;
}

export function getScrollDataWithDefaultSize({
  containerSize, defaultSize, totalCount, scroll, overscroll = 0,
}: GetScrollDataWithDefaultSizeArgs): ScrollData {
  const visibleElementsCount = Math.ceil(containerSize / defaultSize);
  const maxIndex = totalCount - 1;
  let firstIndex = Math.max(Math.floor(scroll / defaultSize), 0);
  let lastIndex = Math.min((firstIndex + visibleElementsCount) - 1, maxIndex);
  firstIndex = applyStartOverscroll(firstIndex, overscroll);
  lastIndex = applyEndOverscroll(lastIndex, totalCount, overscroll);
  const visibleIndexes = getVisibleIndexesRange(firstIndex, lastIndex);
  const offset = defaultSize * firstIndex;
  return { offset, visibleIndexes };
}

interface GetScrollDataWithCustomSizesArgs {
  scroll: number;
  sizes: number[];
  containerSize: number;
  defaultSize: number;
  totalCount: number;
  overscroll?: number;
}

export function getScrollDataWithCustomSizes({
  scroll: targetScroll, sizes, containerSize, defaultSize, totalCount, overscroll = 0,
}: GetScrollDataWithCustomSizesArgs): ScrollData {
  const { offset, firstIndex } = findNextFirstIndexAndOffset({
    startIndex: 0, startScroll: 0, targetScroll, totalCount, sizes, defaultSize, overscroll,
  });
  const lastIndex = findLastIndex({
    targetScroll, offset, firstIndex, sizes, totalCount, defaultSize, containerSize, overscroll,
  });
  const visibleIndexes = getVisibleIndexesRange(firstIndex, lastIndex);
  return { offset, visibleIndexes };
}

interface FindPrevFirstIndexAndOffsetArgs {
  startIndex: number;
  startScroll: number;
  targetScroll: number;
  sizes: number[];
  defaultSize: number;
  overscroll?: number;
}

function findPrevFirstIndexAndOffset({
  startIndex, startScroll, targetScroll, sizes, defaultSize, overscroll = 0,
}: FindPrevFirstIndexAndOffsetArgs) {
  let firstIndex; let
    offset;
  let curIndex = startIndex;
  let curScroll = startScroll;
  while (firstIndex === undefined && curIndex >= 0) {
    const curSize = sizes[curIndex] || defaultSize;
    curScroll -= curSize;
    if (curScroll <= targetScroll) {
      firstIndex = curIndex;
      offset = curScroll;
    }
    curIndex--;
  }
  // Restricting accumulative overscroll apply when
  // scrolled by small amount and index remain the same
  if (firstIndex !== startIndex) {
    offset = reduceOverscrolledOffset({
      offset, overscroll, firstIndex, sizes, defaultSize,
    });
    firstIndex = applyStartOverscroll(firstIndex, overscroll);
  }
  return { firstIndex, offset };
}

interface ShiftScrollBackward {
  startIndex: number;
  startOffset: number;
  targetScroll: number;
  sizes: number[];
  defaultSize: number;
  totalCount: number;
  containerSize: number;
  overscroll?: number;
}

function shiftScrollBackward({
  startIndex,
  startOffset,
  targetScroll,
  sizes,
  defaultSize,
  totalCount,
  containerSize,
  overscroll = 0,
}: ShiftScrollBackward): ScrollData {
  const curSize = sizes[startIndex] || defaultSize;
  const { offset, firstIndex } = findPrevFirstIndexAndOffset({
    startIndex, startScroll: startOffset + curSize, targetScroll, sizes, defaultSize, overscroll,
  });
  const lastIndex = findLastIndex({
    targetScroll, offset, firstIndex, sizes, totalCount, defaultSize, containerSize, overscroll,
  });
  const visibleIndexes = getVisibleIndexesRange(firstIndex, lastIndex);
  return { offset, visibleIndexes };
}

interface ShiftScrollForwardArgs {
  startIndex: number;
  startOffset: number;
  targetScroll: number;
  sizes: number[];
  defaultSize: number;
  totalCount: number;
  containerSize: number;
  overscroll?: number;
}

function shiftScrollForward({
  startIndex,
  startOffset,
  targetScroll,
  sizes,
  defaultSize,
  totalCount,
  containerSize,
  overscroll = 0,
}: ShiftScrollForwardArgs): ScrollData {
  const { offset, firstIndex } = findNextFirstIndexAndOffset({
    startIndex, startScroll: startOffset, targetScroll, totalCount, sizes, defaultSize, overscroll,
  });
  const lastIndex = findLastIndex({
    targetScroll, offset, firstIndex, sizes, totalCount, defaultSize, containerSize, overscroll,
  });
  const visibleIndexes = getVisibleIndexesRange(firstIndex, lastIndex);
  return { offset, visibleIndexes };
}

interface ShiftScrollArgs {
  prevScrollData: ScrollData;
  prevScroll: number;
  sizes: number[];
  scroll: number;
  containerSize: number;
  totalCount: number;
  defaultSize: number;
  overscroll?: number;
}

export function shiftScroll({
  prevScrollData, prevScroll, sizes, scroll, containerSize, totalCount, defaultSize, overscroll = 0,
}: ShiftScrollArgs) {
  const scrollDiff = scroll - prevScroll;
  const firstPrevIndex = prevScrollData.visibleIndexes[0];

  if (scrollDiff > 0) {
    const { offset, visibleIndexes } = shiftScrollForward({
      startIndex: firstPrevIndex,
      startOffset: prevScrollData.offset,
      targetScroll: scroll,
      sizes,
      defaultSize,
      containerSize,
      totalCount,
      overscroll,
    });
    return { offset, visibleIndexes };
  } if (scrollDiff < 0) {
    const { offset, visibleIndexes } = shiftScrollBackward({
      startIndex: firstPrevIndex,
      startOffset: prevScrollData.offset,
      targetScroll: scroll,
      sizes,
      defaultSize,
      totalCount,
      containerSize,
      overscroll,
    });
    return { offset, visibleIndexes };
  }
  return prevScrollData;
}

interface GetCustomSizesTotalArgs {
  sizes: number[];
  totalCount: number;
  defaultSize: number;
}

export function getCustomSizesTotal({ sizes, totalCount, defaultSize }: GetCustomSizesTotalArgs) {
  return [...new Array(totalCount).keys()].reduce<number>((acc, key) => {
    const curSize = sizes[key] || defaultSize;
    return acc + curSize;
  }, 0);
}

interface GetCellPositionArgs {
  sizes: number[];
  index: number;
  defaultSize: number;
}

/**
 * Calculates cell position (top or left absolute position)
 */
export function getCellPosition({ sizes, index, defaultSize }: GetCellPositionArgs) {
  return sizes?.length ? [...new Array(index).keys()].reduce((acc, key, index) => {
    const curSize = sizes[index] || defaultSize;
    return acc + curSize;
  }, 0) : index * defaultSize;
}

interface GetCellsSizeArgs {
  startIndex?: number;
  sizes: number[];
  count: number;
  defaultSize: number;
}

export function getCellsSize({
  startIndex = 0, sizes, count, defaultSize,
}: GetCellsSizeArgs) {
  if (!count) return 0;
  return sizes && sizes.length ? [...new Array(count).keys()].reduce((acc, key, index) => {
    const curSize = sizes[index + startIndex] || defaultSize;
    return acc + curSize;
  }, 0) : count * defaultSize;
}
