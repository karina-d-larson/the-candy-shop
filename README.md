# The Candy Shop Wars Catalog

A Vite storefront for browsing magical candies from *The Candy Shop Wars*.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
npm run preview
```

## Project structure

- `index.html` — catalog with search, category filter, and product detail modal
- `pages/favorites.html` — saved favorites from localStorage
- `pages/cart.html` — multi-item shopping cart
- `pages/order.html` — validated checkout form for the full cart
- `src/public/data/items.json` — product data loaded with `fetch`
- `src/JS/` — JavaScript modules (`catalog`, `modal`, `cart`, `order`, `storage`, `navigation`, etc.)

## localStorage keys

- `candy-shop-favorites` — array of favorite item IDs
- `candy-shop-cart` — array of `{ id, quantity }` cart entries
- `candy-shop-order-count` — number of successful orders submitted

## URL parameters

- `/?id=<item-id>` — opens the product detail modal on the catalog
- `/pages/order.html?checkout=cart` — checkout flow from the cart page

## Deploy

This project builds with Vite and can be deployed to Netlify using the included `netlify.toml`.
