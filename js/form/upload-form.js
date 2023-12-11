import { renderErrorMassages, createValidChangeSelects, resetValidationForRequiredInput, validatePristine, resetPristine } from './validate-form';

const form = document.querySelector('.ad-form');

function onFormSubmit(evt) {
  evt.preventDefault();
  if(validatePristine()) {
    resetPristine();
    form.reset();
  }
}

const createSendForm = () => {
  renderErrorMassages();
  resetValidationForRequiredInput();
  createValidChangeSelects();
  form.addEventListener(('submit'), onFormSubmit);
};

export { createSendForm };
