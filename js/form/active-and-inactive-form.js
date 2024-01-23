import { disableElement } from '../util/util.js';

const formForSend = document.querySelector('.ad-form');
const formForSendFieldset = formForSend.querySelectorAll('fieldset');
const filerForm = document.querySelector('.map__filters');
const filerFormFieldset = filerForm.querySelector('fieldset');
const filerFormSelect = filerForm.querySelectorAll('select');

const inactivateForm = (form, formElement) => {
  form.classList.add('ad-form--disabled');
  formElement.forEach((element) => disableElement(element, true));
};

const activateForm = (form, formElement) => {
  form.classList.remove('ad-form--disabled');
  formElement.forEach((element) => disableElement(element, false));
};

const inactivateFilterForm = () => {
  inactivateForm(filerForm, filerFormSelect);
  disableElement(filerFormFieldset, true);
};

const inactivateUploadForm = () => inactivateForm(formForSend, formForSendFieldset);

const activateFilterForm = () => {
  activateForm(filerForm, filerFormSelect);
  disableElement(filerFormFieldset, false);
};

const activateUploadForm = () => activateForm(formForSend, formForSendFieldset);

export { inactivateFilterForm, inactivateUploadForm, activateFilterForm, activateUploadForm };
