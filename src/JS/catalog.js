import "../CSS/candy-shop.css";
import { loadItems } from "./data.js";
import { renderItemCards } from "./render.js";
import {
  setupCrosshatchParallax,
  setupSearchFocus,
} from "./micro-interactions.js";

const grid = document.querySelector("#product-grid");
const searchInput = document.querySelector("[data-search-input]");

let allItems = [];

function filterItems() {
  const query = searchInput?.value.trim().toLowerCase() ?? "";

  const filtered = allItems.filter((item) => {
    if (!query) return true;

    return (
      item.name.toLowerCase().includes(query) ||
      item.shortDescription.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
  });

  renderItemCards(filtered, grid);
}

function setupSearch() {
  searchInput?.addEventListener("input", filterItems);
}

async function initCatalog() {
  if (!grid) return;

  try {
    allItems = await loadItems();
    renderItemCards(allItems, grid);
    setupSearch();
    setupSearchFocus();
    setupCrosshatchParallax();
  } catch (error) {
    grid.innerHTML = `<p class="text-error">Unable to load catalog items.</p>`;
    console.error(error);
  }
}

initCatalog();
