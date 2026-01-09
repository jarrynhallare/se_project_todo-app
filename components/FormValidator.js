class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formElement = formElement;
  }


  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    if (errorElement) {
      errorElement.classList.add(this._errorClass);
      errorElement.textContent = errorMessage;
    }
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    if (errorElement) {
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = "";
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => !input.validity.valid);
  }

  _disableSubmitButton = () => {
  this._buttonElement.classList.add(this._inactiveButtonClass);
  this._buttonElement.disabled = true;
};

_enableSubmitButton = () => {
  this._buttonElement.classList.remove(this._inactiveButtonClass);
  this._buttonElement.disabled = false;
};

  _toggleButtonState() {
  if (this._hasInvalidInput()) {
    this._disableSubmitButton();
  } else {
    this._enableSubmitButton();
  }
}

  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._formElement.reset();
    this._disableSubmitButton(); 
    this._toggleButtonState();
}
}


export default FormValidator;