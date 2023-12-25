import { isEscapeKey } from '../util/util.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const createFormMessage = (message) => {
  document.body.append(message);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentAndButtonClick);
};

const createFormSuccessMessage = () => {
  const newSuccessMessage = successMessageTemplate.cloneNode(true);
  createFormMessage(newSuccessMessage);
};

const createFormErrorMessage = () => {
  const newErrorMessage = errorMessageTemplate.cloneNode(true);
  const errorButton = newErrorMessage.querySelector('.error__button');
  createFormMessage(newErrorMessage);
  errorButton.addEventListener('click', onDocumentAndButtonClick);
};

const closeMessage = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  message.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentAndButtonClick);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

function onDocumentAndButtonClick() {
  closeMessage();
}

export { createFormSuccessMessage, createFormErrorMessage };
