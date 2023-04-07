const page = document.querySelector('.page');
const mainContent = document.querySelector('.content');
const buttonEditProfile = mainContent.querySelector('.profile__edit-button');
const buttonAddCard = mainContent.querySelector('.profile__add-button');
const profileDescription = mainContent.querySelector('.profile__description');
const elementsContainer = mainContent.querySelector('.elements__list');
const profileTitle = mainContent.querySelector('.profile__title');
// попап карточки
const popupAddCard = page.querySelector('.popup_add_card');
const popupCardInputs = popupAddCard.querySelectorAll('.form__input');
const formAddCard = popupAddCard.querySelector('.form_add_card');
const formButtonCreate = popupAddCard.querySelector('.form__submit-btn_action_create');
// попап профиля
const popupEditProfile = document.querySelector('.popup_edit_profile');
const popupProfileInputs = popupEditProfile.querySelectorAll('.form__input');
const formEditProfile = popupEditProfile.querySelector('.form_edit_profile');
const formButtonProfille = popupEditProfile.querySelector('.form__submit-btn_action_add');


const popupZoomCard = page.querySelector('.popup_zoom_card');
const buttonImageEditProfile = page.querySelector('.popup__image_edit_profile');
const buttonImageAddCard = page.querySelector('.popup__image_add_card');
const buttonImageZoomCard = page.querySelector('.popup__image_zoom_card');
const elementTemplate = page.querySelector('.element_template').content;
const elementText = page.querySelector('.elements__text');
const popupImagePlace = page.querySelector('.popup__image-place');
const popupTitlePlace = page.querySelector('.popup__title-place');
const elementImage = page.querySelector('.elements__image');
const placeInputCard = formAddCard.querySelector('.form__input_type_place');
const imageInputCard = formAddCard.querySelector('.form__input_type_photo');
const nameInputProfile = formEditProfile.querySelector('.form__input_type_name');
const jobInputProfile = formEditProfile.querySelector('.form__input_type_job');
const formInputs = document.querySelectorAll('.form__input');
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
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupEsc)
  popup.addEventListener('click', closePopupOverlay)
}

// Закрываем попап
const closePopup = function (popup) {
  popup.classList.remove('popup_opened')
  document.removeEventListener('keydown', closePopupEsc)
  popup.removeEventListener('click', closePopupOverlay)
}

const openProfilePopup = function() {
  enableButton (formButtonProfille, {inactiveButtonClass:validationConfig.inactiveButtonClass, activeButtonClass:validationConfig.activeButtonClass});
  removeValidationErrors(popupProfileInputs, validationConfig);
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
  removeValidationErrors(popupCardInputs, validationConfig);
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
  disableButton(formButtonCreate, {inactiveButtonClass:validationConfig.inactiveButtonClass, activeButtonClass:validationConfig.activeButtonClass});
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