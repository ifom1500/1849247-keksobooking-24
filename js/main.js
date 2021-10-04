'use strict';

const APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const WORKING_HOURS = ['12:00', '13:00', '14:00'];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const SIMILAR_AD_COUNT = 10;

const getRandomFloat = (min, max, precision) => {
  if (min > max) {
    const swap = min;
    min = max;
    max = swap;
  }
  return +(Math.random() * (max - min) + min).toFixed(precision);
};

const getRandomInteger = (min, max) => getRandomFloat(min, max, 0);

const createCounter = () => {
  let counter = 0;
  return function() {
    counter = counter + 1;
    return counter;
  };
};

const counter = createCounter();

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomArrayWithoutRepeats = (array) => {
  const clone = array.slice();
  const newArray = [];
  newArray.length = getRandomInteger(0, array.length);

  for (let i = 0; i < newArray.length; i++) {
    const index = getRandomInteger(0, clone.length - 1);
    const item = clone.splice(index, 1).join();
    newArray[i] = item;
  }
  return newArray;
};

const getRandomArrayWithRepeats = (array, maxQuantity) => {
  const newArray = [];
  newArray.length = getRandomInteger(0, maxQuantity);

  for (let i = 0; i < newArray.length; i++) {
    const item = array[getRandomInteger(0, array.length - 1)];
    newArray[i] = item;
  }
  return newArray;
};

const createApartmentAd = () => {
  const lat = getRandomFloat(35.65, 35.7, 5);
  const lng = getRandomFloat(139.7, 139.8, 5);

  return {
    author: {
      avatar: `img/avatars/user${String(counter()).padStart(2, '0')}.png`,
    },
    offer: {
      title: 'There’s no place like home',
      address: `${lat}, ${lng}`,
      price: getRandomInteger(4000, 10000),
      type: getRandomArrayElement(APARTMENT_TYPES),
      rooms: getRandomInteger(1, 9),
      guests: getRandomInteger(1, 9),
      checkin: getRandomArrayElement(WORKING_HOURS),
      checkout: getRandomArrayElement(WORKING_HOURS),
      features: getRandomArrayWithoutRepeats(FEATURES),
      description: 'Hidden away on the fringe of the city is this charming three bedroom apartment',
      photos: getRandomArrayWithRepeats(PHOTOS, 5),
    },
    location: {
      lat,
      lng,
    },
  };
};

const similarAds = Array.from({ length: SIMILAR_AD_COUNT }, createApartmentAd);
