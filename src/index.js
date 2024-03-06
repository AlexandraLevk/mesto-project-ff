import "./pages/index.css";
import { createCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { validationConfig, enableValidation, clearValidation } from "./components/validation.js";
import {
  getUserData,
  getInitialCards,
  editUserData,
  addNewCard,
  changeAvatar,
} from "./components/api.js";
import { renderLoading } from "./components/utils.js";

// DOM узлы
const content = document.querySelector(".content");
const cardsList = content.querySelector(".places__list");
const profileEditButton = content.querySelector(".profile__edit-button");
const profileTitle = content.querySelector(".profile__title");
const profileDescription = content.querySelector(".profile__description");
const profileAddButton = content.querySelector(".profile__add-button");
const profileAvatar = content.querySelector(".profile__image");

const popups = document.querySelectorAll(".popup");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const profileForm = document.forms["edit-profile"];
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_description");

const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const newCardForm = document.forms["new-place"];
const newCardName = newCardForm.querySelector(".popup__input_type_card-name");
const newCardLink = newCardForm.querySelector(".popup__input_type_url");

const popupTypeEditAvatar = document.querySelector(".popup_type_edit-avatar");
const avatarForm = document.forms["edit-avatar"];
const newAvatarLink = avatarForm.querySelector(".popup__input_type_url");

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

// Включение валидации всех форм
enableValidation(validationConfig);

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
  evt.preventDefault();
  renderLoading(true, evt.submitter);
  editUserData(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(popupTypeEdit);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(`Ошибка при редактировании данных профиля: ${err}`);
    })
    .finally((res) => {
      renderLoading(false, evt.submitter);
    });
}

// Добавление новой карточки
function handleNewCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt.submitter);
  addNewCard(newCardName.value, newCardLink.value)
    .then((res) => {
      const newCard = createCard(res, res.owner._id, openImageCallback);
      cardsList.prepend(newCard);
      closePopup(popupTypeNewCard);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(`Ошибка при добавлении карточки: ${err}`);
    })
    .finally((res) => {
      renderLoading(false, evt.submitter);
    });
}

// Редактирование аватара
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt.submitter);
  changeAvatar(newAvatarLink.value)
    .then((res) => {
      profileAvatar.style = `background-image: url(${res.avatar})`;
      closePopup(popupTypeEditAvatar);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении аватара: ${err}`);
    })
    .finally((res) => {
      renderLoading(false, evt.submitter);
    });
}

// Слушатель на открытие попапа редактирования профиля
profileEditButton.addEventListener("click", function (evt) {
  clearValidation(profileForm, validationConfig);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
});

// Слушатель на открытие попапа новой карточки
profileAddButton.addEventListener("click", function () {
  newCardName.value = "";
  newCardLink.value = "";
  clearValidation(newCardForm, validationConfig);
  openPopup(popupTypeNewCard);
});

// Слушатель на открытие попапа смены аватара
profileAvatar.addEventListener("click", function () {
  newAvatarLink.value = "";
  clearValidation(avatarForm, validationConfig);
  openPopup(popupTypeEditAvatar);
});

// Слушатели на отправку данных
profileForm.addEventListener("submit", handleFormSubmit);
newCardForm.addEventListener("submit", handleNewCardSubmit);
avatarForm.addEventListener("submit", handleAvatarSubmit);

// Слушатели на закрытие попапов
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_is-opened")) {
      closePopup(popup);
    } else if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

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