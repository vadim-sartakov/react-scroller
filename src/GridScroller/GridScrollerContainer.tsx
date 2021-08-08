import * as React from 'react';
import { GridScrollerSizesProps } from './types';

export interface GridScrollerContainerProps extends
  React.HTMLAttributes<HTMLDivElement>,
  Pick<GridScrollerSizesProps, 'width' | 'height'> {
  containerRef?: React.MutableRefObject<HTMLDivElement>,
}

const GridScrollerContainer = ({
  width,
  height,
  onScroll,
  style,
  containerRef,
  ...props
}: GridScrollerContainerProps) => (
  <div
    {...props}
    ref={containerRef}
    style={{
      width,
      height,
      overflow: height && 'auto',
      ...style,
    }}
    onScroll={onScroll}
  />
);

export default GridScrollerContainer;
