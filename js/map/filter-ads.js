const PRICE_COUNT = {
  min: 10000,
  max: 50000
};

const filters = document.querySelector('.map__filters');
const filterType = filters.querySelector('#housing-type');
const filterRooms = filters.querySelector('#housing-rooms');
const filterGuests = filters.querySelector('#housing-guests');
const filterPrice = filters.querySelector('#housing-price');

const filterAds = (element, select) => select.value === 'any' || String(element) === select.value;

const filterByPrice = (element, select) => {
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

const filterByFeatures = (array) => {
  const inputFeatureChecked = document.querySelectorAll('.map__checkbox:checked');
  if (inputFeatureChecked.length === 0) {
    return true;
  }

  if (!array) {
    return false;
  }

  return Array.from(inputFeatureChecked).every((object) => array.includes(object.value));
};

const createFilteredAds = (ads) => ads.filter((ad) =>
  filterAds(ad.offer.type, filterType)
  && filterAds(ad.offer.rooms, filterRooms)
  && filterAds(ad.offer.guests, filterGuests)
  && filterByPrice(ad.offer.price, filterPrice)
  && filterByFeatures(ad.offer.features)
);

const resetFilters = () => filters.reset();

export { createFilteredAds, resetFilters };
