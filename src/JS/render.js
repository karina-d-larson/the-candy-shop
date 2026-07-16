import { formatItemPrice, getItemImagePath } from "./utils.js";

const PLACEHOLDER = "/images/placeholder.svg";

function imageOnErrorAttr() {
  return `onerror="this.onerror=null;this.src='${PLACEHOLDER}'"`;
}

function imageAttrs() {
  return `width="512" height="512" loading="lazy" decoding="async" ${imageOnErrorAttr()}`;
}

export function renderItemCard(item) {
  return `
    <article class="product-card" data-item-id="${item.id}">
      <button
        type="button"
        class="product-card__trigger"
        data-open-item="${item.id}"
        aria-label="View details for ${item.name}"
      >
        <span class="product-card__image-wrap wireframe-crosshatch">
          <img src="${getItemImagePath(item.image)}" alt="" ${imageAttrs()} />
          <span class="product-card__badge">${item.category}</span>
        </span>
        <span class="product-card__body">
          <span class="product-card__header">
            <span class="product-card__title">${item.name}</span>
            <span class="product-card__price">${formatItemPrice(item.price)}</span>
          </span>
          <span class="product-card__description">${item.shortDescription}</span>
          <span class="product-card__cta btn btn--primary product-card__link">View Details</span>
        </span>
      </button>
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
        <img src="${getItemImagePath(item.image)}" alt="${item.name}" ${imageAttrs()} />
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

export function renderCartItem(item, quantity) {
  return `
    <article class="cart-item" data-item-id="${item.id}">
      <div class="cart-item__image-wrap wireframe-crosshatch">
        <img src="${getItemImagePath(item.image)}" alt="${item.name}" ${imageAttrs()} />
      </div>
      <div class="cart-item__body">
        <div class="cart-item__header">
          <h2 class="cart-item__title">${item.name}</h2>
          <span class="chip">${item.category}</span>
        </div>
        <p class="cart-item__cost"><span class="label-caps text-muted">Cost</span> ${formatItemPrice(item.price)}</p>
        <div class="cart-item__controls">
          <div class="qty-control" role="group" aria-label="Quantity for ${item.name}">
            <button type="button" class="qty-control__btn" data-cart-action="decrease" data-item-id="${item.id}" aria-label="Decrease quantity of ${item.name}">−</button>
            <span class="qty-control__value" aria-live="polite">${quantity}</span>
            <button type="button" class="qty-control__btn" data-cart-action="increase" data-item-id="${item.id}" aria-label="Increase quantity of ${item.name}">+</button>
          </div>
          <button type="button" class="btn btn--text" data-cart-action="remove" data-item-id="${item.id}" aria-label="Remove ${item.name} from cart">
            Remove
          </button>
        </div>
      </div>
    </article>
  `;
}

export function renderOrderSummaryItem(item, quantity = 1) {
  return `
    <div class="summary-item">
      <div class="summary-item__thumb wireframe-crosshatch">
        <img src="${getItemImagePath(item.image)}" alt="${item.name}" ${imageAttrs()} />
      </div>
      <div class="summary-item__body">
        <div class="summary-item__header">
          <h2 class="summary-item__name">${item.name}</h2>
          <span>${formatItemPrice(item.price)}</span>
        </div>
        <span class="summary-item__tag">${item.category}</span>
        <p class="summary-item__qty">Quantity: ${quantity}</p>
      </div>
    </div>
  `;
}
