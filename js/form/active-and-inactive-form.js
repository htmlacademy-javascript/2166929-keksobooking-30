const form = document.querySelector('.ad-form');
const formFieldset = document.querySelectorAll('.ad-form fieldset');
const mapForm = document.querySelector('.map__filters');
const mapFormFieldset = document.querySelector('.map__filters fieldset');
const mapFormSelect = document.querySelectorAll('.map__filters select');

const createDisabledElement = (element, isDisabled) => {
  element.disabled = isDisabled;
};

const createInactiveSortState = () => {
  mapForm.classList.add('ad-form--disabled');
  mapFormSelect.forEach((element) => createDisabledElement(element,true));
  mapFormFieldset.disabled = true;
};

const createInactiveFormState = () => {
  form.classList.add('ad-form--disabled');
  formFieldset.forEach((element) => createDisabledElement(element,true));
};

const createActiveSortState = () => {
  mapForm.classList.remove('ad-form--disabled');
  mapFormSelect.forEach((element) => createDisabledElement(element,false));
  mapFormFieldset.disabled = false;
};

const createActiveFormState = () => {
  form.classList.remove('ad-form--disabled');
  formFieldset.forEach((element) => createDisabledElement(element,false));
};

export { createInactiveSortState, createInactiveFormState, createActiveSortState, createActiveFormState };
