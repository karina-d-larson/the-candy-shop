import "../CSS/candy-shop.css";
import { loadItems } from "./data.js";
import { incrementOrderCount } from "./storage.js";
import { getUrlParameter } from "./utils.js";
import { renderOrderSummaryItem } from "./render.js";

const summaryContainer = document.querySelector("#order-summary-items");
const form = document.querySelector("#order-form");
const statusRegion = document.querySelector("#order-status");
const successRegion = document.querySelector("#order-success");

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

function renderSummary(items) {
  if (!summaryContainer) return;
  summaryContainer.innerHTML = items.map((item) => renderOrderSummaryItem(item)).join("");
}

async function initOrder() {
  setStatus("Loading order details…");

  try {
    const items = await loadItems();
    const itemId = getUrlParameter("item");
    const selected = itemId ? items.filter((item) => item.id === itemId) : [];

    if (itemId && selected.length === 0) {
      setStatus("The selected item could not be found. Choose an item from the catalog.");
      summaryContainer.innerHTML = `<p class="text-error">Invalid item ID in URL.</p>`;
      return;
    }

    if (selected.length) {
      renderSummary(selected);
      setStatus(`Ordering: ${selected[0].name}`);
    } else {
      summaryContainer.innerHTML = `<p class="text-muted">No item selected. Open a product and choose Order Now.</p>`;
      setStatus("No item selected. Choose a product from the catalog first.");
    }

    bindFieldValidation();

    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      if (successRegion) successRegion.textContent = "";

      if (!validateForm()) {
        setStatus("Please fix the highlighted fields before submitting.");
        return;
      }

      const orderNumber = incrementOrderCount();
      if (successRegion) {
        successRegion.textContent = `Order #${orderNumber} archived successfully. The archivist will be in touch.`;
      }
      setStatus("Order submitted successfully.");
      form.reset();
    });
  } catch (error) {
    setStatus("Unable to load order details. Please refresh and try again.");
    console.error(error);
  }
}

initOrder();
