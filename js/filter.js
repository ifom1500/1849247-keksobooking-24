const ADVERTS_COUNT = 10;
const ANY_VALUE = 'any';

const PriceRanges = {
  LOW: [0, 10000],
  MIDDLE: [10000, 50000],
  HIGH: [50000, Infinity],
};

const mapFilters = document.querySelector('.map__filters');
const typeSelect = mapFilters.querySelector('#housing-type');
const priceSelect = mapFilters.querySelector('#housing-price');
const roomsSelect = mapFilters.querySelector('#housing-rooms');
const guestsSelect = mapFilters.querySelector('#housing-guests');
const featuresFieldset = mapFilters.querySelector('#housing-features');

const isAnyValue = (selectedType) => selectedType.value === ANY_VALUE;

const isTypeSuitable = (advert) =>
  isAnyValue(typeSelect) || advert.offer.type === typeSelect.value;

const isRoomsSuitable = (advert) =>
  isAnyValue(roomsSelect) || advert.offer.rooms === parseInt(roomsSelect.value, 10);

const isGuestsSuitable = (advert) =>
  isAnyValue(guestsSelect) || advert.offer.guests === parseInt(guestsSelect.value, 10);

const isPriceSuitable = (advert) => {
  const priceValue = PriceRanges[priceSelect.value.toUpperCase()];

  return isAnyValue(priceSelect) || (advert.offer.price >= priceValue[0] && advert.offer.price < priceValue[1]);
};

const wifiFeature = featuresFieldset.querySelector('#filter-wifi');
const dishwasherFeature = featuresFieldset.querySelector('#filter-dishwasher');
const parkingFeature = featuresFieldset.querySelector('#filter-parking');
const washerFeature = featuresFieldset.querySelector('#filter-washer');
const elevatorFeature = featuresFieldset.querySelector('#filter-elevator');
const conditionerFeature = featuresFieldset.querySelector('#filter-conditioner');

const isFeatureSuitable = (advert, featureName) => {
  if (featureName.checked) {
    return advert.offer.features && advert.offer.features.includes(featureName.value);
  }
  return true;
};

const isWifiSuitable = (advert) => isFeatureSuitable(advert, wifiFeature);
const isDishwasherSuitable = (advert) => isFeatureSuitable(advert, dishwasherFeature);
const isParkingSuitable = (advert) => isFeatureSuitable(advert, parkingFeature);
const isWasherSuitable = (advert) => isFeatureSuitable(advert, washerFeature);
const isElevatorSuitable = (advert) => isFeatureSuitable(advert, elevatorFeature);
const isConditionerSuitable = (advert) => isFeatureSuitable(advert, conditionerFeature);


const filters = [
  isTypeSuitable,
  isPriceSuitable,
  isRoomsSuitable,
  isGuestsSuitable,
  isWifiSuitable,
  isDishwasherSuitable,
  isParkingSuitable,
  isWasherSuitable,
  isElevatorSuitable,
  isConditionerSuitable,
];

const isAdvertSuitable = (advert) => filters.every((filter) => filter(advert));

const filterOffers = (offers) => {
  let newOffers = [];

  for (let i = 0; i < offers.length; i++) {
    if (isAdvertSuitable(offers[i])) {
      newOffers = [...newOffers, offers[i]];

      if (newOffers.length > ADVERTS_COUNT - 1) {
        return newOffers;
      }
    }
  }

  return newOffers;
};

const setMapFiltersChange = (cb) => {
  mapFilters.addEventListener('change', cb);
};

const resetMapFilter = () => {
  mapFilters.reset();
};

export {filterOffers, setMapFiltersChange, resetMapFilter};
