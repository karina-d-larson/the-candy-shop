# Candy Shop Wars Catalog Implementation Roadmap

Prioritized plan to finish the project while keeping it as simple as possible and ensuring every assignment requirement is satisfied. Preserve user-facing features; remove duplicate paths and dead code.

---

## Phase 1 — Architecture Cleanup

Tasks that remove unnecessary complexity **without changing what the user can do**.

### 1.1 Remove unused Vite starter files

- [ ] **Task:** Remove unused Vite starter files
- **Priority:** High
- **Estimated Time:** XS (<15 min)
- **Why it is needed:** `main.js`, `counter.js`, and `style.css` are leftover Vite boilerplate. They confuse grading and make the project harder to explain.
- **Files Affected:** `src/JS/main.js`, `src/JS/counter.js`, `src/CSS/style.css`, `src/assets/javascript.svg`
- **Blocks later work?** No
- **Definition of Done:** Files deleted. `npm run build` still succeeds. No imports reference these files.

---

### 1.2 Remove unused Tailwind dependencies

- [ ] **Task:** Remove unused Tailwind dependencies
- **Priority:** High
- **Estimated Time:** XS (<15 min)
- **Why it is needed:** Tailwind was removed from the CSS pipeline but packages remain in `package.json`.
- **Files Affected:** `package.json`, `package-lock.json`
- **Blocks later work?** No
- **Definition of Done:** `tailwindcss` and `@tailwindcss/vite` uninstalled. `npm install` and `npm run build` succeed.

---

### 1.3 Trim dead JavaScript helpers

- [ ] **Task:** Trim dead JavaScript helpers
- **Priority:** Medium
- **Estimated Time:** S (15–30 min)
- **Why it is needed:** `micro-interactions.js` has effects (parallax, button press, label color JS) that are not required and are harder to explain than CSS.
- **Files Affected:** `src/JS/micro-interactions.js`, `src/JS/catalog.js`, `src/JS/order.js`, `src/JS/favorites.js`, `src/JS/product.js` (until removed)
- **Blocks later work?** No — do after modal replaces product page
- **Definition of Done:** Only helpers still used remain (or file deleted if modal/order CSS handles focus). No parallax mouse listener.

---

### 1.4 Consolidate detail view into modal (remove product page route)

- [ ] **Task:** Consolidate detail view into modal (remove product page route)
- **Priority:** Critical
- **Estimated Time:** M (30–60 min)
- **Why it is needed:** `pages/product.html` duplicates the detail view. Modal satisfies assignment + your preferred UX in one place.
- **Files Affected:** `pages/product.html` (remove), `src/JS/product.js` (remove or merge into `modal.js`), `vite.config.js`, `src/JS/render.js`, `index.html`
- **Blocks later work?** Yes — blocks modal URL sync, favorites-from-detail, and final cleanup
- **Definition of Done:** No links go to `pages/product.html`. Card click opens modal with same detail content. Build no longer lists product page as required route (or page deleted).

---

### 1.5 Simplify `utils.js`

- [ ] **Task:** Simplify `utils.js`
- **Priority:** Low
- **Estimated Time:** XS (<15 min)
- **Why it is needed:** `formatPrice()` is mostly unused now that prices are strings.
- **Files Affected:** `src/JS/utils.js`, any imports
- **Blocks later work?** No
- **Definition of Done:** Only used helpers remain: `getUrlParameter`, `formatItemPrice`, `getItemImagePath`.

---

### 1.6 Optional: simplify Vite favicon plugin

- [ ] **Task:** Optional: simplify Vite favicon plugin
- **Priority:** Low
- **Estimated Time:** S (15–30 min)
- **Why it is needed:** Custom plugin works but adds explanation overhead. Moving `favicon.svg` to `public/` may be simpler.
- **Files Affected:** `vite.config.js`, `src/favicon.svg`, `src/public/`
- **Blocks later work?** No
- **Definition of Done:** Favicon/icons load in dev and production without custom middleware (or plugin kept with a short comment).

