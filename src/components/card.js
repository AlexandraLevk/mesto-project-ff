import { openPopup } from './modal.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const popupTypeImage = document.querySelector('.popup_type_image');

// Функция создания карточки
const createCard = (cardLink, cardName, openImageCallback, likeCardCallback, deleteCardCallback) => {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const likeButton = cardItem.querySelector('.card__like-button')
  cardItem.querySelector('.card__image').src = cardLink;
  cardItem.querySelector('.card__image').alt = cardName;
  cardItem.querySelector('.card__title').textContent = cardName;
  cardItem.querySelector('.card__image').addEventListener('click', openImageCallback);
  deleteButton.addEventListener('click', deleteCardCallback);
  likeButton.addEventListener('click', likeCardCallback);
  return cardItem;
};

// Колбэк открытия изображения по клику
const openImageCallback = (evt) => {
  popupTypeImage.querySelector('.popup__image').src = evt.target.src;
  popupTypeImage.querySelector('.popup__image').alt = evt.target.alt;
  popupTypeImage.querySelector('.popup__caption').textContent = evt.target.alt;
  openPopup(popupTypeImage);
}

// Колбэк лайка карточки
const likeCardCallback = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
};

// Функция удаления карточки
const deleteCardCallback = (evt) => {
  evt.target.closest('.card').remove();
};

export { createCard, openImageCallback, likeCardCallback, deleteCardCallback }; 