// @todo: DOM узлы
const content = document.querySelector('.content');
const cardsList = content.querySelector('.places__list');

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
const createCard = (cardLink, cardName, deleteCardCallback) => {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardItem.querySelector('.card__delete-button');
  cardItem.querySelector('.card__image').src = cardLink;
  cardItem.querySelector('.card__title').textContent = cardName;
  deleteButton.addEventListener('click', deleteCardCallback);
  return cardItem;
};

// Функция вставки карточки в разметку
const addCard = (item) => {
  const cardItem = createCard(item.link, item.name, deleteCardCallback);
  cardsList.append(cardItem);
};

// @todo: Функция удаления карточки
const deleteCardCallback = (evt) => {
  evt.target.closest('.card').remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  addCard(item, deleteCardCallback);
});
