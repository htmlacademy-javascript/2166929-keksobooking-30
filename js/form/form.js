import { renderErrorMessages, createValidChangeSelects, validatePristine, validateImage, resetPristine } from './form-validate.js';
import { renderLatLngMarker, resetMap } from '../map/map.js';
import { createSlider, updateSliderOptions, resetSlider } from './form-slider.js';
import { sendForm } from '../api/get-and-send-data.js';
import { createPreviewImage, resetPreviewImage } from './upload-photos.js';

const MIN_PRICE_COUNT = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  hotel: 3000,
  palace: 10000
};

const form = document.querySelector('.ad-form');
const inputAddress = form.querySelector('#address');
const resetButton = form.querySelector('.ad-form__reset');
const selectType = form.querySelector('#type');
const inputPrice = form.querySelector('#price');

const onSelectTypeChange = () => {
  inputPrice.placeholder = MIN_PRICE_COUNT[selectType.value];
};

const createPriceOptions = () => {
  inputPrice.placeholder = MIN_PRICE_COUNT[selectType.value];
  selectType.addEventListener('change', onSelectTypeChange);
};

const resetForm = () => {
  resetPristine();
  resetSlider();
  form.reset();
  resetMap(inputAddress);
  resetPreviewImage();
  createPriceOptions();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (validatePristine() && validateImage()) {
    sendForm(evt.target);
  }
};

const onResetButtonClick = (evt) => {
  evt.preventDefault();
  resetForm();
};

const loadingForm = () => {
  createPreviewImage();
  createPriceOptions();
  renderErrorMessages();
  createValidChangeSelects();
  renderLatLngMarker(inputAddress);
  createSlider();
  updateSliderOptions();
  resetButton.addEventListener('click', onResetButtonClick);
  form.addEventListener('submit', onFormSubmit);
};

export { loadingForm, resetForm };
