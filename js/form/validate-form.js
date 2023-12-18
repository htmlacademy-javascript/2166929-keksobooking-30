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

const ERROR_LENGTH_TITLE_MESSAGE = 'Cтрока должна содержать от 30 до 100 символов';
const ERROR_PRICE_MESSAGE = 'Некорректная цена';
const ERROR_GUESTS_MESSAGE = 'Некорректное количество мест';

const form = document.querySelector('.ad-form');
const inputTitle = document.querySelector('.ad-form #title');
const inputPrice = document.querySelector('.ad-form #price');
const selectType = document.querySelector('.ad-form #type');
const selectRooms = document.querySelector('.ad-form #room_number');
const selectGuests = document.querySelector('.ad-form #capacity');
const selectTimeIn = document.querySelector('.ad-form #timein');
const selectTimeOut = document.querySelector('.ad-form #timeout');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
});

const isValidLengthTitle = (value) => value.length >= TITLE_LENGTH.min && value.length <= TITLE_LENGTH.max;

const isValidPriceCount = (value) => Number(value) >= MIN_PRICE_COUNT[selectType.value] && Number(value) <= MAX_PRICE_COUNT;

const isValidRoomsAndGuestsCount = (value) => ROOMS_OPTIONS[selectRooms.value].includes(value);

const renderErrorMessages = () => {
  pristine.addValidator(inputTitle, isValidLengthTitle, ERROR_LENGTH_TITLE_MESSAGE, 1, true);
  pristine.addValidator(inputPrice, isValidPriceCount, ERROR_PRICE_MESSAGE, 1, true);
  pristine.addValidator(selectGuests, isValidRoomsAndGuestsCount, ERROR_GUESTS_MESSAGE, 1, true);
};

const createValidChangeSelects = () => {
  selectType.addEventListener('change', onSelectTypeChange);
  selectRooms.addEventListener('change', onSelectsRoomsAndGuestsChange);
  selectGuests.addEventListener('change', onSelectsRoomsAndGuestsChange);
  selectTimeIn.addEventListener('change', () => onSelectsTimeChange(selectTimeOut, selectTimeIn));
  selectTimeOut.addEventListener('change', () => onSelectsTimeChange(selectTimeIn, selectTimeOut));
};

const resetValidationForRequiredInput = () => {
  inputTitle.addEventListener(('blur'), () => onRequiredInputBlur(inputTitle));
  inputPrice.addEventListener(('blur'), () => onRequiredInputBlur(inputPrice));
};

const validatePristine = () => pristine.validate();
const resetPristine = () => pristine.reset();

function onSelectTypeChange() {
  inputPrice.placeholder = MIN_PRICE_COUNT[selectType.value];
  inputPrice.min = MIN_PRICE_COUNT[selectType.value];
}

function onSelectsRoomsAndGuestsChange() {
  pristine.validate(selectRooms);
  pristine.validate(selectGuests);
}

function onSelectsTimeChange(firstTimeIndicator, secondTimeIndicator) {
  firstTimeIndicator.value = secondTimeIndicator.value;
}

function onRequiredInputBlur(input) {
  if(input.value.length === 0) {
    resetPristine();
  }
  renderErrorMessages();
}

export { renderErrorMessages, createValidChangeSelects, resetValidationForRequiredInput, validatePristine, resetPristine };
