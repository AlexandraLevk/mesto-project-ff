import "./pages/index.css";
import { createCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserData,
  getInitialCards,
  editUserData,
  addNewCard,
  changeAvatar,
} from "./components/api.js";

// DOM узлы
const content = document.querySelector(".content");
const cardsList = content.querySelector(".places__list");
const profileEditButton = content.querySelector(".profile__edit-button");
const profileTitle = content.querySelector(".profile__title");
const profileDescription = content.querySelector(".profile__description");
const profileAddButton = content.querySelector(".profile__add-button");
const profileAvatar = content.querySelector(".profile__image");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileForm = popupTypeEdit.querySelector("form");
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_description");
const submitProfileDataButton = profileForm.querySelector(".popup__button");

const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const newCardForm = popupTypeNewCard.querySelector("form");
const newCardName = newCardForm.querySelector(".popup__input_type_card-name");
const newCardLink = newCardForm.querySelector(".popup__input_type_url");
const submitNewCardButton = newCardForm.querySelector(".popup__button");

const popupTypeEditAvatar = document.querySelector(".popup_type_edit-avatar");
const avatarForm = popupTypeEditAvatar.querySelector("form");
const newAvatarLink = avatarForm.querySelector(".popup__input_type_url");
const submitNewAvatarButton = avatarForm.querySelector(".popup__button");

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

// Включение валидации всех форм
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

// Колбэк открытия изображения по клику
const openImageCallback = (evt) => {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openPopup(popupTypeImage);
};

// Функция вставки карточки в разметку
const addCard = (item, myId, openImageCallback) => {
  const cardItem = createCard(item, myId, openImageCallback);
  cardsList.append(cardItem);
};

// Редактирование имени и информации о себе
function handleFormSubmit(evt) {
  renderProfileDataLoading(true);
  editUserData(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
    })
    .catch((err) => {
      console.log(`Ошибка при редактировании данных профиля: ${err}`);
    })
    .finally((res) => {
      renderProfileDataLoading(false);
    });
  closePopup(popupTypeEdit);
  evt.target.reset();
}

// Добавление новой карточки
function handleNewCardSubmit(evt) {
  renderNewCardLoading(true);
  addNewCard(newCardName.value, newCardLink.value)
    .then((res) => {
      const newCard = createCard(res, res.owner._id, openImageCallback);
      cardsList.prepend(newCard);
    })
    .catch((err) => {
      console.log(`Ошибка при добавлении карточки: ${err}`);
    })
    .finally((res) => {
      renderNewCardLoading(false);
    });
  closePopup(popupTypeNewCard);
  evt.target.reset();
}

// Редактирование аватара
function handleAvatarSubmit(evt) {
  renderNewAvatarLoading(true);
  changeAvatar(newAvatarLink.value)
    .then((res) => {
      profileAvatar.style = `background-image: url(${res.avatar})`;
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении аватара: ${err}`);
    })
    .finally((res) => {
      renderNewAvatarLoading(false);
    });
  closePopup(popupTypeEditAvatar);
}

// Уведомление пользователя о процессе отправки данных
function renderProfileDataLoading(isLoading) {
  if (isLoading) {
    submitProfileDataButton.textContent = "Сохранение...";
  } else {
    submitProfileDataButton.textContent = "Сохранить";
  }
}
function renderNewCardLoading(isLoading) {
  if (isLoading) {
    submitNewCardButton.textContent = "Сохранение...";
  } else {
    submitNewCardButton.textContent = "Сохранить";
  }
}
function renderNewAvatarLoading(isLoading) {
  if (isLoading) {
    submitNewAvatarButton.textContent = "Сохранение...";
  } else {
    submitNewAvatarButton.textContent = "Сохранить";
  }
}

// Слушатель на открытие попапа редактирования профиля
profileEditButton.addEventListener("click", function (evt) {
  clearValidation(profileForm);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
});

// Слушатель на открытие попапа новой карточки
profileAddButton.addEventListener("click", function () {
  clearValidation(newCardForm);
  newCardName.value = "";
  newCardLink.value = "";
  openPopup(popupTypeNewCard);
});

// Слушатель на открытие попапа смены аватара
profileAvatar.addEventListener("click", function () {
  clearValidation(avatarForm);
  newAvatarLink.value = "";
  openPopup(popupTypeEditAvatar);
});

// Слушатели на отправку данных
profileForm.addEventListener("submit", handleFormSubmit);
newCardForm.addEventListener("submit", handleNewCardSubmit);
avatarForm.addEventListener("submit", handleAvatarSubmit);

// Загрузка информации о пользователе и загрузка карточек с сервера
Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style = `background-image: url(${userData.avatar})`;
    const myId = userData._id;
    cards.forEach((item) => {
      addCard(item, myId, openImageCallback);
    });
  })
  .catch((err) => {
    console.log(
      `Ошибка при загрузке карточек и информации о пользователе: ${err}`
    );
  });