const mainContent = document.querySelector('.content');
const buttonEditProfile = mainContent.querySelector('.profile__edit-button');
const buttonAddCard = mainContent.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_edit_profile');
const formEditProfile = popupEditProfile.querySelector('.form_edit_profile');
const nameInputProfile = formEditProfile.querySelector('.form__input_type_name');
const jobInputProfile = formEditProfile.querySelector('.form__input_type_job');
const page = document.querySelector('.page');
const popupAddCard = page.querySelector('.popup_add_card');
const formAddCard = popupAddCard.querySelector('.form_add_card');

export { buttonEditProfile, formAddCard, formEditProfile, nameInputProfile, jobInputProfile, buttonAddCard };