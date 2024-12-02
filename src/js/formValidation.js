import intlTelInput from 'intl-tel-input';

export function validateFormFields(callback) {
  const firstName = document.querySelector('#firstName');
  const lastName = document.querySelector('#lastName');
  const email = document.querySelector('#email');
  const phoneInput = document.querySelector('#phone');
  const errorMsg = document.querySelector('#error-msg');
  const submitButton = document.querySelector('#btn');

  const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailPattern.test(email);
  };

  const showError = (input, message) => {
    errorMsg.innerText = message;
    errorMsg.classList.remove('hide');
    input.classList.add('error-border');
  };

  const resetError = (input) => {
    errorMsg.classList.add('hide');
    errorMsg.innerText = '';
    input.classList.remove('error-border');
  };

  const clearForm = () => {
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    phoneInput.value = '';
    resetError(firstName);
    resetError(lastName);
    resetError(email);
    resetError(phoneInput);
  };

  const validateInput = (input, message, validateFn) => {
    if (!validateFn(input.value)) {
      showError(input, message);
      return false;
    }
    return true;
  };

  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    resetError(firstName);
    resetError(lastName);
    resetError(email);
    resetError(phoneInput);

    const inputs = [
      {
        input: firstName,
        message: 'Il nome è richiesto',
        validateFn: (value) => value.trim(),
      },
      {
        input: lastName,
        message: 'Il cognome è richiesto',
        validateFn: (value) => value.trim(),
      },
      {
        input: email,
        message: 'Email è richiesta',
        validateFn: (value) => value.trim(),
      },
      { input: email, message: 'Email non valida', validateFn: isValidEmail },
      {
        input: phoneInput,
        message: 'Il numero di telefono è richiesto e deve essere valido',
        validateFn: (value) =>
          value.trim() && intlTelInput.getInstance(phoneInput).isValidNumber(),
      },
    ];

    const validateNextInput = (index) => {
      if (index < inputs.length) {
        const { input, message, validateFn } = inputs[index];
        if (!validateInput(input, message, validateFn)) {
          input.focus();
          return;
        }
        validateNextInput(index + 1);
      } else {
        const iti = intlTelInput.getInstance(phoneInput);
        const fullNumber = iti.getNumber();

        const formData = {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          phone: fullNumber,
        };
        callback(formData);

        clearForm();
        submitButton.classList.add('success');
        submitButton.innerHTML = 'Success';

        firstName.addEventListener('input', resetButton);
        lastName.addEventListener('input', resetButton);
        email.addEventListener('input', resetButton);
        phoneInput.addEventListener('input', resetButton);
      }
    };

    validateNextInput(0);
  });

  const resetButton = () => {
    submitButton.classList.remove('success');
    submitButton.innerHTML = 'Registrati';
    firstName.removeEventListener('input', resetButton);
    lastName.removeEventListener('input', resetButton);
    email.removeEventListener('input', resetButton);
    phoneInput.removeEventListener('input', resetButton);
  };
}
