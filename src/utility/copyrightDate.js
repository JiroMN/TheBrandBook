export function initLiveDate() {
  const liveDateElement = document.querySelectorAll("[data-live-date]");
  const date = new Date();
  const year = date.getFullYear();

  liveDateElement.forEach((elem) => {
    elem.textContent = year;
  });
}
