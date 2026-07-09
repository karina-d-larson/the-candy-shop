import { formatItemPrice, getItemImagePath } from "./utils.js";

export function renderItemCard(item) {
  return `
    <article class="product-card" data-item-id="${item.id}">
      <div class="product-card__image-wrap wireframe-crosshatch">
        <img src="${getItemImagePath(item.image)}" alt="${item.name}" />
        <span class="product-card__badge">${item.category}</span>
      </div>
      <div class="product-card__body">
        <div class="product-card__header">
          <h3 class="product-card__title">${item.name}</h3>
          <span class="product-card__price">${formatItemPrice(item.price)}</span>
        </div>
        <p class="product-card__description">${item.shortDescription}</p>
        <a
          href="/pages/product.html?id=${encodeURIComponent(item.id)}"
          class="btn btn--primary product-card__link"
        >
          View Details
        </a>
      </div>
    </article>
  `;
}

export function renderItemCards(items, container) {
  container.innerHTML = items.map((item) => renderItemCard(item)).join("");
}

export function renderFavoriteCard(item) {
  return `
    <article class="favorite-card" data-item-id="${item.id}">
      <div class="favorite-card__image-wrap wireframe-crosshatch">
        <img src="${getItemImagePath(item.image)}" alt="${item.name}" />
        <button
          type="button"
          class="favorite-card__remove"
          data-remove-favorite="${item.id}"
          aria-label="Remove ${item.name} from favorites"
        >
          <span class="material-symbols-outlined">delete</span>
        </button>
      </div>
      <div class="favorite-card__header">
        <h3 class="favorite-card__title">${item.name}</h3>
        <span class="chip">${item.category}</span>
      </div>
      <p class="text-muted">${item.shortDescription}</p>
      <div class="favorite-card__footer">
        <span class="label-caps text-muted">Price</span>
        <span class="favorite-card__price">${formatItemPrice(item.price)}</span>
      </div>
    </article>
  `;
}

export function renderOrderSummaryItem(item) {
  return `
    <div class="summary-item">
      <div class="summary-item__thumb wireframe-crosshatch">
        <img src="${getItemImagePath(item.image)}" alt="${item.name}" />
      </div>
      <div class="summary-item__body">
        <div class="summary-item__header">
          <h4>${item.name}</h4>
          <span>${formatItemPrice(item.price)}</span>
        </div>
        <span class="summary-item__tag">${item.category}</span>
      </div>
    </div>
  `;
}
