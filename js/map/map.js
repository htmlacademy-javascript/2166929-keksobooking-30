import { createArrayOfAdItems } from './data.js';
import { createAd } from './ad.js';
import { createActiveFormState, createActiveSortState } from '../form/active-and-inactive-form.js';
import { sendForm } from '../form/form.js';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MAP_ZOOM_COUNT = 13;
const NUMBERS_AFTER_COMMA_COUNT = 5;

const DEFAULT_MAIN_MARKER_POSITION = {
  lat: 35.68306,
  lng: 139.75436,
};

const MAIN_MARKER_OPTIONS = {
  url: './img/main-pin.svg',
  width: 52,
  height: 52,
  anchorX: 26,
  anchorY: 52,
};

const AD_MARKER_OPTIONS = {
  url: './img/pin.svg',
  width: 40,
  height: 40,
  anchorX: 20,
  anchorY: 40,
};

const ads = createArrayOfAdItems();
const map = L.map('map-canvas');

const createMainMarkerIcon = () => L.icon({
  iconUrl: MAIN_MARKER_OPTIONS.url,
  iconSize: [MAIN_MARKER_OPTIONS.width, MAIN_MARKER_OPTIONS.height],
  iconAnchor: [MAIN_MARKER_OPTIONS.anchorX, MAIN_MARKER_OPTIONS.anchorY],
});

const mainMarker = L.marker(DEFAULT_MAIN_MARKER_POSITION, {
  draggable: true,
  icon: createMainMarkerIcon(),
}).addTo(map);

const createAdMarker = () => L.icon({
  iconUrl: AD_MARKER_OPTIONS.url,
  iconSize: [AD_MARKER_OPTIONS.width, AD_MARKER_OPTIONS.height],
  iconAnchor: [AD_MARKER_OPTIONS.anchorX, AD_MARKER_OPTIONS.anchorY],
});

const markerGroup = L.layerGroup().addTo(map);

const addAdMarker = (ad) => L.marker(ad.location, {
  icon: createAdMarker(),
}).addTo(markerGroup)
  .bindPopup(createAd(ad));

const renderAdMarkers = () => {
  ads.forEach((ad) => addAdMarker(ad));
};

const renderLatLngMarker = (input) => {
  input.value = `${ DEFAULT_MAIN_MARKER_POSITION.lat.toFixed(NUMBERS_AFTER_COMMA_COUNT) }, ${ DEFAULT_MAIN_MARKER_POSITION.lng.toFixed(NUMBERS_AFTER_COMMA_COUNT) }`;
  mainMarker.on('moveend', (evt) => onMainMarkerMoveend(evt, input));
};

function onMainMarkerMoveend(evt, input) {
  const newPosition = evt.target.getLatLng();
  input.value = `${ newPosition.lat.toFixed(NUMBERS_AFTER_COMMA_COUNT) }, ${ newPosition.lng.toFixed(NUMBERS_AFTER_COMMA_COUNT) }`;
}

const renderMap = () => {
  map.on('load', () => {
    createActiveFormState();
    createActiveSortState();
    renderAdMarkers();
    sendForm();
  }).setView(DEFAULT_MAIN_MARKER_POSITION, MAP_ZOOM_COUNT);

  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT
  }).addTo(map);
};

const resetMap = (input) => {
  map.closePopup();
  mainMarker.setLatLng(DEFAULT_MAIN_MARKER_POSITION);
  map.setView(DEFAULT_MAIN_MARKER_POSITION, MAP_ZOOM_COUNT);
  input.value = `${ DEFAULT_MAIN_MARKER_POSITION.lat.toFixed(NUMBERS_AFTER_COMMA_COUNT) }, ${ DEFAULT_MAIN_MARKER_POSITION.lng.toFixed(NUMBERS_AFTER_COMMA_COUNT) }`;
};

export { renderMap, renderLatLngMarker, resetMap };
