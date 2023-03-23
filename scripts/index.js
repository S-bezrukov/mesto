const page = document.querySelector('.page');
let popup = page.querySelector('.popup');
let popupAddButton = page.querySelector('.popup_add_card');
let popupEditProfile = page.querySelector('.popup_edit_profile');
let popupZoomCard = page.querySelector('.popup_zoom_card');
let popupImageEditProfile = page.querySelector('.popup__image_edit_profile');
let popupImageAddCard = page.querySelector('.popup__image_add_card');
let popupImageZoomCard = page.querySelector('.popup__image_zoom_card');
let mainContent = document.querySelector('.content');
let profileEditButton = mainContent.querySelector('.profile__edit-button');
let profileAddButton = mainContent.querySelector('.profile__add-button');
let formEditProfile = popup.querySelector('.form_edit_profile');
let nameInput = formEditProfile.querySelector('.form__input_type_name');
let jobInput = formEditProfile.querySelector('.form__input_type_job');
let profileTitle = mainContent.querySelector('.profile__title');
let profileDescription = mainContent.querySelector('.profile__description');
let initialCards = [
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
const elementTemplate = document.querySelector('.element_template').content;
const elementsList = document.querySelector('.elements__list');
let formAddCard = document.querySelector('.form_add_card');
let placeInput = formAddCard.querySelector('.form__input_type_place');
let photoInput = formAddCard.querySelector('.form__input_type_photo');
let elementText = document.querySelector('.elements__text');
let popupImagePlace = document.querySelector('.popup__image-place');
let popupTitlePlace = document.querySelector('.popup__title-place');
let elementImage = document.querySelector('.elements__image');

// Открываем попап
const open = function (popup) {
  popup.classList.add('popup_opened');
}

// Закрываем попап
const close = function (popup) {
  popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', function() {
  open(popupEditProfile); 
})

profileAddButton.addEventListener('click', function() {
  open(popupAddButton); 
})

function closeZoomCard() {
  open(popupZoomCard); 
}

popupImageEditProfile.addEventListener('click', function() {
  close(popupEditProfile); 
})

popupImageAddCard.addEventListener('click', function() {
  close(popupAddButton); 
})

popupImageZoomCard.addEventListener('click', function() {
  close(popupZoomCard); 
})

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

// Отправка формы редактирования профиля
function handleFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  close(popupEditProfile);
}

formEditProfile.addEventListener('submit', handleFormSubmit);

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
  closeZoomCard();
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
  elementsList.append(cardElement);
}

// Добавляем начальные карточки
initialCards.forEach(card => { renderCard(card); });

// Добавляем новую карточку
function handleAddSubmit (evt) {
  evt.preventDefault();
  const newCard = createCard({
    name: placeInput.value,
    link: photoInput.value
  });
  elementsList.prepend(newCard);
  evt.target.reset();
  close(popupAddButton);
}

formAddCard.addEventListener('submit', handleAddSubmit);