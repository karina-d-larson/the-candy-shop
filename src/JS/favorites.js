import "../CSS/candy-shop.css";
import { loadItems } from "./data.js";
import { getFavorites, saveFavorites } from "./storage.js";
import { renderFavoriteCard } from "./render.js";
import {
  setupFavoriteCardHover,
  setupSearchFocus,
} from "./micro-interactions.js";

const grid = document.querySelector("#favorites-grid");
const emptyState = document.querySelector("#empty-state-canvas");
const searchInput = document.querySelector("[data-search-input]");

let favoriteItems = [];

function toggleEmptyState() {
  const hasFavorites = favoriteItems.length > 0;

  if (grid) grid.classList.toggle("is-hidden", !hasFavorites);
  emptyState?.classList.toggle("active", !hasFavorites);
}

function renderFavorites(items) {
  if (!grid) return;

  grid.innerHTML = items.map((item) => renderFavoriteCard(item)).join("");
  toggleEmptyState();
  setupFavoriteCardHover();
  bindRemoveButtons();
}

function bindRemoveButtons() {
  grid?.querySelectorAll("[data-remove-favorite]").forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.dataset.removeFavorite;
      const card = button.closest(".favorite-card");

      if (card) {
        card.style.transform = "scale(0.95)";
        card.style.opacity = "0";

        setTimeout(() => {
          const nextIds = getFavorites().filter((id) => id !== itemId);
          saveFavorites(nextIds);
          favoriteItems = favoriteItems.filter((item) => item.id !== itemId);
          renderFavorites(favoriteItems);
        }, 300);
      }
    });
  });
}

function setupSearch() {
  searchInput?.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = favoriteItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.shortDescription.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query),
    );

    if (!grid) return;

    grid.innerHTML = filtered.map((item) => renderFavoriteCard(item)).join("");
    grid.classList.toggle("is-hidden", filtered.length === 0);
    emptyState?.classList.toggle("active", filtered.length === 0);
    setupFavoriteCardHover();
    bindRemoveButtons();
  });
}

async function initFavorites() {
  try {
    const items = await loadItems();
    const favoriteIds = getFavorites();
    favoriteItems = items.filter((item) => favoriteIds.includes(item.id));

    renderFavorites(favoriteItems);
    setupSearch();
    setupSearchFocus();
  } catch (error) {
    console.error(error);
  }
}

initFavorites();
