import { renderMap } from './map/map.js';
import { createInactiveSortState, createInactiveFormState } from './form/active-and-inactive-form.js';

createInactiveSortState();
createInactiveFormState();
renderMap();
