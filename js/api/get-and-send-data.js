import { getServerData, sendServerData } from './data.js';
import { createServerErrorMessage } from '../map/map-error-message.js';
import { createFormSuccessMessage, createFormErrorMessage } from '../form/form-error-and-success-messages.js';
import { renderAdMarkers } from '../map/map.js';
import { createInactiveSortState, createActiveSortState } from '../form/active-and-inactive-form.js';
import { createDisabledButtonState, resetForm } from '../form/form.js';

const getData = async () => {
  try {
    const ads = await getServerData();
    renderAdMarkers(ads);
    createActiveSortState();
  } catch {
    createServerErrorMessage();
    createInactiveSortState();
  }
};

const sendForm = async (formElement) => {
  try {
    createDisabledButtonState(true);
    await sendServerData(new FormData(formElement));
    resetForm();
    createFormSuccessMessage();
    createDisabledButtonState(false);
  } catch {
    createFormErrorMessage();
    createDisabledButtonState(false);
  }
};

export { getData, sendForm };
