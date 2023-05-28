import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages, PER_PAGE } from "./js/fetchImages";
import { Notify } from "notiflix";

const refs = {
  inputElem: document.querySelector('input'),
  searchButton: document.querySelector('button'),
  formElem: document.querySelector('form'),
  gallery: document.querySelector('.gallery'),
  anchor: document.querySelector('.anchor')
};

let page = 0;
let searchRequest = "";

let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  })

refs.formElem.addEventListener('submit', OnSubmit);

const observer = new IntersectionObserver(OnObserve, {rootMargin: '0px'});

function OnSubmit (e) {
    e.preventDefault();
    refs.gallery.innerHTML = "";
    page = 1;
    observer.unobserve(refs.anchor)
    searchRequest = refs.inputElem.value.trim();
   if (searchRequest !== ''){
    fetchImages(searchRequest, page)
    .then(response => {
        response.data.hits.forEach(image => makeBreakdown(image));
        if(response.data.totalHits > 0){
            Notify.success(`Victory! We found ${response.data.totalHits} images.`)
        }
        else {
            Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        }
        })
    .catch((error => console.log(error)))
    .finally(()=> {
        observer.observe(refs.anchor);
        lightbox.refresh();
        window.scrollBy({
            top: 60,
            behavior: "smooth",
  });
})
   }
   else {
    Notify.info(`Please provide us with some information to help us determine your preferred search criteria.`)
   }
}

function OnObserve (entries) {
    entries.forEach(entry => {
        if(entry.isIntersecting === true){
            page += 1
            fetchImages(searchRequest, page).then(response => {
                response.data.hits.forEach((image) => makeBreakdown(image))
                if(page === Math.ceil(response.data.totalHits / PER_PAGE)) {
                    observer.unobserve(refs.anchor)
                    Notify.info(`We're sorry, but you've reached the end of search results.` )
                }
                if (response.data.totalHits !== 0){
                  smoothScroll(refs.gallery, 2)
                }
            })
            .catch(error => console.log(error))
            .finally(() => {
                lightbox.refresh();
            })
        }
    })
    
}

function makeBreakdown ({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) {
    
    const markup = `<div class="photo-card">
    <div class="image-wrapper"><a href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" /></a></div>
    <div class="info">
      <p class="info-item"><b>Likes </b> </br>${likes}</p>
      <p class="info-item"><b>Views</b></br>${views}</p>
      <p class="info-item"><b>Comments</b></br>${comments}</p>
      <p class="info-item"><b>Downloads</b></br>${downloads}</p>
    </div>
  </div>`;
  return refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function smoothScroll(element, increment) {
    const { height: cardHeight } = element.firstElementChild?.getBoundingClientRect();
      window.scrollBy({top: cardHeight * increment, behavior: "smooth",
    });
}