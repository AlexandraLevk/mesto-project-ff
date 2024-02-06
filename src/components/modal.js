const popupCloseButtons = document.querySelectorAll('.popup__close');

// Открытие попапов
function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEscape);
  popupElement.addEventListener('click', closeByOverlay);
}

// Закрытие попапов
function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
}

// Слушатели на закрытие попапов
popupCloseButtons.forEach((closeButton) => {
  closeButton.addEventListener('click', function (evt) {
    closePopup(evt.target.closest('.popup'));
  });
});

function closeByEscape(evt) {
  const popupActive = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
    closePopup(popupActive);
  };
};

function closeByOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.target.closest('.popup'));
  }
};

export { openPopup, closePopup }; 