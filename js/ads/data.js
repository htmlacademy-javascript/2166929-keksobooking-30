import { getRandomFloat, getRandomArrayElement, getRandomArrayIndex, createNoRepeatingArray } from '../util/util.js';

const ADS_COUNT = 10;

const TITLES = [
  'Интересное предложение',
  'Очень интересное предложение',
  'Выгодное предложение',
  'Очень выгодное предложение',
  'Нужное предложение',
  'Очень нужное предложение'
];

const DESCRIPTIONS = [
  'Интересное описание',
  'Очень интересное описание',
  'Красивое описание',
  'Очень красивое описание'
];

const TYPES_ROOM = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const PERIODS_OF_CHECK_IN = [
  '12:00',
  '13:00',
  '14:00'
];

const PERIODS_OF_CHECK_OUT = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const PRICES = {
  min: 0,
  max: 100000
};

const ROOMS = {
  min: 0,
  max: 100
};

const GUESTS = {
  min: 0,
  max: 3
};

const LOCATION_LAT = {
  min: 35.65000,
  max: 35.70000
};

const LOCATION_LNG = {
  min: 139.70000,
  max: 139.80000
};

let avatarId = 1;
let latCount = 0;
let lngCount = 0;

const createAvatar = () => {
  const countLength = 2;
  const avatarSrc = `img/avatars/user${ `${ avatarId++ }`.padStart(countLength, '0') }.png`;
  return avatarSrc;
};

const createAd = (latLocation, lngLocation) => ({
  title: getRandomArrayElement(TITLES),
  address: `${ latLocation }, ${ lngLocation }`,
  price: getRandomArrayIndex(PRICES),
  type: getRandomArrayElement(TYPES_ROOM),
  rooms: getRandomArrayIndex(ROOMS),
  guests: getRandomArrayIndex(GUESTS),
  checkin: getRandomArrayElement(PERIODS_OF_CHECK_IN),
  checkout: getRandomArrayElement(PERIODS_OF_CHECK_OUT),
  features: createNoRepeatingArray(FEATURES),
  description: getRandomArrayElement(DESCRIPTIONS),
  photos: createNoRepeatingArray(PHOTOS),
  location: { lat: latLocation, lng: lngLocation },
});

const createAdAndLocation = () => {
  latCount = getRandomFloat(LOCATION_LAT);
  lngCount = getRandomFloat(LOCATION_LNG);
  return createAd(latCount, lngCount);
};

const createAdItem = () => ({
  author: { avatar: createAvatar() },
  offer: createAdAndLocation(),
});

const createArrayOfAdItems = () => Array.from({ length: ADS_COUNT }, createAdItem);

export { createArrayOfAdItems };
