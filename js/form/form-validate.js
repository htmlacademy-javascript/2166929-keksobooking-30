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

const ERROR_LENGTH_TITLE_MESSAGE = `Cтрока должна содержать от ${ TITLE_LENGTH.min } до ${ TITLE_LENGTH.max } символов`;
const ERROR_PRICE_MESSAGE = 'Некорректная цена';
const ERROR_GUESTS_MESSAGE = 'Некорректное количество мест';

const form = document.querySelector('.ad-form');
const inputTitle = document.querySelector('#title');
const inputPrice = document.querySelector('#price');
const selectType = document.querySelector('#type');
const selectRooms = document.querySelector('#room_number');
const selectGuests = document.querySelector('#capacity');
const selectTimeIn = document.querySelector('#timein');
const selectTimeOut = document.querySelector('#timeout');

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
  selectRooms.addEventListener('change', onSelectsRoomsAndGuestsChange);
  selectGuests.addEventListener('change', onSelectsRoomsAndGuestsChange);
  selectTimeIn.addEventListener('change', () => onSelectsTimeChange(selectTimeOut, selectTimeIn));
  selectTimeOut.addEventListener('change', () => onSelectsTimeChange(selectTimeIn, selectTimeOut));
};

const validatePristine = () => pristine.validate();
const resetPristine = () => pristine.reset();

const validateInputPrice = () => pristine.validate(inputPrice);
const resetValidateInputPrice = () => pristine.reset(inputPrice);

function onSelectsRoomsAndGuestsChange() {
  pristine.validate(selectRooms);
  pristine.validate(selectGuests);
}

function onSelectsTimeChange(firstTimeIndicator, secondTimeIndicator) {
  firstTimeIndicator.value = secondTimeIndicator.value;
}

export { renderErrorMessages, createValidChangeSelects, validateInputPrice, resetValidateInputPrice, validatePristine, resetPristine };
