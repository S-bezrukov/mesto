class FormValidator {
	constructor(validationConfig, element) {
		this._element = element;
		this._inputSelector = validationConfig.inputSelector;
		this._submitButtonSelector = validationConfig.submitButtonSelector;
		this._inactiveButtonClass = validationConfig.inactiveButtonClass;
		this._activeButtonClass = validationConfig.activeButtonClass;
		this._inputErrorClass = validationConfig.inputErrorClass;
		this._errorClass = validationConfig.errorClass;
		this._formInputs = Array.from(this._element.querySelectorAll(this._inputSelector));
		this._formButton = this._element.querySelector(this._submitButtonSelector); 
	}

	enableValidation = () => {   
		this._setEventListeners();
	}

	_setEventListeners = () => {
		this.disableButton() // сделаем кнопку не активной, когда страница только загрузилась и в поля данные ещё не вводились. 
		this._formInputs.forEach(input => { //теперь пройдёмся по этому массиву циклом и с каждым элемнтом выполним деёствие, берём инпут и накладываем на него слушатель
			input.addEventListener('input', () => {
				this._checkInputValidity(input)
				if (this._hasInvalidInput()) {
					this.disableButton()  // сделать эту кнопку не валидной
				} else {
					this._enableButton() // сделать эту кнопку валидной
				}
			})
		})
	}

	_enableButton = () => {
		this._formButton.classList.remove(this._inactiveButtonClass)
		this._formButton.classList.add(this._activeButtonClass)
		this._formButton.removeAttribute('disabled')	
	}

	disableButton = () => {
		this._formButton.classList.add(this._inactiveButtonClass)
		this._formButton.classList.remove(this._activeButtonClass)
		this._formButton.setAttribute('disabled', true)
	}

	_checkInputValidity = (input) => {
		if (input.checkValidity()) {      //Если поле отдаст true, значит поле прошло валидацию
			this._hideInputError(input, input.validationMessage);
		} else {
			this._showInputError(input);
		}
	}

	_hideInputError = (input) => {
		const inputError = this._element.querySelector(`#${input.id}`)
		inputError.classList.remove(this._inputErrorClass);
		const errorMessage = this._element.querySelector(`#${input.id}-error`)
		errorMessage.classList.remove(this._errorClass);
		errorMessage.textContent = '';
	}

	_showInputError = (input) => {
		const inputError = this._element.querySelector(`#${input.id}`)
		inputError.classList.add(this._inputErrorClass);
		const errorMessage = this._element.querySelector(`#${input.id}-error`)
		errorMessage.textContent = input.validationMessage;
		errorMessage.classList.add(this._errorClass);
	}

	_hasInvalidInput = () => {
		return this._formInputs.some(input => !input.validity.valid) // в эту функцию передаём массив formInputs и проверяем, если хоть одно поле не валидно то получаем false иначе true
	}

	removeValidationErrors = () => {
		this._formInputs.forEach(input => {
			this._hideInputError(input, input.validationMessage)
		})
	}

}

export { FormValidator }