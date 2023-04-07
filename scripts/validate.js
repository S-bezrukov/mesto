// Валидация форм
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_action_disabled',
  activeButtonClass: 'form__submit-btn_action_enabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

//эта функция запускает валидацию
const enableValidation = ({formSelector, ...rest}) => {   
	const forms = Array.from(document.querySelectorAll(formSelector))
	forms.forEach(form => {
		form.addEventListener('submit', (evt) => {
		evt.preventDefault();
		})
		setEventListeners(form, rest)
	})
}

const setEventListeners = (formToValidate, { inputSelector, submitButtonSelector, ...rest }) => {
	const formInputs = Array.from(formToValidate.querySelectorAll(inputSelector)) // с начало выполниться то, что в скобках, найдутся псевдомассив со всеми инпутами фомы и Array.from преобразует их в массив инпутов
	const formButton = formToValidate.querySelector(submitButtonSelector) //получаем ссылку на кнопку
	disableButton(formButton, rest) // сделаем кнопку не активной, когда страница только загрузилась и в поля данные ещё не вводились. 
	formInputs.forEach(input => { //теперь пройдёмся по этому массиву циклом и с каждым элемнтом выполним деёствие, берём инпут и накладываем на него слушатель
		input.addEventListener('input', () => {
			checkInputValidity(input, rest)
			if (hasInvalidInput(formInputs)) {
				disableButton(formButton, rest)  // сделать эту кнопку не валидной
			} else {
				enableButton(formButton, rest) // сделать эту кнопку валидной
			}
		})
	})
}

const checkInputValidity = (input, {inputErrorClass, errorClass}) => {
	if (input.checkValidity()) {      //Если поле отдаст true, значит поле прошло валидацию
		hideInputError(input, {inputErrorClass, errorClass})
	} else {
		showInputError(input, {inputErrorClass, errorClass})
	}
}

const showInputError = (input, {inputErrorClass, errorClass}) => {
  const inputError = document.querySelector(`#${input.id}`)
  inputError.classList.add(inputErrorClass);
  const errorMessage = document.querySelector(`#${input.id}-error`)
  errorMessage.textContent = input.validationMessage;
  errorMessage.classList.add(errorClass);
}

const hideInputError = (input, {inputErrorClass, errorClass}) => {
  const inputError = document.querySelector(`#${input.id}`)
  inputError.classList.remove(inputErrorClass);
  const errorMessage = document.querySelector(`#${input.id}-error`)
  errorMessage.classList.remove(errorClass);
  errorMessage.textContent = '';
}

const hasInvalidInput = (formInputs) => {
	return formInputs.some(item => !item.validity.valid) // в эту функцию передаём массив formInputs и проверяем, если хоть одно поле не валидно то получаем false иначе true
}

const enableButton = (button, {inactiveButtonClass, activeButtonClass}) => {
	button.classList.remove(inactiveButtonClass)
	button.classList.add(activeButtonClass)
	button.removeAttribute('disabled')	
}

const disableButton = (button, {inactiveButtonClass, activeButtonClass}) => {
	button.classList.add(inactiveButtonClass)
	button.classList.remove(activeButtonClass)
  button.setAttribute('disabled', true)
}

enableValidation (validationConfig) //вызываем функцию

const removeValidationErrors = function(inputs, validationConfig) {
  inputs.forEach(input => {
    hideInputError(input, validationConfig)
  })
}