---

## Phase 2 — Core Functionality

Tasks required to satisfy the assignment and your intended features.

### 2.1 JSON loading with status handling

- [ ] **Task:** JSON loading with status handling
- **Priority:** Critical
- **Estimated Time:** S (15–30 min)
- **Description:** Fetch `items.json`, show loading state, show error if fetch fails.
- **Files Affected:** `src/JS/data.js`, `src/JS/catalog.js`, `index.html`
- **Dependencies:** None
- **Definition of Done:** Catalog shows "Loading…" then cards, or a clear error message if JSON fails.

---

### 2.2 Product cards (image, name, price/cost)

- [ ] **Task:** Product cards (image, name, price/cost)
- **Priority:** Critical
- **Estimated Time:** S (15–30 min)
- **Description:** Render cards dynamically from JSON with image, name, price, short description.
- **Files Affected:** `src/JS/render.js`, `src/JS/catalog.js`, `src/CSS/components.css`
- **Dependencies:** 2.1
- **Definition of Done:** All items render in grid. Each card shows image, name, and price string.

---

### 2.3 Detail modal (desktop + mobile behavior)

- [ ] **Task:** Detail modal (desktop + mobile behavior)
- **Priority:** Critical
- **Estimated Time:** L (>1 hour)
- **Description:** Clicking a card opens modal with full detail: image, name, category, price, description, magical properties, favorite, Order Now.
- **Files Affected:** `index.html`, `src/JS/modal.js` (new), `src/JS/render.js`, `src/CSS/components.css`, `src/JS/catalog.js`
- **Dependencies:** 2.2
- **Definition of Done:** Modal opens from catalog. Shows all detail fields. Close button works. Same content previously on product page.

---

### 2.4 URL parameter handling (`?id=`)

- [ ] **Task:** URL parameter handling (`?id=`)
- **Priority:** Critical
- **Estimated Time:** S (15–30 min)
- **Description:** Use `URLSearchParams` to open modal from `?id=moon-rocks`. Update URL when modal opens (optional but good for demo).
- **Files Affected:** `src/JS/utils.js`, `src/JS/modal.js`, `src/JS/catalog.js`
- **Dependencies:** 2.3
- **Definition of Done:** Visiting `/?id=moon-rocks` opens correct item. Order link uses `?item=` on order page.

---

### 2.5 Category filtering

- [ ] **Task:** Category filtering
- **Priority:** Critical
- **Estimated Time:** M (30–60 min)
- **Description:** Add category filter UI (dropdown or chips) for All, Belinda White Candy, Sebastian Stott Candy, Carnival Candy, Arcade Stamp.
- **Files Affected:** `index.html`, `src/JS/catalog.js`, `src/CSS/components.css`
- **Dependencies:** 2.1
- **Definition of Done:** Filter changes visible cards. "All" shows everything. Filter + search work together.

---

### 2.6 Search

- [ ] **Task:** Search
- **Priority:** High
- **Estimated Time:** S (15–30 min)
- **Description:** Search by name, short description, and category text.
- **Files Affected:** `src/JS/catalog.js`, `index.html`
- **Dependencies:** 2.1
- **Definition of Done:** Typing in search filters cards live. Works with category filter active.

---

### 2.7 Favorites with localStorage

- [ ] **Task:** Favorites with localStorage
- **Priority:** Critical
- **Estimated Time:** M (30–60 min)
- **Description:** Toggle favorite in modal. Persist IDs in `localStorage`. Show favorites page from stored data.
- **Files Affected:** `src/JS/storage.js`, `src/JS/modal.js`, `src/JS/favorites.js`, `pages/favorites.html`, `src/JS/render.js`
- **Dependencies:** 2.3, 2.1
- **Definition of Done:** Favorite button toggles state. Reload keeps favorites. Favorites page shows saved items. Remove works.

