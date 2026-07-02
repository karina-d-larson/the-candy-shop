const FAVORITES_KEY = 'candy-shop-favorites'
const ORDER_COUNT_KEY = 'candy-shop-order-count'

export function getFavorites() {
  const stored = localStorage.getItem(FAVORITES_KEY)
  return stored ? JSON.parse(stored) : []
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
}

export function getOrderCount() {
  return Number(localStorage.getItem(ORDER_COUNT_KEY) || 0)
}

export function incrementOrderCount() {
  const nextCount = getOrderCount() + 1
  localStorage.setItem(ORDER_COUNT_KEY, String(nextCount))
  return nextCount
}
