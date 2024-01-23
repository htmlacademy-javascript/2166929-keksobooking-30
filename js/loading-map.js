import { getData } from './api/get-and-send-data.js';
import { activateUploadForm } from './form/active-and-inactive-form.js';
import { loadingForm } from './form/form.js';

const loadingMap = () => {
  loadingForm();
  activateUploadForm();
  getData();
};

export { loadingMap };
