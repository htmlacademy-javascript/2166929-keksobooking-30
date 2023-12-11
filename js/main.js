import { createAds } from './ads/ads.js';
import { createSendForm } from './form/upload-form.js';
import { createInactiveForm, createActiveForm } from './form/active-and-inactive-form.js';

createAds();
createInactiveForm();
createActiveForm();
createSendForm();
