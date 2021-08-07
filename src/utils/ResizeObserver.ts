type Listener = () => void;

class ResizeObserver {
  scrollerContainerElement: HTMLDivElement;
  observer: MutationObserver;
  listener: Listener;

  constructor(scrollerContainerElement: HTMLDivElement) {
    this.scrollerContainerElement = scrollerContainerElement;
  }

  listen(listener: Listener) {
    this.listener = listener;
    const mutationCallback: MutationCallback = mutations => {
      const changedScrollerItems = mutations.some(
        mutation => this.scrollerContainerElement.contains(mutation.target),
      );
      if (!changedScrollerItems) this.listener();
    };
    this.observer = new MutationObserver(mutationCallback);
    this.observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    window.addEventListener('resize', this.listener);
  }

  cleanup() {
    this.observer.disconnect();
    window.removeEventListener('resize', this.listener);
  }
}

export default ResizeObserver;
