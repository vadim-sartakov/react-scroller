# React Scroller

A set of hooks, components and utilities for scrolling large datasets. Standalone components could be used as well as lower level hooks to achieve maximum flexibility.

## useScroller
```javascript
import { useScroller, ScrollerContainer } from '@vadim-sartakov/react-scroller';

const ListScroller = ({
  listValues,
  height
}) => {
  const {
    onScroll,
    visibleRowsIndexes,
    scrollAreaStyles,
    visibleAreaStyles,
    scrollerContainerRef
  } = useScroller({ height });
  return (
    <ScrollerContainer ref={scrollerContainerRef} onScroll={onScroll}>
      <div style={scrollAreaStyles}>
        <div style={visibleAreaStyles}>
          {visibleRowsIndexes.map(index => {
            const value = listValues[index];
            return <div key={index}>{value}</div>;
          })}
        </div>
      </div>
    </ScrollerContainer>
  );
};

```