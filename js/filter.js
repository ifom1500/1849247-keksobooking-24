const ADVERTS_COUNT = 10;
const ANY_VALUE = 'any';

const PriceRanges = {
  middle: [10000, 50000],
  low: [0, 10000],
  high: [50000, Infinity],
};

const mapFilters = document.querySelector('.map__filters');
const typeSelect = mapFilters.querySelector('#housing-type');
const priceSelect = mapFilters.querySelector('#housing-price');
const roomsSelect = mapFilters.querySelector('#housing-rooms');
const guestsSelect = mapFilters.querySelector('#housing-guests');
const featuresFieldset = mapFilters.querySelector('#housing-features');
const features = featuresFieldset.querySelectorAll('input');

const getRank = (item) => {
  let rank = 0;

  for (let i = 0; i < features.length; i++) {
    if (features[i].checked) {
      if (item.offer.features && item.offer.features.includes(features[i].value)) {
        rank += 1;
      }
    }
  }

  return rank;
};

const compareByRank = (advertA, advertB) => getRank(advertB) - getRank(advertA);

const checkAdvert= (item) => {
  let isTypeExist = true;
  let isPriceExist = true;
  let isRoomsExist = true;
  let isGuestsExist = true;

  if (typeSelect.value !== ANY_VALUE) {
    isTypeExist = item.offer.type === typeSelect.value;
  }

  if (priceSelect.value !== ANY_VALUE) {
    isPriceExist = item.offer.price >= PriceRanges[priceSelect.value][0]
      && item.offer.price < PriceRanges[priceSelect.value][1];
  }

  if (roomsSelect.value !== ANY_VALUE) {
    isRoomsExist = item.offer.rooms.toString() === roomsSelect.value;
  }

  if (guestsSelect.value !== ANY_VALUE) {
    isGuestsExist = item.offer.guests.toString() === guestsSelect.value;
  }

  return isTypeExist && isPriceExist && isRoomsExist && isGuestsExist;
};

const filterOffers = (arr) => arr
  .slice()
  .filter((advert) => checkAdvert(advert))
  .sort(compareByRank)
  .slice(0, ADVERTS_COUNT);

const setMapFiltersChange = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb();
  });
};

const resetMapFilter = () => {
  typeSelect.value = ANY_VALUE;
  priceSelect.value = ANY_VALUE;
  roomsSelect.value = ANY_VALUE;
  guestsSelect.value = ANY_VALUE;

  for (let i = 0; i < features.length; i++) {
    features[i].checked = false;
  }
};

export {filterOffers, setMapFiltersChange, resetMapFilter};
