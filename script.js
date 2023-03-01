let page = document.querySelector('.page');
let popup = page.querySelector('.popup');
let popupImage = popup.querySelector('.popup__form .popup__image');
let content = document.querySelector('.content');
let profileEditButton = content.querySelector('.profile .profile__info .profile__edit-button');

function popupOpen() {
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', popupOpen);
popupImage.addEventListener('click', popupClose);

// Находим форму в DOM
let formElement = popup.querySelector('.popup__form');

// Находим поля формы в DOM
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_job');

function handleFormSubmit (evt) {
    evt.preventDefault();
    let profileTitle = content.querySelector('.profile .profile__info .profile__title');
    let profileDescription = content.querySelector('.profile .profile__info .profile__description');
    // Вставляем новые значения
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupClose();
}

formElement.addEventListener('submit', handleFormSubmit);