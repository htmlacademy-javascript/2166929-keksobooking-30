import { getData } from './api/get-and-send-data.js';
import { createActiveFormState } from './form/active-and-inactive-form.js';
import { initForm } from './form/form.js';

const loadingMap = () => {
  initForm();
  createActiveFormState();
  getData();
};

export { loadingMap };
