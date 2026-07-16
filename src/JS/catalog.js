import "../CSS/candy-shop.css";
import { loadItems } from "./data.js";
import { renderItemCards } from "./render.js";
import { initModal, openModal, openModalFromUrl } from "./modal.js";
import { updateCartCount } from "./cart-ui.js";
import { initNavigation } from "./navigation.js";

const grid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#catalog-search");
const categoryFilter = document.querySelector("#category-filter");
const statusRegion = document.querySelector("#catalog-status");

let allItems = [];

function setStatus(message) {
  if (statusRegion) statusRegion.textContent = message;
}

function getFilteredItems() {
  const query = searchInput?.value.trim().toLowerCase() ?? "";
  const category = categoryFilter?.value ?? "all";

  return allItems.filter((item) => {
    const matchesCategory = category === "all" || item.category === category;
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.shortDescription.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });
}

function renderCatalog() {
  const filtered = getFilteredItems();
  renderItemCards(filtered, grid);

  if (filtered.length === 0 && allItems.length > 0) {
    setStatus("No items match your search or category filter.");
  } else if (allItems.length > 0) {
    setStatus(`Showing ${filtered.length} of ${allItems.length} artifacts.`);
  }
}

function populateCategoryFilter(items) {
  if (!categoryFilter) return;

  const categories = [...new Set(items.map((item) => item.category))].sort();
  categoryFilter.innerHTML =
    '<option value="all">All Categories</option>' +
    categories.map((category) => `<option value="${category}">${category}</option>`).join("");
}

function bindGridEvents() {
  grid?.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-open-item]");
    if (!trigger) return;

    const itemId = trigger.dataset.openItem;
    const item = allItems.find((entry) => entry.id === itemId);
    if (item) openModal(item, trigger);
  });
}

function setupFilters() {
  searchInput?.addEventListener("input", renderCatalog);
  categoryFilter?.addEventListener("change", renderCatalog);
}

async function initCatalog() {
  if (!grid) return;

  initNavigation();
  updateCartCount();
  setStatus("Loading catalog…");
  grid.innerHTML = "";

  try {
    allItems = await loadItems();
    populateCategoryFilter(allItems);
    renderCatalog();
    setupFilters();
    bindGridEvents();
    initModal();
    openModalFromUrl(allItems, (itemId) => {
      setStatus(`Product "${itemId}" was not found in the catalog.`);
    });
  } catch (error) {
    setStatus("Unable to load catalog items. Please refresh and try again.");
    grid.innerHTML = `<p class="text-error">Unable to load catalog items.</p>`;
    console.error(error);
  }
}

initCatalog();
