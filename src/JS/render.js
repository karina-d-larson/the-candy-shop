import { formatItemPrice, getItemImagePath } from "./utils.js";

const PLACEHOLDER = "/images/placeholder.svg";

function imageOnErrorAttr() {
  return `onerror="this.onerror=null;this.src='${PLACEHOLDER}'"`;
}

export function renderItemCard(item) {
  return `
    <article class="product-card" data-item-id="${item.id}" tabindex="0" aria-label="${item.name}, ${formatItemPrice(item.price)}">
      <div class="product-card__image-wrap wireframe-crosshatch">
        <img src="${getItemImagePath(item.image)}" alt="${item.name}" ${imageOnErrorAttr()} />
        <span class="product-card__badge">${item.category}</span>
      </div>
      <div class="product-card__body">
        <div class="product-card__header">
          <h2 class="product-card__title">${item.name}</h2>
          <span class="product-card__price">${formatItemPrice(item.price)}</span>
        </div>
        <p class="product-card__description">${item.shortDescription}</p>
        <button type="button" class="btn btn--primary product-card__link" data-open-item="${item.id}">
          View Details
        </button>
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
        <img src="${getItemImagePath(item.image)}" alt="${item.name}" ${imageOnErrorAttr()} />
        <button
          type="button"
          class="favorite-card__remove"
          data-remove-favorite="${item.id}"
          aria-label="Remove ${item.name} from favorites"
        >
          <span class="material-symbols-outlined" aria-hidden="true">delete</span>
        </button>
      </div>
      <div class="favorite-card__header">
        <h2 class="favorite-card__title">${item.name}</h2>
        <span class="chip">${item.category}</span>
      </div>
      <p class="text-muted">${item.shortDescription}</p>
      <div class="favorite-card__footer">
        <span class="label-caps text-muted">Cost</span>
        <span class="favorite-card__price">${formatItemPrice(item.price)}</span>
      </div>
      <a class="btn btn--primary product-card__link" href="/?id=${encodeURIComponent(item.id)}">
        View Details
      </a>
    </article>
  `;
}

export function renderOrderSummaryItem(item) {
  return `
    <div class="summary-item">
      <div class="summary-item__thumb wireframe-crosshatch">
        <img src="${getItemImagePath(item.image)}" alt="${item.name}" ${imageOnErrorAttr()} />
      </div>
      <div class="summary-item__body">
        <div class="summary-item__header">
          <h2 class="summary-item__name">${item.name}</h2>
          <span>${formatItemPrice(item.price)}</span>
        </div>
        <span class="summary-item__tag">${item.category}</span>
      </div>
    </div>
  `;
}
