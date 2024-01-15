const TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const adTemplate = document.querySelector('#card').content.querySelector('.popup');

const checkElement = (selector, data, container) => {
  const element = container.querySelector(`.popup__${ selector }`);
  if (!data) {
    element.remove();
  }
  return element;
};

const checkElements = (selector, firstData, secondData, container) => {
  const element = container.querySelector(`.popup__${ selector }`);

  if (!firstData || !secondData) {
    element.remove();
  }

  return element;
};

const createAvatar = (selector, data, container) => {
  const element = checkElement(selector, data, container);
  element.src = data;
};

const createStringGeneral = (selector, data, container) => {
  const element = checkElement(selector, data, container);
  element.textContent = data;
};

const createStringType = (selector, data, container) => {
  const element = checkElement(selector, data, container);
  element.textContent = TYPES[data];
};

const createStringRooms = (selector, firstData, secondData, container) => {
  const element = checkElements(selector, firstData, secondData, container);
  element.textContent = `${ firstData } комнаты для ${ secondData } гостей`;
};

const createStringTime = (selector, firstData, secondData, container) => {
  const element = checkElements(selector, firstData, secondData, container);
  element.textContent = `Заезд после ${ firstData }, выезд до ${ secondData }`;
};

const createPhoto = (data, container, item) => {
  const newImage = item.cloneNode(true);
  newImage.src = data;
  container.append(newImage);
};

const createFeature = (data, container, item) => {
  const newFeature = item.cloneNode(true);
  newFeature.classList.replace('popup__feature--wifi', `popup__feature--${ data }`);
  container.append(newFeature);
};

const createItemsList = (selector, data, array, newAd) => {
  const container = newAd.querySelector(`.popup__${ selector }s`);
  if (!array) {
    container.remove();
    return;
  }

  const item = container.querySelector(`.popup__${ selector }`);
  container.innerHTML = '';

  if (array === data.photos) {
    array.forEach((element) => createPhoto(element, container, item));
  }

  if (array === data.features) {
    array.forEach((element) => createFeature(element, container, item));
  }
};

const createAd = (data) => {
  const newAd = adTemplate.cloneNode(true);
  const adElement = data.offer;

  createAvatar('avatar', data.author.avatar, newAd);
  newAd.querySelector('.popup__title').textContent = adElement.title;
  newAd.querySelector('.popup__text--address').textContent = adElement.address;
  newAd.querySelector('.popup__text--price').textContent = `${ adElement.price } ₽/ночь`;
  createStringType('type', adElement.type, newAd);
  createStringRooms('text--capacity', adElement.rooms, adElement.guests, newAd);
  createStringTime('text--time', adElement.checkin, adElement.checkout, newAd);
  createStringGeneral('description', adElement.description, newAd);
  createItemsList('photo', adElement, adElement.photos, newAd);
  createItemsList('feature', adElement, adElement.features, newAd);

  return newAd;
};

export { createAd };
