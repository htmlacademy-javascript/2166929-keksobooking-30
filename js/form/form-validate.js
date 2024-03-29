const FILE_TYPES = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];

const TITLE_LENGTH = {
  min: 30,
  max: 100
};

const MAX_PRICE_COUNT = 100000;

const MIN_PRICE_COUNT = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  hotel: 3000,
  palace: 10000
};

const ROOMS_OPTIONS = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const ERROR_IMAGE_MESSAGE_SELECT = 'error-message';

const ERROR_LENGTH_TITLE_MESSAGE = `Cтрока должна содержать от ${ TITLE_LENGTH.min } до ${ TITLE_LENGTH.max } символов`;
const ERROR_PRICE_MESSAGE = 'Некорректная цена';
const ERROR_GUESTS_MESSAGE = 'Некорректное количество мест';
const ERROR_IMAGE_MESSAGE = 'Некорректный формат изображения';

const form = document.querySelector('.ad-form');
const inputTitle = form.querySelector('#title');
const inputPrice = form.querySelector('#price');
const selectType = form.querySelector('#type');
const selectRooms = form.querySelector('#room_number');
const selectGuests = form.querySelector('#capacity');
const selectTimeIn = form.querySelector('#timein');
const selectTimeOut = form.querySelector('#timeout');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
});

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((type) => fileName.endsWith(type));
};

const isValidLengthTitle = (value) => value.length >= TITLE_LENGTH.min && value.length <= TITLE_LENGTH.max;

const isValidPriceCount = (value) => Number(value) >= MIN_PRICE_COUNT[selectType.value] && Number(value) <= MAX_PRICE_COUNT;

const isValidRoomsAndGuestsCount = (value) => ROOMS_OPTIONS[selectRooms.value].includes(value);

const renderErrorMessages = () => {
  pristine.addValidator(inputTitle, isValidLengthTitle, ERROR_LENGTH_TITLE_MESSAGE, 1, true);
  pristine.addValidator(inputPrice, isValidPriceCount, ERROR_PRICE_MESSAGE, 1, true);
  pristine.addValidator(selectGuests, isValidRoomsAndGuestsCount, ERROR_GUESTS_MESSAGE, 1, true);
};

const createErrorMessageForImage = (selector) => {
  const container = document.createElement('div');
  container.classList.add(`${ ERROR_IMAGE_MESSAGE_SELECT }`);
  container.textContent = ERROR_IMAGE_MESSAGE;
  document.querySelector(`.${ selector }`).appendChild(container);
};

const removeErrorMessageForImage = (selector) => {
  const errorMessage = document.querySelector(`.${ selector } .${ ERROR_IMAGE_MESSAGE_SELECT }`);

  if(errorMessage) {
    errorMessage.remove();
  }
};

const validatePristine = (input) => pristine.validate(input);
const validateImage = () => !document.querySelector(`.${ ERROR_IMAGE_MESSAGE_SELECT }`);
const resetPristine = () => pristine.reset();

const checkRoomsAndGuestsOptions = () => {
  validatePristine(selectRooms);
  validatePristine(selectGuests);
};

const updateTimeOptions = (firstTimeIndicator, secondTimeIndicator) => {
  firstTimeIndicator.value = secondTimeIndicator.value;
};

const onFormChange = (evt) => {
  if (evt.target === selectRooms || evt.target === selectGuests) {
    checkRoomsAndGuestsOptions();
  }

  if (evt.target === selectTimeIn) {
    updateTimeOptions(selectTimeOut, selectTimeIn);
  }

  if (evt.target === selectTimeOut) {
    updateTimeOptions(selectTimeIn, selectTimeOut);
  }
};

const createValidChangeSelects = () => form.addEventListener('change', onFormChange);

export { renderErrorMessages, createErrorMessageForImage, createValidChangeSelects, isValidType, validatePristine, validateImage, resetPristine, removeErrorMessageForImage };
