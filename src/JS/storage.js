const FAVORITES_KEY = "candy-shop-favorites";
const ORDER_COUNT_KEY = "candy-shop-order-count";
const CART_KEY = "candy-shop-cart";

export function getFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function getOrderCount() {
  return Number(localStorage.getItem(ORDER_COUNT_KEY) || 0);
}

export function incrementOrderCount() {
  const nextCount = getOrderCount() + 1;
  localStorage.setItem(ORDER_COUNT_KEY, String(nextCount));
  return nextCount;
}

export function getCart() {
  try {
    const stored = localStorage.getItem(CART_KEY);
    const cart = stored ? JSON.parse(stored) : [];
    if (!Array.isArray(cart)) return [];
    return cart
      .filter((entry) => entry && typeof entry.id === "string")
      .map((entry) => ({
        id: entry.id,
        quantity: Math.max(1, Number(entry.quantity) || 1),
      }));
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(itemId, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((entry) => entry.id === itemId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: itemId, quantity: Math.max(1, quantity) });
  }

  saveCart(cart);
  return cart;
}

export function removeFromCart(itemId) {
  const cart = getCart().filter((entry) => entry.id !== itemId);
  saveCart(cart);
  return cart;
}

export function updateCartQuantity(itemId, quantity) {
  if (quantity <= 0) {
    return removeFromCart(itemId);
  }

  const cart = getCart();
  const existing = cart.find((entry) => entry.id === itemId);

  if (existing) {
    existing.quantity = quantity;
  } else {
    cart.push({ id: itemId, quantity });
  }

  saveCart(cart);
  return cart;
}

export function clearCart() {
  saveCart([]);
}

export function getCartItemCount() {
  return getCart().reduce((total, entry) => total + entry.quantity, 0);
}
