// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
const createCard = (cardLink, cardName, likeCardCallback, deleteCardCallback, openImageCallback) => {
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const likeButton = cardItem.querySelector('.card__like-button');
  const cardImage = cardItem.querySelector('.card__image');
  cardImage.src = cardLink;
  cardImage.alt = cardName;
  cardItem.querySelector('.card__title').textContent = cardName;
  likeButton.addEventListener('click', likeCardCallback);
  deleteButton.addEventListener('click', deleteCardCallback);
  cardImage.addEventListener('click', openImageCallback);
  return cardItem;
};

// Колбэк лайка карточки
const likeCardCallback = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
};

// Функция удаления карточки
const deleteCardCallback = (evt) => {
  evt.target.closest('.card').remove();
};

export { createCard, likeCardCallback, deleteCardCallback }; 