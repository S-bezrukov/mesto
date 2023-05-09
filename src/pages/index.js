import { initialCards, validationConfig} from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  buttonEditProfile, formAddCard, formEditProfile, nameInputProfile, jobInputProfile, buttonAddCard
} from '../utils/elements.js';
import '../pages/index.css'
const popupImageZoom = new PopupWithImage('.popup_zoom_card');
popupImageZoom.setEventListeners();
// Функции для всплывающего попапа изображения
const handleCardClick = function (name, image) {
  popupImageZoom.open(name, image);
}
// Получаем данные пользователя из профиля
const userInfo = new UserInfo({
  usernameSelector: '.profile__title',
  userDescriptionSelector: '.profile__description'
});
// Объявляем попап редактирования профиля
const editePopupWithForm = new PopupWithForm('.popup_edit_profile', {
  callbackSubmitForm: (profileData) => {
    userInfo.setUserInfo({
      username: profileData.username,
      description: profileData.description
    });
    editePopupWithForm.close();
  }
});
editePopupWithForm.setEventListeners();
// Объявляем функцию добавления карточек
const renderCard = function (cardData) {
  const renderCard = new Card(cardData, '.element_template', handleCardClick);
  return renderCard.createCard();
}
// Наполнение карточками из массива
const cardsSection = new Section({
  items: initialCards,
  renderer: (cardData) => {
    cardsSection.addItem(renderCard(cardData));
  }
}, '.elements__list');
cardsSection.renderItems();
// Объявляем попап добавления новой карточки 
const addCardPopupWithForm = new PopupWithForm('.popup_add_card', {
  callbackSubmitForm: (formValues) => { 
    cardsSection.addItem(renderCard({
      name: formValues.placename,
      link: formValues.placeimage
    }));
    addCardPopupWithForm.close();
  }
});
addCardPopupWithForm.setEventListeners();

const addCardFormValidator = new FormValidator(validationConfig, formAddCard);
addCardFormValidator.enableValidation();
const editProfileFormValidator = new FormValidator(validationConfig, formEditProfile);
editProfileFormValidator.enableValidation();

// Слушатель для иконки редактирования профиля
buttonEditProfile.addEventListener('click', function () {
  editePopupWithForm.open();
  const actualUserInfo = userInfo.getUserInfo();
  nameInputProfile.setAttribute('value', actualUserInfo.username);
  jobInputProfile.setAttribute('value', actualUserInfo.description);
  editProfileFormValidator.removeValidationErrors();
  editProfileFormValidator.disableButton();
});
// Слушатель для иконки добавления карточки
buttonAddCard.addEventListener('click', function () {
  addCardPopupWithForm.open();
  addCardFormValidator.removeValidationErrors();
  addCardFormValidator.disableButton();
});