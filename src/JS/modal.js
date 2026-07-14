import { getFavorites, saveFavorites, addToCart } from "./storage.js";
import { formatItemPrice, getItemImagePath, getUrlParameter } from "./utils.js";
import { updateCartCount } from "./cart-ui.js";

const PLACEHOLDER = "/images/placeholder.svg";

let modal = null;
let lastFocusedElement = null;
let favoriteStatusEl = null;
let cartStatusEl = null;
let currentItem = null;
let onFavoriteChange = null;

function getFocusableElements(container) {
  return Array.from(
    container.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.closest("[hidden]") && el.offsetParent !== null);
}

function updateDetailUrl(itemId) {
  const url = new URL(window.location.href);
  if (itemId) {
    url.searchParams.set("id", itemId);
  } else {
    url.searchParams.delete("id");
  }
  history.replaceState(null, "", url);
}

function setFavoriteStatus(message) {
  if (favoriteStatusEl) {
    favoriteStatusEl.textContent = message;
  }
}

function setCartStatus(message) {
  if (cartStatusEl) {
    cartStatusEl.textContent = message;
  }
}

function populateModal(item) {
  if (!modal) return;

  currentItem = item;

  modal.querySelector("#modal-image").src = getItemImagePath(item.image);
  modal.querySelector("#modal-image").alt = item.name;
  modal.querySelector("#modal-image").onerror = function onImageError() {
    this.onerror = null;
    this.src = PLACEHOLDER;
  };

  modal.querySelector("#modal-name").textContent = item.name;
  modal.querySelector("#modal-category").textContent = item.category;
  modal.querySelector("#modal-price").textContent = formatItemPrice(item.price);
  modal.querySelector("#modal-description").textContent = item.description;
  modal.querySelector("#modal-effect-primary").textContent = item.magicalEffect.primary;
  modal.querySelector("#modal-effect-duration").textContent = item.magicalEffect.duration;
  modal.querySelector("#modal-effect-side-effects").textContent = item.magicalEffect.sideEffects;

  const favoriteButton = modal.querySelector("#modal-favorite");
  const isFavorite = getFavorites().includes(item.id);
  favoriteButton.setAttribute("aria-pressed", String(isFavorite));
  favoriteButton.classList.toggle("is-active", isFavorite);
  favoriteButton.dataset.itemId = item.id;
  favoriteButton.dataset.itemName = item.name;
}

function handleFavoriteClick(event) {
  const button = event.currentTarget;
  const itemId = button.dataset.itemId;
  if (!itemId) return;

  const favorites = getFavorites();
  const next = favorites.includes(itemId)
    ? favorites.filter((id) => id !== itemId)
    : [...favorites, itemId];

  saveFavorites(next);

  const isFavorite = next.includes(itemId);
  button.setAttribute("aria-pressed", String(isFavorite));
  button.classList.toggle("is-active", isFavorite);
  setFavoriteStatus(
    isFavorite
      ? `${button.dataset.itemName} added to favorites.`
      : `${button.dataset.itemName} removed from favorites.`,
  );

  if (onFavoriteChange) onFavoriteChange();
}

function handleAddToCart() {
  if (!currentItem) return;

  addToCart(currentItem.id);
  updateCartCount();
  setCartStatus(`${currentItem.name} added to cart.`);
}

function handleKeyDown(event) {
  if (event.key === "Escape") {
    closeModal();
    return;
  }

  if (event.key !== "Tab" || !modal) return;

  const focusable = getFocusableElements(modal.querySelector(".product-modal__panel"));
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

export function initModal(options = {}) {
  modal = document.querySelector("#product-modal");
  favoriteStatusEl = document.querySelector("#modal-favorite-status");
  cartStatusEl = document.querySelector("#modal-cart-status");
  onFavoriteChange = options.onFavoriteChange;

  if (!modal) return;

  modal.querySelector(".product-modal__backdrop")?.addEventListener("click", closeModal);
  modal.querySelector(".product-modal__close")?.addEventListener("click", closeModal);
  modal.querySelector("#modal-favorite")?.addEventListener("click", handleFavoriteClick);
  modal.querySelector("#modal-add-cart")?.addEventListener("click", handleAddToCart);
  modal.addEventListener("keydown", handleKeyDown);
}

export function openModal(item, triggerElement = null) {
  if (!modal || !item) return;

  lastFocusedElement = triggerElement || document.activeElement;
  populateModal(item);
  setCartStatus("");
  setFavoriteStatus("");

  modal.hidden = false;
  document.body.classList.add("modal-open");
  updateDetailUrl(item.id);

  requestAnimationFrame(() => {
    modal.classList.add("is-open");
    modal.querySelector(".product-modal__close")?.focus();
  });
}

export function closeModal() {
  if (!modal || modal.hidden) return;

  modal.classList.remove("is-open");
  document.body.classList.remove("modal-open");
  updateDetailUrl(null);
  setFavoriteStatus("");
  setCartStatus("");
  currentItem = null;

  window.setTimeout(() => {
    modal.hidden = true;
    if (lastFocusedElement?.focus) {
      lastFocusedElement.focus();
    }
  }, 200);
}

export function openModalFromUrl(items, onInvalidId) {
  const itemId = getUrlParameter("id");
  if (!itemId) return;

  const item = items.find((entry) => entry.id === itemId);
  if (item) {
    openModal(item);
    return;
  }

  updateDetailUrl(null);
  if (onInvalidId) onInvalidId(itemId);
}
