import { createAd } from './ad.js';
import { createFilteredAds, resetFilters } from './filter-ads.js';
import { removeBounce } from '../util/util.js';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MAP_ZOOM_COUNT = 13;
const NUMBERS_AFTER_COMMA = 5;
const MAX_ADS_COUNT = 10;

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

const filter = document.querySelector('.map__filters');

const map = L.map('map-canvas');

let dataAds = [];

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

const removeLayer = () => markerGroup.clearLayers();

const addAdMarker = (ad) => L.marker(ad.location, {
  icon: createAdMarker(),
}).addTo(markerGroup)
  .bindPopup(createAd(ad));

const createAdMarkers = (ads) => ads.slice(0, MAX_ADS_COUNT).forEach((ad) => addAdMarker(ad));

const onFilterChange = removeBounce((ads) => {
  removeLayer();
  createFilteredAds(ads).slice(0, MAX_ADS_COUNT).forEach((ad) => addAdMarker(ad));
});

const renderAdMarkers = (ads) => {
  dataAds = ads;
  createAdMarkers(dataAds);
  filter.addEventListener('change', () => onFilterChange(ads));
};

const onMainMarkerMoveend = (evt, input) => {
  const newPosition = evt.target.getLatLng();
  input.value = `${ newPosition.lat.toFixed(NUMBERS_AFTER_COMMA) }, ${ newPosition.lng.toFixed(NUMBERS_AFTER_COMMA) }`;
};

const renderLatLngMarker = (input) => {
  input.value = `${ DEFAULT_MAIN_MARKER_POSITION.lat.toFixed(NUMBERS_AFTER_COMMA) }, ${ DEFAULT_MAIN_MARKER_POSITION.lng.toFixed(NUMBERS_AFTER_COMMA) }`;
  mainMarker.on('moveend', (evt) => onMainMarkerMoveend(evt, input));
};

const renderMap = () => {
  map.on('load', (loadingElements) =>
    loadingElements
  ).setView(DEFAULT_MAIN_MARKER_POSITION, MAP_ZOOM_COUNT);

  L.tileLayer(TILE_LAYER, {
    attribution: COPYRIGHT
  }).addTo(map);
};

const resetMap = (input) => {
  map.closePopup();
  mainMarker.setLatLng(DEFAULT_MAIN_MARKER_POSITION);
  map.setView(DEFAULT_MAIN_MARKER_POSITION, MAP_ZOOM_COUNT);
  input.value = `${ DEFAULT_MAIN_MARKER_POSITION.lat.toFixed(NUMBERS_AFTER_COMMA) }, ${ DEFAULT_MAIN_MARKER_POSITION.lng.toFixed(NUMBERS_AFTER_COMMA) }`;

  if (dataAds.length !== 0) {
    removeLayer();
    createAdMarkers(dataAds);
    resetFilters();
  }
};

export { renderMap, renderAdMarkers, renderLatLngMarker, resetMap };
