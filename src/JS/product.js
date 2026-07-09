import "../CSS/candy-shop.css";
import { loadItems } from "./data.js";
import { getFavorites, saveFavorites } from "./storage.js";
import { getUrlParameter, formatItemPrice, getItemImagePath } from "./utils.js";
import { setupButtonPress } from "./micro-interactions.js";

const fields = {
  image: document.querySelector("#product-image"),
  name: document.querySelector("#product-name"),
  price: document.querySelector("#product-price"),
  description: document.querySelector("#product-description"),
  category: document.querySelector("#product-category"),
  effectPrimary: document.querySelector("#effect-primary"),
  effectDuration: document.querySelector("#effect-duration"),
  effectSideEffects: document.querySelector("#effect-side-effects"),
  favoriteButton: document.querySelector("#favorite-button"),
  orderButton: document.querySelector("#order-button"),
};

function populateProduct(item) {
  if (fields.image) {
    fields.image.src = getItemImagePath(item.image);
    fields.image.alt = item.name;
  }

  if (fields.name) fields.name.textContent = item.name;
  if (fields.price) fields.price.textContent = formatItemPrice(item.price);
  if (fields.description) fields.description.textContent = item.description;
  if (fields.category) fields.category.textContent = item.category;

  if (fields.effectPrimary) {
    fields.effectPrimary.textContent = item.magicalEffect.primary;
  }

  if (fields.effectDuration) {
    fields.effectDuration.textContent = item.magicalEffect.duration;
  }

  if (fields.effectSideEffects) {
    fields.effectSideEffects.textContent = item.magicalEffect.sideEffects;
  }

  setupFavoriteButton(item.id);
}

function setupFavoriteButton(itemId) {
  if (!fields.favoriteButton) return;

  const favorites = getFavorites();
  const isFavorite = favorites.includes(itemId);

  fields.favoriteButton.setAttribute("aria-pressed", String(isFavorite));
  fields.favoriteButton.classList.toggle("is-active", isFavorite);

  fields.favoriteButton.addEventListener("click", () => {
    const current = getFavorites();
    const next = current.includes(itemId)
      ? current.filter((id) => id !== itemId)
      : [...current, itemId];

    saveFavorites(next);

    const nowFavorite = next.includes(itemId);
    fields.favoriteButton.setAttribute("aria-pressed", String(nowFavorite));
    fields.favoriteButton.classList.toggle("is-active", nowFavorite);
  });
}

function setupOrderButton(itemId) {
  fields.orderButton?.addEventListener("click", () => {
    window.location.href = `/pages/order.html?item=${encodeURIComponent(itemId)}`;
  });
}

async function initProduct() {
  try {
    const items = await loadItems();
    const itemId = getUrlParameter("id");
    const item = items.find((entry) => entry.id === itemId) ?? items[0];

    if (!item) {
      document.querySelector("main")?.insertAdjacentHTML(
        "afterbegin",
        `<p class="text-error">Product not found.</p>`,
      );
      return;
    }

    document.title = `${item.name} | The Candy Shop Wars Catalog`;
    populateProduct(item);
    setupOrderButton(item.id);
    setupButtonPress();
  } catch (error) {
    console.error(error);
  }
}

initProduct();
