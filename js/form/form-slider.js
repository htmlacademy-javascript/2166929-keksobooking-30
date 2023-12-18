const MAX_PRICE_COUNT = 100000;

const MIN_PRICE_COUNT = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
  hotel: 3000
};

const formSlider = document.querySelector('.ad-form__slider');
const inputPrice = document.querySelector('.ad-form #price');
const selectType = document.querySelector('.ad-form #type');

let valueCount = MIN_PRICE_COUNT[selectType.value];

const createSlider = () => {
  noUiSlider.create(formSlider, {
    range: {
      min: valueCount,
      max: MAX_PRICE_COUNT,
    },
    start: valueCount,
    step: 1,
    connect: 'lower',
  });

  formSlider.noUiSlider.on('update', (values, handle) => {
    inputPrice.value = Math.trunc(values[handle]);
  });
};

const updateSlider = (number) => {
  formSlider.noUiSlider.updateOptions({
    range: {
      min: number,
      max: MAX_PRICE_COUNT
    },
    start: number,
    step: 1,
    connect: 'lower'
  });

  formSlider.noUiSlider.on('update', () => {
    inputPrice.value = Math.trunc(formSlider.noUiSlider.get());
  });
};

const updateSliderOptions = () => {
  selectType.addEventListener('change', onSelectTypeChange);
  inputPrice.addEventListener('change', onInputPriceChange);
};

function onInputPriceChange() {
  formSlider.noUiSlider.set([inputPrice.value, null]);
}

function onSelectTypeChange() {
  valueCount = MIN_PRICE_COUNT[selectType.value];
  updateSlider(valueCount);
}

const resetSlider = () => {
  updateSlider(MIN_PRICE_COUNT[selectType.value]);
};

export { createSlider, updateSliderOptions, resetSlider };
