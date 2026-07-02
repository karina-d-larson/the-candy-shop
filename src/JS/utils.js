export function getUrlParameter(name) {
  return new URLSearchParams(window.location.search).get(name)
}

export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}
