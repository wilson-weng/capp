export const debounce = (func, wait) => {
  let timerId;
  wait = +wait || 0;
  return function debounced (...args) {
    timerId && clearTimeout(timerId);
    timerId = setTimeout(() => func.apply(this, args), wait);
  };
};
