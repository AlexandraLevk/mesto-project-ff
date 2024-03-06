

// Открытие попапов
function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

// Закрытие попапов
function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const popupActive = document.querySelector(".popup_is-opened");
    closePopup(popupActive);
  }
}

export { openPopup, closePopup };
