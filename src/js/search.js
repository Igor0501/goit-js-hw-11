// хрестик для очищення форми
const searchInput = document.getElementById('searchInput');
const clearButton = document.getElementById('clearButton');

clearButton.addEventListener('click', function() {
  searchInput.value = '';
});

searchInput.addEventListener('input', function() {
  clearButton.style.display = searchInput.value ? 'block' : 'none';
});


// приховання лого

const bodyElement = document.getElementById('body');
const searchForm = document.getElementById('search-form');

function changeBackground(imageUrl) {
  bodyElement.style.backgroundImage = `url(${imageUrl})`;
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value;
  changeBackground(searchTerm);
  searchInput.value = ''; 
});
