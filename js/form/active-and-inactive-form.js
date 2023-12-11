const form = document.querySelector('.ad-form');
const formFieldset = document.querySelectorAll('.ad-form fieldset');
const mapForm = document.querySelector('.map__filters');
const mapFormFieldset = document.querySelector('.map__filters fieldset');
const mapFormSelect = document.querySelectorAll('.map__filters select');

const createDisabledElement = (element, isDisabled) => {
  element.disabled = isDisabled;
};

const createInactiveForm = () => {
  form.classList.add('ad-form--disabled');
  mapForm.classList.add('ad-form--disabled');
  formFieldset.forEach((element) => createDisabledElement(element,true));
  mapFormSelect.forEach((element) => createDisabledElement(element,true));
  mapFormFieldset.disabled = true;
};

const createActiveForm = () => {
  form.classList.remove('ad-form--disabled');
  mapForm.classList.remove('ad-form--disabled');
  formFieldset.forEach((element) => createDisabledElement(element,false));
  mapFormSelect.forEach((element) => createDisabledElement(element,false));
  mapFormFieldset.disabled = false;
};

export { createInactiveForm, createActiveForm };
