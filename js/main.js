import { renderMap } from './map/map.js';
import { createInactiveSortState, createInactiveFormState } from './form/active-and-inactive-form.js';
import { loadingMap } from './loading-map.js';

createInactiveSortState();
createInactiveFormState();
renderMap(loadingMap());
