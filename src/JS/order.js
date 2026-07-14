import "../CSS/candy-shop.css";
import { loadItems } from "./data.js";
import {
  clearCart,
  getCart,
  getCartItemCount,
  getOrderCount,
  incrementOrderCount,
} from "./storage.js";
import { getUrlParameter } from "./utils.js";
import { renderOrderSummaryItem } from "./render.js";
import { updateCartCount } from "./cart-ui.js";
import { initNavigation } from "./navigation.js";

const summaryContainer = document.querySelector("#order-summary-items");
const form = document.querySelector("#order-form");
const statusRegion = document.querySelector("#order-status");
const successRegion = document.querySelector("#order-success");
const confirmationRegion = document.querySelector("#order-confirmation");
const orderCountEl = document.querySelector("#order-count-display");

const fields = {
  name: document.querySelector("#order-name"),
  email: document.querySelector("#order-email"),
  phone: document.querySelector("#order-phone"),
  address: document.querySelector("#order-address"),
  notes: document.querySelector("#order-notes"),
  method: document.querySelector("#order-method"),
};

function setStatus(message) {
  if (statusRegion) statusRegion.textContent = message;
}

function clearFieldError(field) {
  const errorEl = document.querySelector(`#${field.id}-error`);
  field.removeAttribute("aria-invalid");
  field.removeAttribute("aria-describedby");
  if (errorEl) errorEl.textContent = "";
}

function setFieldError(field, message) {
  const errorEl = document.querySelector(`#${field.id}-error`);
  field.setAttribute("aria-invalid", "true");
  if (errorEl) {
    errorEl.textContent = message;
    field.setAttribute("aria-describedby", errorEl.id);
  }
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePhone(value) {
  if (!value.trim()) return true;
  return /^[\d\s()+-]{7,}$/.test(value);
}

function validateForm() {
  let isValid = true;

  Object.values(fields).forEach((field) => {
    if (field) clearFieldError(field);
  });

  if (!fields.name.value.trim()) {
    setFieldError(fields.name, "Full name is required.");
    isValid = false;
  }

  if (!fields.email.value.trim()) {
    setFieldError(fields.email, "Email address is required.");
    isValid = false;
  } else if (!validateEmail(fields.email.value.trim())) {
    setFieldError(fields.email, "Enter a valid email address.");
    isValid = false;
  }

  if (!validatePhone(fields.phone.value.trim())) {
    setFieldError(fields.phone, "Enter a valid phone number.");
    isValid = false;
  }

  if (!fields.address.value.trim()) {
    setFieldError(fields.address, "Delivery address is required.");
    isValid = false;
  }

  return isValid;
}

function bindFieldValidation() {
  Object.values(fields).forEach((field) => {
    field?.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") {
        clearFieldError(field);
      }
    });
  });
}

function renderSummary(entries) {
  if (!summaryContainer) return;
  summaryContainer.innerHTML = entries
    .map(({ item, quantity }) => renderOrderSummaryItem(item, quantity))
    .join("");
}

function updateOrderCountDisplay() {
  if (orderCountEl) {
    orderCountEl.textContent = String(getOrderCount());
  }
}

function resolveCartEntries(catalogItems) {
  return getCart()
    .map((entry) => {
      const item = catalogItems.find((product) => product.id === entry.id);
      if (!item) return null;
      return { item, quantity: entry.quantity };
    })
    .filter(Boolean);
}

async function initOrder() {
  initNavigation();
  updateCartCount();
  updateOrderCountDisplay();
  setStatus("Loading order details…");

  try {
    const catalogItems = await loadItems();
    const checkoutParam = getUrlParameter("checkout");
    const cartEntries = resolveCartEntries(catalogItems);

    if (cartEntries.length === 0) {
      summaryContainer.innerHTML = `
        <p class="text-muted">Your cart is empty. Add items from the catalog, then return to checkout.</p>
        <p><a class="btn btn--primary" href="/">Browse catalog</a></p>
      `;
      setStatus("Cart is empty. Add items before submitting an order.");
      if (form) {
        form.querySelector('[type="submit"]')?.setAttribute("disabled", "true");
      }
      bindFieldValidation();
      return;
    }

    renderSummary(cartEntries);

    const totalQty = getCartItemCount();
    const checkoutNote =
      checkoutParam === "cart" ? "Checkout from cart. " : "";
    setStatus(
      `${checkoutNote}Reviewing ${cartEntries.length} item type${cartEntries.length === 1 ? "" : "s"} (${totalQty} total) before submission.`,
    );

    bindFieldValidation();

    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (successRegion) successRegion.textContent = "";
      if (confirmationRegion) confirmationRegion.innerHTML = "";

      if (getCart().length === 0) {
        setStatus("Your cart is empty. Add items before submitting.");
        return;
      }

      if (!validateForm()) {
        setStatus("Please fix the highlighted fields before submitting.");
        return;
      }

      const submittedItems = resolveCartEntries(catalogItems);
      const orderNumber = incrementOrderCount();
      clearCart();
      updateCartCount();
      updateOrderCountDisplay();

      if (successRegion) {
        successRegion.textContent = `Order #${orderNumber} archived successfully. The archivist will be in touch.`;
      }

      if (confirmationRegion) {
        confirmationRegion.innerHTML = `
          <h2 class="section-title">Order Confirmation</h2>
          <p class="text-muted">You ordered the following artifacts:</p>
          ${submittedItems
            .map(({ item, quantity }) => renderOrderSummaryItem(item, quantity))
            .join("")}
        `;
      }

      summaryContainer.innerHTML = `<p class="text-muted">Cart cleared after successful submission.</p>`;
      setStatus("Order submitted successfully. Cart has been cleared.");
      form.reset();
      form.querySelector('[type="submit"]')?.setAttribute("disabled", "true");
    });
  } catch (error) {
    setStatus("Unable to load order details. Please refresh and try again.");
    console.error(error);
  }
}

initOrder();
