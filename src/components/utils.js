// Уведомление пользователя о процессе отправки данных
export function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}