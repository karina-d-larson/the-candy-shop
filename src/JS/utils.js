export function getUrlParameter(name) {
  return new URLSearchParams(window.location.search).get(name);
}

export function formatItemPrice(price) {
  if (price === null || price === undefined) return "Unknown";
  return String(price);
}

export function getItemImagePath(image) {
  if (!image) return "/images/placeholder.svg";
  if (image.startsWith("http") || image.startsWith("/")) return image;
  return `/${image}`;
}
