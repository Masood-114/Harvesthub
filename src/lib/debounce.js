const debounce = (fn, delay) => {
  let timeout;
  return (...arg) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...arg);
    }, delay);
  };
};

export default debounce;
