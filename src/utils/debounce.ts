const debounce = <F extends (...args: any) => void>(fun: F, timeout: number) => {
  let timeoutId: number;

  const debounced = (...args: Parameters<F>) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(
      () => fun(...args),
      timeout,
    );
  };

  return debounced;
};

export default debounce;
