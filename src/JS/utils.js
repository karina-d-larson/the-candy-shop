export function getUrlParameter(name) {
  return new URLSearchParams(window.location.search).get(name);
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function formatItemPrice(price) {
  if (price === null || price === undefined) return "Unknown";
  if (typeof price === "number") return formatPrice(price);
  return price;
}

export function getItemImagePath(image) {
  if (!image) return "";
  if (image.startsWith("http") || image.startsWith("/")) return image;
  return `/${image}`;
}
