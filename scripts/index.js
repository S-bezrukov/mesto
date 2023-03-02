let page = document.querySelector('.page');
let popup = page.querySelector('.popup');
let popupImage = popup.querySelector('.popup__image');
let mainContent = document.querySelector('.content');
let profileEditButton = mainContent.querySelector('.profile__edit-button');
let formElement = popup.querySelector('.form');
let nameInput = formElement.querySelector('.form__input_type_name');
let jobInput = formElement.querySelector('.form__input_type_job');
let profileTitle = mainContent.querySelector('.profile__title');
let profileDescription = mainContent.querySelector('.profile__description');

function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.setAttribute('placeholder', profileTitle.textContent);
  jobInput.setAttribute('placeholder', profileDescription.textContent);
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

profileEditButton.addEventListener('click', popupOpen);
popupImage.addEventListener('click', popupClose);

function handleFormSubmit (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupClose();
}

formElement.addEventListener('submit', handleFormSubmit);