---

### 2.8 Order page + Order Now flow

- [ ] **Task:** Order page + Order Now flow
- **Priority:** Critical
- **Estimated Time:** M (30–60 min)
- **Description:** Modal "Order Now" → `pages/order.html?item=id`. Order page shows selected item summary.
- **Files Affected:** `pages/order.html`, `src/JS/order.js`, `src/JS/render.js`, `src/JS/modal.js`
- **Dependencies:** 2.3, 2.4
- **Definition of Done:** User can go from catalog → modal → order with correct item in summary.

---

### 2.9 Validated order form

- [ ] **Task:** Validated order form
- **Priority:** Critical
- **Estimated Time:** M (30–60 min)
- **Description:** Form with name, email, phone, address, optional message, delivery dropdown. HTML + custom validation with visible errors.
- **Files Affected:** `pages/order.html`, `src/JS/order.js`, `src/CSS/components.css`
- **Dependencies:** 2.8
- **Definition of Done:** Invalid submit shows field errors. Valid submit shows success message. Form resets after success.

---

### 2.10 Order count in localStorage

- [ ] **Task:** Order count in localStorage
- **Priority:** Critical
- **Estimated Time:** XS (<15 min)
- **Description:** Increment and store order count on successful submit.
- **Files Affected:** `src/JS/storage.js`, `src/JS/order.js`
- **Dependencies:** 2.9
- **Definition of Done:** Each successful order increments count. Reload and submit again shows next number.

---

### 2.11 Dropdown on order form

- [ ] **Task:** Dropdown on order form
- **Priority:** High
- **Estimated Time:** XS (<15 min)
- **Description:** Keep acquisition method `<select>` (already exists). Ensure it has a proper label.
- **Files Affected:** `pages/order.html`
- **Dependencies:** None
- **Definition of Done:** Labeled dropdown present and usable by keyboard.

---

### 2.12 JavaScript modules organization

- [ ] **Task:** JavaScript modules organization
- **Priority:** High
- **Estimated Time:** S (15–30 min)
- **Description:** Final module layout: `data`, `storage`, `render`, `utils`, `catalog`, `modal`, `favorites`, `order`.
- **Files Affected:** All `src/JS/*.js`
- **Dependencies:** Phases 1–2 mostly complete
- **Definition of Done:** Each page imports only what it needs. No orphaned modules.

---

## Phase 3 — Accessibility

Every accessibility task listed separately.

### 3.1 Semantic HTML structure

- [ ] **Task:** Semantic HTML structure
- **Priority:** High
- **Estimated Time:** S (15–30 min)
- **Files Affected:** `index.html`, `pages/order.html`, `pages/favorites.html`
- **Definition of Done:** `header`, `main`, `nav`, `footer`, `section`, `article` used correctly. One `main` per page.

---

### 3.2 Heading hierarchy

- [ ] **Task:** Heading hierarchy
- **Priority:** High
- **Estimated Time:** XS (<15 min)
- **Files Affected:** All HTML pages
- **Definition of Done:** Each page has one `h1`. Subsections use `h2`/`h3` in order. Order page no longer starts with `h2` only.

---

### 3.3 Form labels on order page

- [ ] **Task:** Form labels on order page
- **Priority:** Critical
- **Estimated Time:** XS (<15 min)
- **Files Affected:** `pages/order.html`
- **Definition of Done:** Every input, textarea, and select has a `<label for="...">`.

---

### 3.4 Search input labels

- [ ] **Task:** Search input labels
- **Priority:** High
- **Estimated Time:** XS (<15 min)
- **Files Affected:** `index.html`, `pages/favorites.html`
- **Definition of Done:** Search has visible or visually hidden label / `aria-label`.

---

### 3.5 Visible focus styles

