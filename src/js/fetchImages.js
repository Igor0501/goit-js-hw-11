import axios from "axios";

const BASE_URL = `https://pixabay.com/api/`;
const PER_PAGE = 40;

async function fetchImages (name, page) {
    const modName = name.split(' ').join('+');
  
    return await axios.get(`${BASE_URL}`, {
    params: {
        key: `14552981-4359646d216bdfcccd9ecbf49`,
        q: modName,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: PER_PAGE,
        page,
    }
   })
}

export {fetchImages, PER_PAGE}