import { disablesElement } from '../util/util.js';

const formForSend = document.querySelector('.ad-form');
const formForSendFieldset = document.querySelectorAll('.ad-form fieldset');
const filerForm = document.querySelector('.map__filters');
const filerFormFieldset = document.querySelector('.map__filters fieldset');
const filerFormSelect = document.querySelectorAll('.map__filters select');

const inactivatesForm = (form, formElement) => {
  form.classList.add('ad-form--disabled');
  formElement.forEach((element) => disablesElement(element, true));
};

const activatesForm = (form, formElement) => {
  form.classList.remove('ad-form--disabled');
  formElement.forEach((element) => disablesElement(element, false));
};

const inactivatesFilterForm = () => {
  inactivatesForm(filerForm, filerFormSelect);
  disablesElement(filerFormFieldset, true);
};

const inactivatesUploadForm = () => inactivatesForm(formForSend, formForSendFieldset);

const activatesFilterForm = () => {
  activatesForm(filerForm, filerFormSelect);
  disablesElement(filerFormFieldset, false);
};

const activatesUploadForm = () => activatesForm(formForSend, formForSendFieldset);

export { inactivatesFilterForm, inactivatesUploadForm, activatesFilterForm, activatesUploadForm };
