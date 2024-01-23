import { validatePristine } from './form-validate.js';

const PRICE_COUNT = {
  min: 0,
  max: 100000
};

const PRICE_STEP_COUNT = 1;

const formSlider = document.querySelector('.ad-form__slider');
const inputPrice = document.querySelector('#price');

const createSlider = () => {
  noUiSlider.create(formSlider, {
    range: {
      min: PRICE_COUNT.min,
      max: PRICE_COUNT.max,
    },
    start: PRICE_COUNT.min,
    step: PRICE_STEP_COUNT,
    connect: 'lower',
    format: {
      to: function (value) {
        return value.toFixed(0);
      },
      from: function (value) {
        return parseFloat(value);
      },
    }
  });

  formSlider.noUiSlider.on('slide', () => {
    inputPrice.value = formSlider.noUiSlider.get();
    validatePristine(inputPrice);
  });
};

const onInputPriceInput = () => {
  formSlider.noUiSlider.set(inputPrice.value);
};

const updateSliderOptions = () => inputPrice.addEventListener('input', onInputPriceInput);

const resetSlider = () => formSlider.noUiSlider.reset();

export { createSlider, updateSliderOptions, resetSlider };
