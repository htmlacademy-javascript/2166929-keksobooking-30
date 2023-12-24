import { renderMap } from './map/map.js';
import { getData } from './api/get-and-send-data.js';
import { createInactiveSortState, createInactiveFormState, createActiveFormState } from './form/active-and-inactive-form.js';
import { initForm } from './form/form.js';

const loadingMap = () => {
  initForm();
  createActiveFormState();
  getData();
};

createInactiveSortState();
createInactiveFormState();
renderMap(loadingMap());
