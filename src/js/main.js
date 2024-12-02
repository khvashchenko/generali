import { initializeSwiper } from './swiperSetup.js';
import { initializeRangSwiper } from './calculator.js';
import { initializePhoneInput } from './telInput.js';
import { validateFormFields } from './formValidation.js';

initializeSwiper();
initializeRangSwiper();
initializePhoneInput();

validateFormFields((formData) => {
  console.log('Form Data:', formData);
});