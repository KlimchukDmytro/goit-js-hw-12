export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(
      (image) => `
        <li class="gallery-item">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}