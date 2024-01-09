import { isValidType, createErrorMassageForImage, removeErrorMassageForImage } from './form-validate.js';

const DEFAULT_IMAGE_SRC = 'img/muffin-grey.svg';

const IMAGE_ALT = {
  avatar: 'Аватар пользователя',
  roomPhoto: 'Фотография жилья',
};

const form = document.querySelector('.ad-form');
const avatarContainer = document.querySelector('.ad-form-header__preview');
const roomPhotoContainer = document.querySelector('.ad-form__photo');

const updatePreviewOptions = (container, file, alt) => {
  container.innerHTML = '';
  container.style.padding = '0';
  const image = document.createElement('img');
  image.src = URL.createObjectURL(file);
  image.alt = alt;
  image.width = '70';
  image.height = '70';
  container.appendChild(image);
};

const uploadImage = (evt, selector, container, alt) => {
  const file = evt.target.files[0];

  if (file && isValidType(file)) {
    updatePreviewOptions(container, file, alt);
    removeErrorMassageForImage(selector);
    return;
  }

  if (file && !isValidType(file) && !document.querySelector(`.${ selector } .error-massage`)) {
    createErrorMassageForImage(selector);
    container.innerHTML = '';
    container.style.padding = '0 15px';
    container.style.flexShrink = '0';
  }
};

const createPreviewImage = () => form.addEventListener('change', onFormChange);

function onFormChange (evt) {
  if (evt.target.matches('#avatar')) {
    uploadImage(evt, 'ad-form-header', avatarContainer, IMAGE_ALT.avatar);
  }

  if (evt.target.matches('#images')) {
    uploadImage(evt, 'ad-form__photo-container', roomPhotoContainer, IMAGE_ALT.roomPhoto);
  }
}

const resetPreviewImage = () => {
  removeErrorMassageForImage('ad-form-header');
  removeErrorMassageForImage('ad-form__photo-container');
  roomPhotoContainer.innerHTML = '';
  avatarContainer.innerHTML = '';
  avatarContainer.style.padding = '0 15px';
  const image = document.createElement('img');
  image.src = DEFAULT_IMAGE_SRC;
  image.alt = IMAGE_ALT.avatar;
  image.width = '40';
  image.height = '44';
  avatarContainer.appendChild(image);
};

export { createPreviewImage, resetPreviewImage };
