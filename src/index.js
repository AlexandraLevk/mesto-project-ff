import './pages/index.css'; 
import { initialCards } from './components/cards.js';
import { createCard, likeCardCallback, deleteCardCallback } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';

// DOM узлы
const content = document.querySelector('.content');
const cardsList = content.querySelector('.places__list');
const profileEditButton = content.querySelector('.profile__edit-button');
const profileTitle = content.querySelector('.profile__title');
const profileDescription = content.querySelector('.profile__description');
const profileAddButton = content.querySelector('.profile__add-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const formElement = popupTypeEdit.querySelector('form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description'); 
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const newCardForm = popupTypeNewCard.querySelector('form');
const newCardName = newCardForm.querySelector('.popup__input_type_card-name');
const newCardLink = newCardForm.querySelector('.popup__input_type_url');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');


// Колбэк открытия изображения по клику
const openImageCallback = (evt) => {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openPopup(popupTypeImage);
}

// Функция вставки карточки в разметку
const addCard = (item) => {
  const cardItem = createCard(item.link, item.name, likeCardCallback, deleteCardCallback, openImageCallback);
  cardsList.append(cardItem);
};

// Вывести карточки на страницу
initialCards.forEach((item) => {
  addCard(item);
});

// Слушатели на открытие попапов
profileEditButton.addEventListener('click', function (evt) {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
}); 

profileAddButton.addEventListener('click', function () {
  openPopup(popupTypeNewCard);
}); 

// Редактирование имени и информации о себе
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(popupTypeEdit);
}

formElement.addEventListener('submit', handleFormSubmit); 

// Форма добавления карточки
function handleNewCardSubmit(evt) {
  evt.preventDefault(); 
  const newCard = createCard(newCardLink.value, newCardName.value, likeCardCallback, deleteCardCallback, openImageCallback);
  cardsList.prepend(newCard);
  closePopup(popupTypeNewCard);
  evt.target.reset();
}

newCardForm.addEventListener('submit', handleNewCardSubmit); 
