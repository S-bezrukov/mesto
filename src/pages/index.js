import { validationConfig} from '../utils/constants.js';
import { apiAuthorization } from '../utils/apiAuthorization.js';
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupNotice } from '../components/PopupNotice.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { Api } from '../components/Api.js';
import { UserInfo } from '../components/UserInfo.js';
import {
  buttonEditProfile, formAddCard, formEditProfile, nameInputProfile, jobInputProfile, buttonAddCard, iconAvatarEdit, popupEditAvatarForm
} from '../utils/elements.js';
import '../pages/index.css';

const apiConnect = new Api(apiAuthorization);
let userId;
const userInfo = new UserInfo({
  usernameSelector: '.profile__title',
  userDescriptionSelector: '.profile__description',
  userAvatarSelector: '.profile__avatar'
});

Promise.all([ apiConnect.getUserData(), apiConnect.getInitialCards()]).then(([ userProfileData, cardObject ]) => {
  userId = userProfileData._id;
  userInfo.setUserInfo({ username: userProfileData.name, description: userProfileData.about });
  cardsSection.renderItems(cardObject.reverse());
  userInfo.setUserAvatar(userProfileData.avatar);
})

.catch((err) => { console.log(`Возникла глобальная ошибка, ${err}`) })
const renderCard = function (cardObject) {
  const cardItem = new Card(cardObject, '.element_template', userId, { cardId: cardObject._id, authorId: cardObject.owner._id, }, {
    handleCardZoom: (name, image) => { popupImageZoom.open(name, image) },
    handleCardDelete: (cardElement, cardId) => { popupNoticeDelete.open(cardElement, cardId) },
    handleCardLike: (cardId) => { apiConnect.insertCardLike(cardId)
      .then((res) => { cardItem.renderCardLike(res);})
      .catch((err) => { console.log(`При лайке карточки возникла ошибка, ${err}`) })
    },
    handleCardDeleteLike: (cardId) => { apiConnect.delCardLike(cardId)
      .then((res) => { cardItem.renderCardLike(res); })
      .catch((err) => { console.log(`При дизлайке карточки возникла ошибка, ${err}`) })
    },
  });
  return cardItem.createCard();
}

const popupImageZoom = new PopupWithImage('.popup_zoom_card');
popupImageZoom.setEventListeners();

const cardsSection = new Section({
  renderer: (cardObject) => {
    cardsSection.addItem(renderCard(cardObject));
  }
}, '.elements__list');

// Popup удаления карточки
const popupNoticeDelete = new PopupNotice(".popup_delete_card", {
  callbackNotice: (cardElement, cardId) => { apiConnect.deleteCard(cardId)
    .then(() => {
      cardElement.deleteCard();
      popupNoticeDelete.close();
    })
    .catch((err) => { console.log(`При удалении карточки возникла ошибка, ${err}`) })
  }
});
popupNoticeDelete.setEventListeners();

// Popup редактирования профиля
const editePopupWithForm = new PopupWithForm('.popup_edit_profile', {
  callbackSubmitForm: (userProfileData) => { editePopupWithForm.putSavingProcessText(); apiConnect.sendUserData(userProfileData)
    .then((res) => {
      userInfo.setUserInfo({ username: res.name, description: res.about });
      editePopupWithForm.close();
    })
    .catch((err) => { console.log(`При редактировании профиля возникла ошибка, ${err}`) })
    .finally(() => {
      editePopupWithForm.returnSavingProcessText();
    })
  }
});
editePopupWithForm.setEventListeners();

// Popup редактирования аватара
const popupEditeAvatar = new PopupWithForm('.popup_avatar', {
  callbackSubmitForm: (userProfileData) => { popupEditeAvatar.putSavingProcessText(); apiConnect.sendAvatarData(userProfileData)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      popupEditeAvatar.close();
    })
    .catch((err) => { console.log(`При обновлении аватара возникла ошибка, ${err}`) })
    .finally(() => {
      popupEditeAvatar.returnSavingProcessText();
    })
  }
});
popupEditeAvatar.setEventListeners();

// Popup добавления новой карточки
const addCardPopupWithForm = new PopupWithForm('.popup_add_card', {
  callbackSubmitForm: (formValues) => { addCardPopupWithForm.putSavingProcessText(); apiConnect.addNewCard({ name: formValues.placename, link: formValues.placeimage })
    .then((card) => {
      cardsSection.addItem(renderCard(card));
      addCardPopupWithForm.close();
    })
    .catch((err) => { console.log(`При добавлении новой карточки возникла ошибка, ${err}`) })
    .finally(() => {
      addCardPopupWithForm.returnSavingProcessText();
    })
  }
});
addCardPopupWithForm.setEventListeners();

const addCardFormValidator = new FormValidator(validationConfig, formAddCard);
addCardFormValidator.enableValidation();
const editProfileFormValidator = new FormValidator(validationConfig, formEditProfile);
editProfileFormValidator.enableValidation();
const editProfileAvatarValidator = new FormValidator(validationConfig, popupEditAvatarForm);
editProfileAvatarValidator.enableValidation();

// Слушатель на редактирования профиля
buttonEditProfile.addEventListener('click', function () {
  editePopupWithForm.open();
  const actualUserInfo = userInfo.getUserInfo();
  nameInputProfile.setAttribute('value', actualUserInfo.username);
  jobInputProfile.setAttribute('value', actualUserInfo.description);
  editProfileFormValidator.removeValidationErrors();
  editProfileFormValidator.disableButton();
});

// Слушатель на добавление карточки
buttonAddCard.addEventListener('click', function () {
  addCardPopupWithForm.open();
  addCardFormValidator.removeValidationErrors();
  addCardFormValidator.disableButton();
});

// Слушатель на аву
iconAvatarEdit.addEventListener('click', function () {
  popupEditeAvatar.open();
  editProfileAvatarValidator.disableButton();
  editProfileAvatarValidator.removeValidationErrors();
});