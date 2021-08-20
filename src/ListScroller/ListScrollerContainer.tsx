import * as React from 'react';

export interface ListScrollerContainerProps extends
  React.HTMLAttributes<HTMLDivElement> {
  containerRef?: React.MutableRefObject<HTMLDivElement>,
}

const ListScrollerContainer: React.FC<ListScrollerContainerProps> = ({
  onScroll,
  style,
  containerRef,
  ...props
}) => (
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

export default ListScrollerContainer;
