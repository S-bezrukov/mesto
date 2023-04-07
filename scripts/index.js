const page = document.querySelector('.page');
const mainContent = document.querySelector('.content');
const buttonEditProfile = mainContent.querySelector('.profile__edit-button');
const buttonAddCard = mainContent.querySelector('.profile__add-button');
const profileDescription = mainContent.querySelector('.profile__description');
const elementsContainer = mainContent.querySelector('.elements__list');
const profileTitle = mainContent.querySelector('.profile__title');
const popupAddCard = page.querySelector('.popup_add_card');
const popupEditProfile = page.querySelector('.popup_edit_profile');
const popupZoomCard = page.querySelector('.popup_zoom_card');
const buttonImageEditProfile = page.querySelector('.popup__image_edit_profile');
const buttonImageAddCard = page.querySelector('.popup__image_add_card');
const buttonImageZoomCard = page.querySelector('.popup__image_zoom_card');
const elementTemplate = page.querySelector('.element_template').content;
const formAddCard = page.querySelector('.form_add_card');
const formEditProfile = page.querySelector('.form_edit_profile');
const elementText = page.querySelector('.elements__text');
const popupImagePlace = page.querySelector('.popup__image-place');
const popupTitlePlace = page.querySelector('.popup__title-place');
const elementImage = page.querySelector('.elements__image');
const placeInputCard = formAddCard.querySelector('.form__input_type_place');
const imageInputCard = formAddCard.querySelector('.form__input_type_photo');
const nameInputProfile = formEditProfile.querySelector('.form__input_type_name');
const jobInputProfile = formEditProfile.querySelector('.form__input_type_job');
const formInputs = document.querySelectorAll('.form__input');
const formButtonProfille = document.querySelector('.form__submit-btn_action_add');
const formButtonCreate = document.querySelector('.form__submit-btn_action_create');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

// Открываем попап
const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  removeValidationErrors(formInputs, validationConfig);
  document.addEventListener('keydown', closePopupEsc)
  popup.addEventListener('click', closePopupOverlay)
}

// Закрываем попап
const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
}

const closePopupEsc = function (evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  }
}

const closePopupOverlay = function (evt) {
  if (evt.target === evt.currentTarget) {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  }
}

buttonEditProfile.addEventListener('click', function() {
  enableButton (formButtonProfille, {inactiveButtonClass:validationConfig.inactiveButtonClass, activeButtonClass:validationConfig.activeButtonClass});
  nameInputProfile.value = profileTitle.textContent;
  jobInputProfile.value = profileDescription.textContent;
  openPopup(popupEditProfile); 
})

buttonAddCard.addEventListener('click', function() {
  placeInputCard.value = "";
  imageInputCard.value = "";
  openPopup(popupAddCard); 
})

function openZoomCard() {
  openPopup(popupZoomCard); 
}

buttonImageEditProfile.addEventListener('click', function() {
  closePopup(popupEditProfile); 
})

buttonImageAddCard.addEventListener('click', function() {
  closePopup(popupAddCard); 
})

buttonImageZoomCard.addEventListener('click', function() {
  closePopup(popupZoomCard);
})

// Отправка формы редактирования профиля
function handleFormSubmitEditProfile (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInputProfile.value;
  profileDescription.textContent = jobInputProfile.value;
  closePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', handleFormSubmitEditProfile);

// Удаляем карточку
function handleDelete (evt) {
  const card = evt.target.closest('.elements__element');
  card.remove();
}

// Лайк
function handleLike (evt) {
  const elementIcon = evt.target.closest('.elements__icon');
  elementIcon.classList.toggle('elements__icon_active');
}

// Попап увеличения картинки
function handleFormImage(data) {
  openZoomCard();
  popupImagePlace.src = data.link;
  popupImagePlace.alt = data.name;
  popupTitlePlace.textContent = data.name;
}

const createCard = (data) => {
  // Клонируем шаблон и наполняем его информацией из объекта data, навешиваем обработчики событий
  const cardElement = elementTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.elements__text');
  const cardImage = cardElement.querySelector('.elements__image');
  const cardLike = cardElement.querySelector('.elements__icon');
  const cardDelete = cardElement.querySelector('.elements__delete');
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  cardImage.addEventListener('click', () => handleFormImage(data));
  cardLike.addEventListener('click', handleLike);
  cardDelete.addEventListener('click', handleDelete);
  // Возвращаем получившуюся карточку
  return cardElement;
}

const renderCard = (data) => {
  // Создаем карточку на основе данных
  const cardElement = createCard(data);
  // Помещаем ее в контейнер карточек
  elementsContainer.append(cardElement);
}

// Добавляем начальные карточки
initialCards.forEach(card => { renderCard(card); });

// Добавляем новую карточку
function handleFormSubmitAddCard (evt) {
  evt.preventDefault();
  const newCard = createCard({
    name: placeInputCard.value,
    link: imageInputCard.value
  });
  elementsContainer.prepend(newCard);
  evt.target.reset();
  disableButton(formButtonCreate, {inactiveButtonClass:validationConfig.inactiveButtonClass, activeButtonClass:validationConfig.activeButtonClass});
  closePopup(popupAddCard);
}

formAddCard.addEventListener('submit', handleFormSubmitAddCard);

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