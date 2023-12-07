const NUMBERS_AFTER_COMMA_COUNT = 5;

const getRandomInteger = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min));

const getRandomFloat = (elements) => (Math.random() * (elements.max - elements.min) + elements.min).toFixed(NUMBERS_AFTER_COMMA_COUNT);

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomArrayIndex = (elements) => getRandomInteger(elements.min, elements.max);

const createNoRepeatingArray = (elements) => {
  const objects = new Set(Array.from({ length: getRandomInteger(0, elements.length) }, () => getRandomArrayElement(elements)));
  return Array.from(objects);
};

export { getRandomFloat, getRandomArrayElement, getRandomArrayIndex, createNoRepeatingArray };
