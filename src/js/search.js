// хрестик для очищення форми
const searchInput = document.getElementById('searchInput');
const clearButton = document.getElementById('clearButton');

clearButton.addEventListener('click', function() {
  searchInput.value = ''; // Очищення інпуту
  clearSearchResult(); // Очищення знайденого результату пошуку
});