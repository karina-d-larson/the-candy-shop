import { getCartItemCount } from "./storage.js";

export function updateCartCount() {
  const count = getCartItemCount();
  const label = `Cart, ${count} ${count === 1 ? "item" : "items"}`;

  document.querySelectorAll("[data-cart-link]").forEach((link) => {
    link.setAttribute("aria-label", label);
  });

  document.querySelectorAll("[data-cart-count]").forEach((badge) => {
    badge.textContent = String(count);
  });
}
