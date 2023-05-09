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
const popupEditeProfile = new PopupWithForm('.popup_edit_profile', {
  callbackSubmitForm: (profileData) => {
    userInfo.setUserInfo({
      username: profileData.username,
      description: profileData.description
    });
    popupEditeProfile.close();
  }
});
popupEditeProfile.setEventListeners();
// Объявляем функцию добавления карточек
const renderCard = function (cardData) {
  const renderCardItem = new Card(cardData, '.element_template', handleCardClick);
  return renderCardItem.createCard();
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
const popupAddCard = new PopupWithForm('.popup_add_card', {
  callbackSubmitForm: (formValues) => { 
    cardsSection.addItem(renderCard({
      name: formValues.placename,
      link: formValues.placeimage
    }));
    popupAddCard.close();
  }
});
popupAddCard.setEventListeners();

const addCardValidate = new FormValidator(validationConfig, formAddCard);
addCardValidate.enableValidation();
const editProfileValidate = new FormValidator(validationConfig, formEditProfile);
editProfileValidate.enableValidation();

// Слушатель для иконки редактирования профиля
buttonEditProfile.addEventListener('click', function () {
  popupEditeProfile.open();
  const actualUserInfo = userInfo.getUserInfo();
  nameInputProfile.setAttribute('value', actualUserInfo.username);
  jobInputProfile.setAttribute('value', actualUserInfo.description);
  editProfileValidate.removeValidationErrors();
  editProfileValidate.disableButton();
});
// Слушатель для иконки добавления карточки
buttonAddCard.addEventListener('click', function () {
  popupAddCard.open();
  addCardValidate.removeValidationErrors();
  addCardValidate.disableButton();
});