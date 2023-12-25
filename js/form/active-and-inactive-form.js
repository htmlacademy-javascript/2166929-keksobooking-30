const formForSend = document.querySelector('.ad-form');
const formForSendFieldset = document.querySelectorAll('.ad-form fieldset');
const sortForm = document.querySelector('.map__filters');
const sortFormFieldset = document.querySelector('.map__filters fieldset');
const sortFormSelect = document.querySelectorAll('.map__filters select');

const createDisabledElement = (element, isDisabled) => {
  element.disabled = isDisabled;
};

const createInactiveState = (form, FormElement) => {
  form.classList.add('ad-form--disabled');
  FormElement.forEach((element) => createDisabledElement(element, true));
};

const createActiveState = (form, FormElement) => {
  form.classList.remove('ad-form--disabled');
  FormElement.forEach((element) => createDisabledElement(element, false));
};

const createInactiveSortState = () => {
  createInactiveState(sortForm, sortFormSelect);
  sortFormFieldset.disabled = true;
};

const createInactiveFormState = () => {
  createInactiveState(formForSend, formForSendFieldset);
};

const createActiveSortState = () => {
  createActiveState(sortForm, sortFormSelect);
  sortFormFieldset.disabled = false;
};

const createActiveFormState = () => {
  createActiveState(formForSend, formForSendFieldset);
};

export { createInactiveSortState, createInactiveFormState, createActiveSortState, createActiveFormState };
