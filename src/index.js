import './pages/index.css'; 
import { initialCards } from './components/cards.js';
import { createCard, openImageCallback, likeCardCallback, deleteCardCallback } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';


// DOM узлы
const content = document.querySelector('.content');
const cardsList = content.querySelector('.places__list');
const profileEditButton = content.querySelector('.profile__edit-button');
const profileAddButton = content.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const formElement = popupTypeEdit.querySelector('form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description'); 
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const newCardForm = popupTypeNewCard.querySelector('form');
const newCardName = newCardForm.querySelector('.popup__input_type_card-name');
const newCardLink = newCardForm.querySelector('.popup__input_type_url');

// Функция вставки карточки в разметку
const addCard = (item) => {
  const cardItem = createCard(item.link, item.name, openImageCallback, likeCardCallback, deleteCardCallback);
  cardsList.append(cardItem);
};

// Вывести карточки на страницу
initialCards.forEach((item) => {
  addCard(item, openImageCallback, likeCardCallback, deleteCardCallback);
});

// Слушатели на открытие попапов
profileEditButton.addEventListener('click', function (evt) {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent;
  openPopup(popupTypeEdit);
}); 

profileAddButton.addEventListener('click', function () {
  openPopup(popupTypeNewCard);
}); 

// Редактирование имени и информации о себе
function handleFormSubmit(evt) {
  evt.preventDefault();
  document.querySelector('.profile__title').textContent = nameInput.value;
  document.querySelector('.profile__description').textContent = jobInput.value;
  closePopup(popupTypeEdit);
}

formElement.addEventListener('submit', handleFormSubmit); 

// Форма добавления карточки
function handleNewCardSubmit(evt) {
  evt.preventDefault(); 
  const newCard = createCard(newCardLink.value, newCardName.value, openImageCallback, likeCardCallback, deleteCardCallback);
  cardsList.prepend(newCard);
  closePopup(popupTypeNewCard);
  newCardLink.value = '';
  newCardName.value = '';
}

newCardForm.addEventListener('submit', handleNewCardSubmit); 
