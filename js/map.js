import {setFormEnabled} from './utils.js';
import {setAddressInputValue} from './form.js';
import {filterOffers} from './filter.js';

const AD_FORM_DISABLED = 'map__filters--disabled';
const TOKYO_COORDINATES = {lat: 35.67500, lng: 139.75000};
const ZOOM = 13;

const mapFilterForm = document.querySelector('.map__filters');
const mapCanvas = document.querySelector('#map-canvas');

const map = L.map(mapCanvas);
const layerGroup = L.layerGroup();


const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPin = L.marker(
  {
    lat: TOKYO_COORDINATES.lat,
    lng: TOKYO_COORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const initMap = (onMapLoad) => {
  layerGroup.addTo(map);

  mainPin.addTo(map);

  mainPin.on('moveend', (evt) => {
    setAddressInputValue(`${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`);
  });

  map.setView(TOKYO_COORDINATES, ZOOM)
    .on('load', onMapLoad);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const setMapFormEnabled = (enabled) => setFormEnabled(mapFilterForm, enabled, AD_FORM_DISABLED);

const createOfferMarker = (offer) => L.marker({
  lat: offer.location.lat,
  lng: offer.location.lng,
},
{
  icon: pinIcon,
});

const renderOffers = (offers, createPopup) => {
  const newOffers = filterOffers(offers);

  layerGroup.clearLayers();

  newOffers.forEach((offer) => {
    createOfferMarker(offer)
      .addTo(layerGroup)
      .bindPopup(() => createPopup(offer));
  });
};

const resetAddressPin = () => {
  mainPin.setLatLng(TOKYO_COORDINATES);
  map.setView(TOKYO_COORDINATES, ZOOM);
};

const closeAddressPopup = () => {
  map.closePopup();
};

export {initMap, setMapFormEnabled, renderOffers, resetAddressPin, closeAddressPopup};
