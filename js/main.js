import { renderMap } from './map/map.js';
import { inactivatesFilterForm, inactivatesUploadForm } from './form/active-and-inactive-form.js';
import { loadingMap } from './loading-map.js';

inactivatesFilterForm();
inactivatesUploadForm();
renderMap(loadingMap());