- [ ] **Task:** Visible focus styles
- **Priority:** Critical
- **Estimated Time:** S (15–30 min)
- **Files Affected:** `src/CSS/components.css`, `src/CSS/base.css`
- **Definition of Done:** `:focus-visible` outlines on links, buttons, inputs, filter controls. Focus is always visible via keyboard.

---

### 3.6 Modal accessibility — roles and labelling

- [ ] **Task:** Modal accessibility — roles and labelling
- **Priority:** Critical
- **Estimated Time:** S (15–30 min)
- **Files Affected:** `index.html`, `src/JS/modal.js`, `src/CSS/components.css`
- **Definition of Done:** Modal has `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to product name heading.

---

### 3.7 Modal close button

- [ ] **Task:** Modal close button
- **Priority:** Critical
- **Estimated Time:** XS (<15 min)
- **Files Affected:** `index.html`, `src/JS/modal.js`
- **Definition of Done:** Close button is a `<button>` with accessible name ("Close product details").

---

### 3.8 Escape key closes modal

- [ ] **Task:** Escape key closes modal
- **Priority:** Critical
- **Estimated Time:** XS (<15 min)
- **Files Affected:** `src/JS/modal.js`
- **Definition of Done:** Pressing Escape closes modal and returns focus to triggering card/button.

---

### 3.9 Focus trap in modal

- [ ] **Task:** Focus trap in modal
- **Priority:** Critical
- **Estimated Time:** M (30–60 min)
- **Files Affected:** `src/JS/modal.js`
- **Definition of Done:** Tab cycles inside modal only while open. Shift+Tab works. Focus moves into modal on open.

---

### 3.10 Body scroll lock while modal open

- [ ] **Task:** Body scroll lock while modal open
- **Priority:** High
- **Estimated Time:** XS (<15 min)
- **Files Affected:** `src/JS/modal.js`, `src/CSS/components.css`
- **Definition of Done:** Background does not scroll when modal is open. Restored on close.

---

### 3.11 Favorite button accessibility

- [ ] **Task:** Favorite button accessibility
- **Priority:** High
- **Estimated Time:** XS (<15 min)
- **Files Affected:** `src/JS/modal.js`
- **Definition of Done:** Favorite uses `<button>`, `aria-label`, and `aria-pressed` reflecting state.

---

### 3.12 Form validation — `aria-invalid` and error text

- [ ] **Task:** Form validation — `aria-invalid` and error text
- **Priority:** Critical
- **Estimated Time:** M (30–60 min)
- **Files Affected:** `src/JS/order.js`, `pages/order.html`, `src/CSS/components.css`
- **Definition of Done:** Invalid fields get `aria-invalid="true"` and `aria-describedby` linked to visible error message.

---

### 3.13 `aria-live` for loading and errors

- [ ] **Task:** `aria-live` for loading and errors
- **Priority:** High
- **Estimated Time:** S (15–30 min)
- **Files Affected:** `index.html`, `pages/favorites.html`, `pages/order.html`, `src/JS/catalog.js`, `src/JS/favorites.js`, `src/JS/order.js`
- **Definition of Done:** Status region announces loading, errors, and form success without relying on `alert()`.

---

### 3.14 Alt text on images

- [ ] **Task:** Alt text on images
- **Priority:** High
- **Estimated Time:** S (15–30 min)
- **Files Affected:** `src/JS/render.js`, `src/JS/modal.js`, `src/public/images/`
- **Definition of Done:** Every product image has meaningful `alt` (item name). Decorative icons use `aria-hidden="true"`.

---

### 3.15 Buttons for actions, links for navigation

- [ ] **Task:** Buttons for actions, links for navigation
- **Priority:** High
- **Estimated Time:** XS (<15 min)
- **Files Affected:** All HTML/JS templates
- **Definition of Done:** Favorite, close, filter chips (if buttons), submit = `<button>`. Catalog/order navigation = `<a href>`.

---

### 3.16 Color contrast check

- [ ] **Task:** Color contrast check
- **Priority:** Medium
- **Estimated Time:** S (15–30 min)
- **Files Affected:** `src/CSS/variables.css`, `src/CSS/components.css`
- **Definition of Done:** Body text, buttons, and links meet readable contrast on cream background. Active states not color-only.

---

### 3.17 Keyboard navigation test pass

- [ ] **Task:** Keyboard navigation test pass
- **Priority:** Critical
- **Estimated Time:** S (15–30 min)
- **Files Affected:** Whole app
- **Definition of Done:** Full catalog → modal → order flow completable with keyboard only.

---

## Phase 4 — Responsive Design

### 4.1 Responsive product grid

- [ ] **Task:** Responsive product grid
- **Priority:** Critical
- **Estimated Time:** S (15–30 min)
- **Files Affected:** `src/CSS/components.css`
- **Dependencies:** 2.2
- **Definition of Done:** 1 column mobile, 2 tablet, 3 desktop. Cards remain readable at all sizes.

---

### 4.2 Responsive navigation

- [ ] **Task:** Responsive navigation
- **Priority:** High
- **Estimated Time:** S (15–30 min)
- **Files Affected:** `src/CSS/layout.css`, all page headers
- **Dependencies:** None
- **Definition of Done:** Logo, nav links, and cart usable on mobile. No overflow or clipped controls.

---

### 4.3 Desktop modal (centered)

- [ ] **Task:** Desktop modal (centered)
- **Priority:** Critical
- **Estimated Time:** M (30–60 min)
- **Files Affected:** `src/CSS/components.css`, `index.html`
- **Dependencies:** 2.3
- **Definition of Done:** At `min-width: 768px` (or similar), modal is centered overlay with max-width and scrollable content.

---

### 4.4 Mobile full-screen modal

- [ ] **Task:** Mobile full-screen modal
- **Priority:** Critical
- **Estimated Time:** M (30–60 min)
- **Files Affected:** `src/CSS/components.css`
- **Dependencies:** 2.3
- **Definition of Done:** Below breakpoint, modal fills viewport like a detail page. Close button always reachable.

---

### 4.5 Responsive order page

- [ ] **Task:** Responsive order page
- **Priority:** High
- **Estimated Time:** S (15–30 min)
- **Files Affected:** `src/CSS/components.css`, `pages/order.html`
- **Dependencies:** 2.8
- **Definition of Done:** Form and summary stack on mobile; side-by-side on desktop. Inputs are full-width on small screens.

---

### 4.6 Responsive favorites page

- [ ] **Task:** Responsive favorites page
- **Priority:** Medium
- **Estimated Time:** XS (<15 min)
- **Files Affected:** `src/CSS/components.css`, `pages/favorites.html`
- **Dependencies:** 2.7
- **Definition of Done:** Favorites grid and search toolbar work on mobile without horizontal scroll.

---

### 4.7 Touch-friendly controls

- [ ] **Task:** Touch-friendly controls
- **Priority:** Medium
- **Estimated Time:** XS (<15 min)
- **Files Affected:** `src/CSS/components.css`
- **Definition of Done:** Buttons and tap targets at least ~44px where practical.

---

## Phase 5 — Polish

Near the end; improves demo quality without adding scope.

### 5.1 Loading states (catalog, favorites, order)

- [ ] **Task:** Loading states (catalog, favorites, order)
- **Priority:** High
- **Estimated Time:** S (15–30 min)
- **Files Affected:** `src/JS/catalog.js`, `src/JS/favorites.js`, `src/JS/order.js`, HTML status regions
- **Definition of Done:** Brief "Loading…" shown before data renders on each data-driven view.

---

### 5.2 Error messages (catalog, favorites, order)

- [ ] **Task:** Error messages (catalog, favorites, order)
- **Priority:** High
- **Estimated Time:** S (15–30 min)
- **Files Affected:** `src/JS/catalog.js`, `src/JS/favorites.js`, `src/JS/order.js`
- **Definition of Done:** User-visible error if JSON fails or item ID not found.

---

### 5.3 CSS animation — modal open/close

- [ ] **Task:** CSS animation — modal open/close
- **Priority:** Critical
- **Estimated Time:** S (15–30 min)
- **Files Affected:** `src/CSS/components.css`
- **Definition of Done:** Modal overlay and panel animate (fade/slide). Respects `prefers-reduced-motion`.

---

### 5.4 CSS animation — card hover (optional)

- [ ] **Task:** CSS animation — card hover (optional)
- **Priority:** Medium
- **Estimated Time:** XS (<15 min)
- **Files Affected:** `src/CSS/components.css`
- **Definition of Done:** Subtle card hover transition. Pure CSS, no JS.

---

### 5.5 Product images in `src/public/images/`

- [ ] **Task:** Product images in `src/public/images/`
- **Priority:** High
- **Estimated Time:** M (30–60 min) — depends on asset prep
- **Files Affected:** `src/public/images/*`, `src/public/data/items.json`
- **Definition of Done:** All `image` paths in JSON resolve. No broken images in cards or modal.

---

### 5.6 Empty favorites state

- [ ] **Task:** Empty favorites state
- **Priority:** Medium
- **Estimated Time:** XS (<15 min)
- **Files Affected:** `pages/favorites.html`, `src/JS/favorites.js`, `src/CSS/components.css`
- **Definition of Done:** Empty state shows message + link back to catalog. Verify after modal work.

---

### 5.7 Order success message (replace `alert`)

- [ ] **Task:** Order success message (replace `alert`)
- **Priority:** High
- **Estimated Time:** S (15–30 min)
- **Files Affected:** `src/JS/order.js`, `pages/order.html`
- **Definition of Done:** On-page success message shows order number. No browser `alert()`.

---

### 5.8 Trust badge / footer consistency

- [ ] **Task:** Trust badge / footer consistency
- **Priority:** Low
- **Estimated Time:** XS (<15 min)
- **Files Affected:** All pages
- **Definition of Done:** Footer markup consistent. Copyright not orphaned outside footer layout.

---

## Phase 6 — Final Cleanup

Before submission.

### 6.1 Remove unused code (second pass)

- [ ] **Task:** Remove unused code (second pass)
- **Priority:** High
- **Estimated Time:** S (15–30 min)
- **Files Affected:** Entire `src/`
- **Definition of Done:** No unused JS, CSS classes, or HTML pages. `product.html` gone if modal complete.

---

### 6.2 Verify every assignment requirement

- [ ] **Task:** Verify every assignment requirement
- **Priority:** Critical
- **Estimated Time:** S (15–30 min)
- **Files Affected:** Use Assignment Requirements Checklist below
- **Definition of Done:** Every checkbox in Assignment Requirements Checklist checked.

---

### 6.3 Test localStorage

- [ ] **Task:** Test localStorage
- **Priority:** Critical
- **Estimated Time:** XS (<15 min)
- **Files Affected:** `src/JS/storage.js`
- **Definition of Done:** Favorites persist after refresh. Order count increments correctly. DevTools → Application → Local Storage verified.

---

### 6.4 Test keyboard navigation

- [ ] **Task:** Test keyboard navigation
- **Priority:** Critical
- **Estimated Time:** S (15–30 min)
- **Files Affected:** Whole app
- **Definition of Done:** Tab through nav, search, filters, cards, modal, form. Escape closes modal. Enter submits form.

---

### 6.5 Test responsive layouts

- [ ] **Task:** Test responsive layouts
- **Priority:** Critical
- **Estimated Time:** S (15–30 min)
- **Files Affected:** Whole app
- **Definition of Done:** Test mobile (~375px), tablet (~768px), desktop (~1200px). Modal and order layout behave correctly.

---

### 6.6 Test URL parameters

- [ ] **Task:** Test URL parameters
- **Priority:** Critical
- **Estimated Time:** XS (<15 min)
- **Files Affected:** `src/JS/utils.js`, `src/JS/modal.js`, `src/JS/order.js`
- **Definition of Done:** `/?id=moon-rocks` opens correct modal. `/pages/order.html?item=moon-rocks` shows correct summary.

---

### 6.7 Verify Netlify build

- [ ] **Task:** Verify Netlify build
- **Priority:** Critical
- **Estimated Time:** XS (<15 min)
- **Files Affected:** `vite.config.js`, `package.json`
- **Definition of Done:** `npm run build` succeeds. `npm run preview` works. All routes and assets load.

---

### 6.8 Optional: add `netlify.toml`

- [ ] **Task:** Optional: add `netlify.toml`
- **Priority:** Low
- **Estimated Time:** XS (<15 min)
- **Files Affected:** `netlify.toml` (new)
- **Definition of Done:** Publish directory `dist`. SPA fallback only if needed (multi-page may not need it).

---

### 6.9 README for teacher

- [ ] **Task:** README for teacher
- **Priority:** Medium
- **Estimated Time:** S (15–30 min)
- **Files Affected:** `README.md`
- **Definition of Done:** Short explanation: how to run, where JSON lives, what `localStorage` keys do, modal + order flow.

---

## Suggested Work Order (Critical Path)

1. **2.3** Detail modal
2. **2.4** URL params
3. **1.4** Remove product page
4. **2.5** Category filter
5. **2.9** Form validation
6. **3.6–3.10** Modal a11y
7. **4.3–4.4** Responsive modal
8. **5.3** Modal animation
9. **5.5** Images
10. **1.1–1.2** Dead code cleanup
11. **6.x** Final testing

**Estimated total active work:** roughly 8–14 hours depending on image prep and modal polish.

---

## Assignment Requirements Checklist

Use this before submission.

### General requirements

- [ ] **Validated form** — Order form with visible validation errors
- [ ] **localStorage** — Favorites persist
- [ ] **localStorage** — Order count persists
- [ ] **Fetch JSON** — Catalog loads from `src/public/data/items.json`
- [ ] **Dropdown or modal** — Order `<select>` present
- [ ] **Dropdown or modal** — Product detail modal implemented
- [ ] **CSS animation** — Modal (or other) animation in CSS
- [ ] **Responsive design** — Works on mobile and desktop
- [ ] **Good UX** — Clear loading, errors, and success feedback
- [ ] **Accessibility** — Labels, focus, modal, keyboard, alt text
- [ ] **URL parameters** — `URLSearchParams` used (`?id=`, `?item=`)
- [ ] **JS modules** — Code split into organized modules
- [ ] **Netlify-compatible Vite** — `npm run build` produces `dist/`

### Storefront requirements

- [ ] **Product listing page** — `index.html` catalog
- [ ] **Product cards** — Image, name, price/cost
- [ ] **Detail view** — Modal with full product info
- [ ] **Order Now flow** — Modal → order page
- [ ] **Order form fields** — Name, email, phone, address, optional message
- [ ] **Order count** — Stored in `localStorage`
- [ ] **Dynamic rendering** — Cards/summary from JSON
- [ ] **Loading message** — Shown while data loads
- [ ] **Error message** — Shown if data fails
- [ ] **URLSearchParams item ID** — Passed between views

### Chosen features (keep these too)

- [ ] **Candy Shop Wars theme**
- [ ] **Category filtering**
- [ ] **Search**
- [ ] **Favorites page**
- [ ] **Desktop centered modal**
- [ ] **Mobile full-screen modal**

### Pre-submit smoke test

- [ ] Open catalog → filter category → search → open modal
- [ ] Toggle favorite → check favorites page
- [ ] Order Now → fill form → submit → order count increases
- [ ] Refresh browser → favorites still there
- [ ] Test with keyboard only
- [ ] Test on mobile width
- [ ] Run `npm run build` and preview `dist/`
