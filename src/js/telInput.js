import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';

export function initializePhoneInput() {
  const input = document.querySelector('#phone');
  const errorMsg = document.querySelector('#error-msg');

  if (input) {
    const iti = intlTelInput(input, {
      initialCountry: 'it',
      strictMode: true,
      utilsScript:
        'https://cdn.jsdelivr.net/npm/intl-tel-input@24.5.0/build/js/utils.js',
      separateDialCode: true,
      autoPlaceholder: false,
    });

    const reset = () => {
      input.classList.remove('error');
      errorMsg.classList.add('hide');
      errorMsg.innerHTML = '';
    };

    const showError = (msg) => {
      input.classList.add('error');
      errorMsg.innerHTML = msg;
      errorMsg.classList.remove('hide');
    };

    input.addEventListener('blur', () => {
      reset();

      if (!input.value.trim()) {
        showError('Il numero di telefono è richiesto');
      } else if (!iti.isValidNumber()) {
        showError('Numero di telefono non valido');
      } 
    });

    input.addEventListener('input', reset);
  } else {
    console.error("Input element with ID 'phone' not found");
  }
}
