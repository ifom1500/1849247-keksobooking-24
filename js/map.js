import {setFormEnabled} from './utils.js';
import {setAddressInputValue} from './form.js';

const AD_FORM_DISABLED = 'map__filters--disabled';
const TOKYO_COORDINATES = {lat: 35.67500, lng: 139.75000};
const ZOOM = 14;

const mapFilterForm = document.querySelector('.map__filters');
const mapCanvas = document.querySelector('#map-canvas');

const setMapFormEnabled = (enabled) => setFormEnabled(mapFilterForm, enabled, AD_FORM_DISABLED);

// Отобразить карту
const map = L.map(mapCanvas);

const initMap = (cb) => {
  map.setView(TOKYO_COORDINATES, ZOOM)
    .on('load', cb);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

// Добавить главный маркер
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [60, 60],
  iconAnchor: [30, 60],
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
).addTo(map);

mainPin.on('moveend', (evt) => {
  setAddressInputValue(`${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`);
});

// Добавить маркеры офферов
const layerGroup = L.layerGroup().addTo(map);

const renderOffers = (offers, cb) => {
  const pinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [50, 50],
    iconAnchor: [25, 50],
  });

  offers.forEach((offer) => {
    const simpleMarker = L.marker({
      lat: offer.location.lat,
      lng: offer.location.lng,
    },
    {
      icon: pinIcon,
    });

    simpleMarker
      .addTo(layerGroup)
      .bindPopup(cb(offer));
  });
};

// const removeMapPin = () => {
//   layerGroup.clearLayers();
// };

export {initMap, setMapFormEnabled, renderOffers};
