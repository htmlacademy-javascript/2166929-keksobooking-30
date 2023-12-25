import { renderErrorMessages, createValidChangeSelects, validatePristine, resetPristine } from './form-validate.js';
import { renderLatLngMarker, resetMap } from '../map/map.js';
import { createSlider, updateSliderOptions, resetSlider } from './form-slider.js';
import { sendForm } from '../api/get-and-send-data.js';

const MIN_PRICE_COUNT = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  hotel: 3000,
  palace: 10000
};

const form = document.querySelector('.ad-form');
const inputAddress = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
const selectType = document.querySelector('#type');
const inputPrice = document.querySelector('#price');
const submitButton = document.querySelector('.ad-form__submit');

const createPriceOptions = () => {
  const defaultCount = MIN_PRICE_COUNT[selectType.value];
  inputPrice.placeholder = defaultCount;
  inputPrice.min = defaultCount;
  selectType.addEventListener('change', onSelectTypeChange);
};

const createDisabledStateButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
};

const resetForm = () => {
  resetPristine();
  resetSlider();
  form.reset();
  resetMap(inputAddress);
};

function onFormSubmit(evt) {
  evt.preventDefault();
  if(validatePristine()) {
    sendForm(evt.target);
  }
}

function onResetButtonClick(evt) {
  evt.preventDefault();
  resetForm();
}

function onSelectTypeChange() {
  const newPlaceholder = MIN_PRICE_COUNT[selectType.value];
  inputPrice.placeholder = newPlaceholder;
  inputPrice.min = newPlaceholder;
}

const initForm = () => {
  createPriceOptions();
  renderErrorMessages();
  createValidChangeSelects();
  renderLatLngMarker(inputAddress);
  createSlider();
  updateSliderOptions();
  resetButton.addEventListener(('click'), onResetButtonClick);
  form.addEventListener(('submit'), onFormSubmit);
};

export { initForm, createDisabledStateButton, resetForm };
