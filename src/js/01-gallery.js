import SimpleLightbox from 'simplelightbox';
import { galleryItems } from './gallery-items.js';

import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      // const { preview, original, description } = item;
      return `<li class="gallery__item">
                <a class="gallery__link" href=${original}>
                  <img class="gallery__image" src=${preview} alt=${description} />
                </a>
              </li>`;
    })
    .join('');
}

const galleryMarkup = createGalleryMarkup(galleryItems);

galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);

new SimpleLightbox('.gallery .gallery__link', {
  overlayOpacity: 0.8,
  captionsData: 'alt',
  captionDelay: 250,
});
