import { renderErrorMessages, createValidChangeSelects, resetValidationForRequiredInput, validatePristine, resetPristine } from './validate-form.js';
import { renderLatLngMarker, resetMap } from '../map/map.js';
import { createSlider, updateSliderOptions, resetSlider } from './form-slider.js';

const form = document.querySelector('.ad-form');
const inputAddress = document.querySelector('.ad-form #address');
const resetButton = document.querySelector('.ad-form__reset');

const resetForm = () => {
  form.reset();
  resetPristine();
  resetMap(inputAddress);
  resetSlider();
};

function onFormSubmit(evt) {
  evt.preventDefault();
  if(validatePristine()) {
    resetForm();
  }
}

function onFormReset(evt) {
  evt.preventDefault();
  resetForm();
}

const sendForm = () => {
  renderErrorMessages();
  resetValidationForRequiredInput();
  createValidChangeSelects();
  renderLatLngMarker(inputAddress);
  createSlider();
  updateSliderOptions();
  resetButton.addEventListener(('click'), onFormReset);
  form.addEventListener(('submit'), onFormSubmit);
};

export { sendForm };
