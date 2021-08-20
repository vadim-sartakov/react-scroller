import * as React from 'react';

export interface GridScrollerContainerProps extends
  React.HTMLAttributes<HTMLDivElement> {
  containerRef?: React.MutableRefObject<HTMLDivElement>,
}

const GridScrollerContainer = ({
  onScroll,
  style,
  containerRef,
  ...props
}: GridScrollerContainerProps) => (
  <div
    {...props}
    ref={containerRef}
    style={{
      overflow: 'auto',
      ...style,
    }}
    onScroll={onScroll}
  />
);

export default GridScrollerContainer;
