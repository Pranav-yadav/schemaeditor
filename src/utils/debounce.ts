// @ts-nocheck
const debounce = (callback, wait: number) => {
  let timeoutId: number | null = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};

export default debounce;
