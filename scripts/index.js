import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';
const page = document.querySelector('.page');
const mainContent = document.querySelector('.content');
const buttonEditProfile = mainContent.querySelector('.profile__edit-button');
const buttonAddCard = mainContent.querySelector('.profile__add-button');
const profileDescription = mainContent.querySelector('.profile__description');
const elementsContainer = mainContent.querySelector('.elements__list');
const profileTitle = mainContent.querySelector('.profile__title');
// попап карточки
const popupAddCard = page.querySelector('.popup_add_card');
const formAddCard = popupAddCard.querySelector('.form_add_card');
// попап профиля
const popupEditProfile = document.querySelector('.popup_edit_profile');
const formEditProfile = popupEditProfile.querySelector('.form_edit_profile');
const buttonImageEditProfile = page.querySelector('.popup__image_edit_profile');
const buttonImageAddCard = page.querySelector('.popup__image_add_card');
const buttonImageZoomCard = page.querySelector('.popup__image_zoom_card');
export const elementTemplate = page.querySelector('.element_template').content;
export const popupZoomCard = page.querySelector('.popup_zoom_card');
export const popupImagePlace = page.querySelector('.popup__image-place');
export const popupTitlePlace = page.querySelector('.popup__title-place');
const placeInputCard = formAddCard.querySelector('.form__input_type_place');
const imageInputCard = formAddCard.querySelector('.form__input_type_photo');
const nameInputProfile = formEditProfile.querySelector('.form__input_type_name');
const jobInputProfile = formEditProfile.querySelector('.form__input_type_job');
const popups = document.querySelectorAll('.popup');

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

const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_action_disabled',
  activeButtonClass: 'form__submit-btn_action_enabled',
  cardLikeIconActive: 'elements__icon_active',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// Открываем попап
export const openPopup = function (popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupEsc)
}

// Закрываем попап
const closePopup = function (popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupEsc)
}

const openProfilePopup = function() {
  errorHideProfile.removeValidationErrors();
  editProfileValidate.disableButton();
  nameInputProfile.value = profileTitle.textContent;
  jobInputProfile.value = profileDescription.textContent;
  openPopup(popupEditProfile); 
}

buttonEditProfile.addEventListener('click', function() {
  openProfilePopup()
})

const openAddCardPopup = function() {
  placeInputCard.value = "";
  imageInputCard.value = "";
  addCardValidate.disableButton();
  errorHideCard.removeValidationErrors();
  openPopup(popupAddCard); 
}

buttonAddCard.addEventListener('click', function() {
  openAddCardPopup()
})

const closePopupEsc = function (evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened')
    if (activePopup) { 
      closePopup(activePopup) 
    }
  }
}

const closePopupOverlay = function (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
  }
}

popups.forEach(input => { 
  input.addEventListener('click', closePopupOverlay);
})

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
  editProfileValidate.disableButton();
  closePopup(popupEditProfile);
}

formEditProfile.addEventListener('submit', handleFormSubmitEditProfile);

const renderCard = function (object, template) {
  const card = new Card(object, template);
  return card.createCard();
}

// Добавляем начальные карточки
  initialCards.forEach(function (card) {
    elementsContainer.append(renderCard(card, '.element_template'));
  });


// Добавляем новую карточку
function handleFormSubmitAddCard (evt) {
  evt.preventDefault();
  elementsContainer.prepend(renderCard({
    name: placeInputCard.value,
    link: imageInputCard.value
  }, '.element_template'));
  evt.target.reset();
  editProfileValidate.disableButton();
  closePopup(popupAddCard);
}

formAddCard.addEventListener('submit', handleFormSubmitAddCard);

const addCardValidate = new FormValidator(validationConfig, formAddCard);
addCardValidate.enableValidation();

const editProfileValidate = new FormValidator(validationConfig, formEditProfile);
editProfileValidate.enableValidation();

const errorHideProfile = new FormValidator(validationConfig, formEditProfile);
const errorHideCard = new FormValidator(validationConfig, formAddCard);