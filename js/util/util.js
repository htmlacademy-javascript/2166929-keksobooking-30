const TIMER_FOR_FILTER = 500;

const isEscapeKey = (evt) => evt.key === 'Escape';

const disablesElement = (element, isDisabled) => {
  element.disabled = isDisabled;
};

const debounce = (callback, timeoutDelay = TIMER_FOR_FILTER) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, disablesElement, debounce };
