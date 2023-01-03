import { galleryItems } from "./gallery-items.js";

const galleryEl = document.querySelector(".gallery");

let basicLightboxInstance = null;

const onCloseModal = (e) => {
  if (e.code !== "Escape") return;

  basicLightboxInstance.close();

  document.removeEventListener("keydown", onCloseModal);
};

const onImageClick = (e) => {
  e.preventDefault();

  basicLightboxInstance = basicLightbox.create(`
      <div class="modal">
          <img src="${e.target.dataset.source}" alt="${e.target.alt}"/>
      </div>
  `);

  basicLightboxInstance.show();

  document.addEventListener("keydown", onCloseModal);
};

const itemMarkup = galleryItems
  .map(({ preview, description, original }) => {
    return `<div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
  })
  .join("");
galleryEl.insertAdjacentHTML("beforeend", itemMarkup);

galleryEl.addEventListener("click", onImageClick);
