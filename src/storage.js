function saveToStorage(item, value) {
  localStorage.setItem(item, JSON.stringify(value));
}

function getFromStorage(item) {
  return JSON.parse(localStorage.getItem(item));
}

export { saveToStorage, getFromStorage };
