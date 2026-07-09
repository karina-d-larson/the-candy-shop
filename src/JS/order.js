import "../CSS/candy-shop.css";
import { loadItems } from "./data.js";
import { incrementOrderCount } from "./storage.js";
import { getUrlParameter } from "./utils.js";
import { renderOrderSummaryItem } from "./render.js";
import { setupFormLabelFocus } from "./micro-interactions.js";

const summaryContainer = document.querySelector("#order-summary-items");
const form = document.querySelector("#order-form");

function renderSummary(items) {
  if (!summaryContainer) return;
  summaryContainer.innerHTML = items.map((item) => renderOrderSummaryItem(item)).join("");
}

async function initOrder() {
  try {
    const items = await loadItems();
    const itemId = getUrlParameter("item");
    const selected = itemId
      ? items.filter((item) => item.id === itemId)
      : items.slice(0, 2);

    renderSummary(selected.length ? selected : items.slice(0, 2));
    setupFormLabelFocus();

    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const orderNumber = incrementOrderCount();
      alert(`Order #${orderNumber} archived successfully. The archivist will be in touch.`);
      form.reset();
    });
  } catch (error) {
    console.error(error);
  }
}

initOrder();
