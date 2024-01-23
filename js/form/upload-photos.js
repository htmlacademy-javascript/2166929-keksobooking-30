import { isValidType, createErrorMessageForImage, removeErrorMessageForImage } from './form-validate.js';

const DEFAULT_IMAGE_SRC = 'img/muffin-grey.svg';

const DEFAULT_IMAGE_OPTIONS = {
  width: '40',
  height: '44',
};

const NEW_IMAGE_OPTIONS = {
  width: '70',
  height: '70',
};

const IMAGE_ALT = {
  avatar: 'Аватар пользователя',
  roomPhoto: 'Фотография жилья',
};

const form = document.querySelector('.ad-form');
const avatarContainer = form.querySelector('.ad-form-header__preview');
const roomPhotoContainer = form.querySelector('.ad-form__photo');

const updatePreviewOptions = (container, file, alt) => {
  container.innerHTML = '';
  const image = document.createElement('img');
  image.src = URL.createObjectURL(file);
  image.alt = alt;
  image.width = NEW_IMAGE_OPTIONS.width;
  image.height = NEW_IMAGE_OPTIONS.height;
  container.appendChild(image);
};

const uploadImage = (evt, selector, container, alt) => {
  const file = evt.target.files[0];

  if (file && isValidType(file)) {
    updatePreviewOptions(container, file, alt);
    removeErrorMessageForImage(selector);
    container.classList.remove('error-message-container');
    return;
  }

  if (file && !isValidType(file) && !document.querySelector(`.${ selector } .error-message`)) {
    createErrorMessageForImage(selector);
    container.innerHTML = '';
    container.classList.add('error-message-container');
  }
};

const onFormChange = (evt) => {
  if (evt.target.matches('#avatar')) {
    uploadImage(evt, 'ad-form-header', avatarContainer, IMAGE_ALT.avatar);
  }

  if (evt.target.matches('#images')) {
    uploadImage(evt, 'ad-form__photo-container', roomPhotoContainer, IMAGE_ALT.roomPhoto);
  }
};

const createPreviewImage = () => form.addEventListener('change', onFormChange);

const cleanPreviewImage = (container, selector, error) => {
  removeErrorMessageForImage(selector);
  container.classList.remove(error);
  container.innerHTML = '';
};

const resetPreviewImage = () => {
  cleanPreviewImage(roomPhotoContainer, 'ad-form-header', 'error-message-container');
  cleanPreviewImage(avatarContainer, 'ad-form__photo-container', 'error-message-container');
  const image = document.createElement('img');
  image.src = DEFAULT_IMAGE_SRC;
  image.alt = IMAGE_ALT.avatar;
  image.width = DEFAULT_IMAGE_OPTIONS.width;
  image.height = DEFAULT_IMAGE_OPTIONS.height;
  avatarContainer.appendChild(image);
};

export { createPreviewImage, resetPreviewImage };
