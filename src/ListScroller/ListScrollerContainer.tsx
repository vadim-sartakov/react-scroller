import * as React from 'react';
import { ListScrollerSizesProps } from './types';

export interface ListScrollerContainerProps extends
  React.HTMLAttributes<HTMLDivElement>,
  Pick<ListScrollerSizesProps, 'width' | 'height'> {
  containerRef?: React.MutableRefObject<HTMLDivElement>,
}

const ListScrollerContainer: React.FC<ListScrollerContainerProps> = ({
  height,
  width,
  onScroll,
  style,
  containerRef,
  ...props
}) => (
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

export default ListScrollerContainer;
