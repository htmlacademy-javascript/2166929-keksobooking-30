import { getData } from './api/get-and-send-data.js';
import { activatesUploadForm } from './form/active-and-inactive-form.js';
import { initForm } from './form/form.js';

const loadingMap = () => {
  initForm();
  activatesUploadForm();
  getData();
};

export { loadingMap };
