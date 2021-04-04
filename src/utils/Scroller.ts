import { ScrollData } from 'types';
import {
  getScrollDataWithDefaultSize,
  getScrollDataWithCustomSizes,
  shiftScroll,
  getCustomSizesTotal,
  getCellPosition,
} from './utils';

interface ScrollerArgs {
  scroll?: number;
  defaultSize: number;
  totalCount: number;
  containerSize: number;
  sizes?: number[];
  overscroll?: number;
}

class Scroller {
  scroll = 0;
  defaultSize: number;
  totalCount: number;
  containerSize: number;
  sizes: number[];
  overscroll?: number;
  scrollData: ScrollData = { offset: 0, visibleIndexes: [] };
  prevScroll = 0;
  prevScrollData: ScrollData = { offset: 0, visibleIndexes: [] };

  constructor(args: ScrollerArgs) {
    this.initialize(args);
  }

  initialize(args: ScrollerArgs) {
    this.scroll = args.scroll;
    this.defaultSize = args.defaultSize;
    this.totalCount = args.totalCount;
    this.sizes = args.sizes;
    this.overscroll = args.overscroll;
    this.containerSize = args.containerSize;
    this.scrollData = this.getScrollData();
    this.prevScrollData = { ...this.scrollData };
  }

  getTotalSize() {
    return this.sizes?.length
      ? getCustomSizesTotal(this)
      : this.totalCount * this.defaultSize;
  }

  private getScrollData() {
    return this.sizes?.length
      ? getScrollDataWithCustomSizes(this)
      : getScrollDataWithDefaultSize(this);
  }

  scrollTo(scroll: number) {
    this.prevScroll = this.scroll;
    this.prevScrollData = { ...this.scrollData };
    this.scroll = scroll;

    let nextScrollData: ScrollData;
    if (this.sizes?.length) {
      nextScrollData = shiftScroll({
        ...this,
        scroll,
      });
    } else {
      nextScrollData = getScrollDataWithDefaultSize({
        ...this,
        scroll,
      });
    }

    this.scrollData = nextScrollData;
    return this;
  }

  scrollToIndex(index: number, position: 'start' | 'center' | 'end' = 'center') {
    let nextScroll = getCellPosition({ ...this, index });
    const itemSize = (this.sizes?.[index] || this.defaultSize);
    switch (position) {
      case 'center':
        nextScroll -= (this.containerSize / 2) - (itemSize / 2);
        break;
      case 'end':
        nextScroll -= this.containerSize - itemSize;
        break;
      default:
    }
    this.scrollTo(nextScroll);
  }

  updateContainerSize(containerSize: number) {
    this.containerSize = containerSize;
    this.prevScrollData = { ...this.scrollData };
    this.scrollData = this.getScrollData();
    return this;
  }
}

export default Scroller;
