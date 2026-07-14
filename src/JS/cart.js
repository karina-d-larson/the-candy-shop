import "../CSS/candy-shop.css";
import { loadItems } from "./data.js";
import {
  clearCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
} from "./storage.js";
import { renderCartItem } from "./render.js";
import { updateCartCount } from "./cart-ui.js";
import { initNavigation } from "./navigation.js";

const list = document.querySelector("#cart-items");
const emptyState = document.querySelector("#cart-empty");
const actions = document.querySelector("#cart-actions");
const statusRegion = document.querySelector("#cart-status");
const clearButton = document.querySelector("#clear-cart");
const checkoutButton = document.querySelector("#checkout-cart");

let catalogItems = [];

function setStatus(message) {
  if (statusRegion) statusRegion.textContent = message;
}

function getCartWithItems() {
  const cart = getCart();
  return cart
    .map((entry) => {
      const item = catalogItems.find((product) => product.id === entry.id);
      if (!item) return null;
      return { item, quantity: entry.quantity };
    })
    .filter(Boolean);
}

function renderCart() {
  const entries = getCartWithItems();
  updateCartCount();

  if (!list) return;

  const hasItems = entries.length > 0;
  emptyState?.classList.toggle("active", !hasItems);
  actions?.classList.toggle("is-hidden", !hasItems);
  list.classList.toggle("is-hidden", !hasItems);

  if (!hasItems) {
    list.innerHTML = "";
    setStatus("Your cart is empty.");
    return;
  }

  list.innerHTML = entries
    .map(({ item, quantity }) => renderCartItem(item, quantity))
    .join("");

  const totalQty = entries.reduce((sum, entry) => sum + entry.quantity, 0);
  setStatus(
    `Cart has ${entries.length} unique item${entries.length === 1 ? "" : "s"} (${totalQty} total).`,
  );
}

function bindCartEvents() {
  list?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-cart-action]");
    if (!button) return;

    const itemId = button.dataset.itemId;
    const action = button.dataset.cartAction;
    if (!itemId || !action) return;

    const cart = getCart();
    const entry = cart.find((item) => item.id === itemId);
    if (!entry && action !== "remove") return;

    if (action === "increase") {
      updateCartQuantity(itemId, entry.quantity + 1);
    } else if (action === "decrease") {
      updateCartQuantity(itemId, entry.quantity - 1);
    } else if (action === "remove") {
      removeFromCart(itemId);
    }

    renderCart();
  });

  clearButton?.addEventListener("click", () => {
    clearCart();
    renderCart();
    setStatus("Cart cleared.");
  });

  checkoutButton?.addEventListener("click", (event) => {
    if (getCart().length === 0) {
      event.preventDefault();
      setStatus("Add items to your cart before checkout.");
    }
  });
}

async function initCartPage() {
  initNavigation();
  updateCartCount();
  setStatus("Loading cart…");

  try {
    catalogItems = await loadItems();
    bindCartEvents();
    renderCart();
  } catch (error) {
    setStatus("Unable to load cart items. Please refresh and try again.");
    console.error(error);
  }
}

initCartPage();
