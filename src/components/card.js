import { toggleLike, deleteCard } from "./api.js";

// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// Функция создания карточки
const createCard = (card, myId, openImageCallback) => {
  const cardItem = cardTemplate.querySelector(".card").cloneNode(true);
  const deleteButton = cardItem.querySelector(".card__delete-button");
  const likeButton = cardItem.querySelector(".card__like-button");
  const cardImage = cardItem.querySelector(".card__image");
  const likeCounter = cardItem.querySelector(".card__like-counter");
  cardImage.alt = card.name;
  cardImage.src = card.link;
  cardItem.querySelector(".card__title").textContent = card.name;

  const renderLikes = (likes) => {
    if (likes.length > 0) {
      likeCounter.textContent = likes.length;
    } else {
      likeCounter.textContent = "";
    }
    if (likes.some((user) => user._id === myId)) {
      likeButton.classList.add("card__like-button_is-active");
    } else {
      likeButton.classList.remove("card__like-button_is-active");
    }
  };
  renderLikes(card.likes);

  likeButton.addEventListener("click", () => {
    toggleLike(
      card._id,
      likeButton.classList.contains("card__like-button_is-active")
    )
      .then((res) => {
        renderLikes(res.likes);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  });

  if (card.owner._id === myId) {
    deleteButton.classList.add("card__delete-button_active");
    deleteButton.addEventListener("click", (evt) => {
      evt.target.closest(".card").remove();
      deleteCard(card._id).catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    });
  }

  cardImage.addEventListener("click", openImageCallback);
  return cardItem;
};

export { createCard };