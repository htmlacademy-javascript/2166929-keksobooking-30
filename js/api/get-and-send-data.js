import { disablesElement } from '../util/util.js';
import { getServerData, sendServerData } from './data.js';
import { createServerErrorMessage } from '../map/map-error-message.js';
import { createFormSuccessMessage, createFormErrorMessage } from '../form/form-error-and-success-messages.js';
import { renderAdMarkers } from '../map/map.js';
import { inactivatesFilterForm, activatesFilterForm } from '../form/active-and-inactive-form.js';
import { resetForm } from '../form/form.js';

const submitButton = document.querySelector('.ad-form__submit');

const getData = async () => {
  try {
    const ads = await getServerData();
    renderAdMarkers(ads);
    activatesFilterForm();
  } catch {
    createServerErrorMessage();
    inactivatesFilterForm();
  }
};

const sendForm = async (formElement) => {
  try {
    disablesElement(submitButton, true);
    await sendServerData(new FormData(formElement));
    resetForm();
    createFormSuccessMessage();
    disablesElement(submitButton, false);
  } catch {
    createFormErrorMessage();
    disablesElement(submitButton, false);
  }
};

export { getData, sendForm };
