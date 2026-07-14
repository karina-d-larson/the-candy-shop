import "../CSS/candy-shop.css";
import { loadItems } from "./data.js";
import { getFavorites, saveFavorites } from "./storage.js";
import { renderFavoriteCard } from "./render.js";
import { updateCartCount } from "./cart-ui.js";
import { initNavigation } from "./navigation.js";

const grid = document.querySelector("#favorites-grid");
const emptyState = document.querySelector("#empty-state-canvas");
const searchInput = document.querySelector("#favorites-search");
const statusRegion = document.querySelector("#favorites-status");

let favoriteItems = [];

function setStatus(message) {
  if (statusRegion) statusRegion.textContent = message;
}

function toggleEmptyState(showGrid) {
  if (grid) grid.classList.toggle("is-hidden", !showGrid);
  emptyState?.classList.toggle("active", !showGrid);
}

function renderFavorites(items) {
  if (!grid) return;

  grid.innerHTML = items.map((item) => renderFavoriteCard(item)).join("");
  toggleEmptyState(items.length > 0);
  bindRemoveButtons();

  if (items.length > 0) {
    setStatus(`Showing ${items.length} saved favorite${items.length === 1 ? "" : "s"}.`);
  } else {
    setStatus("Your favorites list is empty.");
  }
}

function bindRemoveButtons() {
  grid?.querySelectorAll("[data-remove-favorite]").forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.dataset.removeFavorite;
      const card = button.closest(".favorite-card");

      if (card) {
        card.classList.add("is-removing");

        window.setTimeout(() => {
          const nextIds = getFavorites().filter((id) => id !== itemId);
          saveFavorites(nextIds);
          favoriteItems = favoriteItems.filter((item) => item.id !== itemId);
          renderFavorites(favoriteItems);
        }, 200);
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
    toggleEmptyState(filtered.length > 0);
    bindRemoveButtons();

    if (filtered.length === 0 && favoriteItems.length > 0) {
      setStatus("No favorites match your search.");
    }
  });
}

async function initFavorites() {
  initNavigation();
  updateCartCount();
  setStatus("Loading favorites…");

  try {
    const items = await loadItems();
    const favoriteIds = getFavorites();
    favoriteItems = items.filter((item) => favoriteIds.includes(item.id));
    renderFavorites(favoriteItems);
    setupSearch();
  } catch (error) {
    setStatus("Unable to load favorites. Please refresh and try again.");
    console.error(error);
  }
}

initFavorites();
