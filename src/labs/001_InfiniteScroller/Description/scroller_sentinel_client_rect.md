Keep track of a sentinel using `getBoundingClientRect()` relative to the container element.

As soon as the sentinel enters the visible area send a fetch request for new records. When the data is received make one of the new records the sentinel and stop keeping track of the previous one. In this example, the pink record is the `Card` that either was or is sentinel.