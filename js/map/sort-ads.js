const PRICE_COUNT = {
  min: 10000,
  max: 50000
};

const filters = document.querySelector('.map__filters');
const filterType = document.querySelector('#housing-type');
const filterRooms = document.querySelector('#housing-rooms');
const filterGuests = document.querySelector('#housing-guests');
const filterPrice = document.querySelector('#housing-price');

const createSort = (element, select) => select.value === 'any' || String(element) === select.value;

const createSortPrice = (element, select) => {
  if (select.value === 'middle') {
    return element >= PRICE_COUNT.min && element <= PRICE_COUNT.max;
  }

  if (select.value === 'low') {
    return element < PRICE_COUNT.min;
  }

  if (select.value === 'high') {
    return element > PRICE_COUNT.max;
  }

  return true;
};

const createSortFeatures = (array) => {
  const inputFeatureChecked = document.querySelectorAll('.map__checkbox:checked');
  if (inputFeatureChecked.length === 0) {
    return true;
  }

  if (!array) {
    return false;
  }

  return Array.from(inputFeatureChecked).every((object) => array.includes(object.value));
};

const createSortAds = (ads) => ads.filter((ad) =>
  createSort(ad.offer.type, filterType)
  && createSort(ad.offer.rooms, filterRooms)
  && createSort(ad.offer.guests, filterGuests)
  && createSortPrice(ad.offer.price, filterPrice)
  && createSortFeatures(ad.offer.features)
);

const resetFilters = () => filters.reset();

export { createSortAds, resetFilters };
