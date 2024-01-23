const TIMER_FOR_FILTER = 500;

const isEscapeKey = (evt) => evt.key === 'Escape';

const disableElement = (element, isDisabled) => {
  element.disabled = isDisabled;
};

const removeBounce = (callback, timeoutDelay = TIMER_FOR_FILTER) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, disableElement, removeBounce };
