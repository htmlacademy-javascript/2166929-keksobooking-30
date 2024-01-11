import { isEscapeKey } from '../util/util.js';

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

const createServerErrorMessage = () => {
  const newErrorMessage = errorMessageTemplate.cloneNode(true);
  newErrorMessage.querySelector('.error__message').textContent = 'Ошибка отображения объявлений';
  newErrorMessage.querySelector('.error__button').remove();
  document.body.append(newErrorMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentAndButtonClick);
};

const closeMessage = () => {
  document.querySelector('.error').remove();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentAndButtonClick);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

function onDocumentAndButtonClick () {
  closeMessage();
}

export { createServerErrorMessage };
