---
name: Mystic Confectionery Framework
colors:
  surface: '#fff8f5'
  surface-dim: '#ead6cb'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1ea'
  surface-container: '#ffeade'
  surface-container-high: '#f9e4d9'
  surface-container-highest: '#f3dfd3'
  on-surface: '#241913'
  on-surface-variant: '#4c4450'
  inverse-surface: '#3a2e27'
  inverse-on-surface: '#ffede4'
  outline: '#7d7481'
  outline-variant: '#cec3d2'
  surface-tint: '#7847a4'
  primary: '#430d6e'
  on-primary: '#ffffff'
  primary-container: '#5b2a86'
  on-primary-container: '#cf9afd'
  inverse-primary: '#dfb7ff'
  secondary: '#29676f'
  on-secondary: '#ffffff'
  secondary-container: '#b0edf6'
  on-secondary-container: '#306d75'
  tertiary: '#3d2900'
  on-tertiary: '#ffffff'
  tertiary-container: '#593e00'
  on-tertiary-container: '#d8a84d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f1daff'
  primary-fixed-dim: '#dfb7ff'
  on-primary-fixed: '#2d004f'
  on-primary-fixed-variant: '#5f2e8a'
  secondary-fixed: '#b0edf6'
  secondary-fixed-dim: '#95d0d9'
  on-secondary-fixed: '#001f23'
  on-secondary-fixed-variant: '#034f56'
  tertiary-fixed: '#ffdea7'
  tertiary-fixed-dim: '#f1bf61'
  on-tertiary-fixed: '#271900'
  on-tertiary-fixed-variant: '#5e4200'
  background: '#fff8f5'
  on-background: '#241913'
  surface-variant: '#f3dfd3'
typography:
  display-lg:
    fontFamily: Cinzel
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: 0.02em
  display-lg-mobile:
    fontFamily: Cinzel
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Cinzel
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Cinzel
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
  button-text:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is built upon a **Refined Magical Minimalism** aesthetic. It bridges the gap between a whimsical narrative and a functional catalog by using a low-fidelity wireframe foundation infused with "magical" structural accents. The goal is to evoke the mystery of a hidden candy shop while maintaining the clarity of a professional archive.

The visual language avoids literal candy illustrations, instead relying on architectural hierarchy, generous whitespace, and purposeful contrast. The atmosphere is intellectual yet adventurous—think of a digital "grimoire" or a high-end inventory system for supernatural artifacts.

**Key Stylistic Pillars:**
- **Structured Mystery:** Use of heavy line weights and geometric "blueprinting" to suggest hidden depths.
- **Modern Alchemy:** A clean, professional layout that uses "Antique Gold" sparingly to highlight essential interactive paths.
- **Wireframe Fidelity:** Elements are rendered with clear borders and intentional "sketches" of depth, keeping the focus on the user's journey through the catalog.

## Colors

The palette is designed for high legibility and an "aged parchment meets modern tech" feel. 

- **Primary (Deep Purple):** Used for high-level branding, active states, and primary navigation links. It represents the "magic" within the catalog.
- **Secondary (Deep Teal):** Reserved for secondary actions, categorization labels, and informational accents.
- **Accent (Antique Gold):** Used exclusively for "Discoverable" moments—rating stars, special attributes, or "Buy/Unlock" calls to action.
- **Background (Warm Cream):** Provides a soft, low-strain surface that feels more organic than pure white.
- **Text (Dark Cocoa):** Replaces pure black to maintain a warm, sophisticated tone while ensuring WCAG AAA compliance on the cream background.

## Typography

This design system utilizes a high-contrast typographic pairing to distinguish between narrative/branding and functional data.

- **Cinzel (Headings):** A decorative, serif typeface that brings a classic, "ancient" authority to the shop’s titles. Use this for page titles, section headers, and candy names.
- **Inter (Body/UI):** A highly legible sans-serif for descriptions, prices, and system labels. It ensures the interface remains modern and accessible.

**Implementation Notes:**
- All body text must maintain a minimum 1.5x line height for readability.
- "Label-caps" should be used for metadata like "Ingredients" or "Rarity Level."

## Layout & Spacing

The layout follows a **structured fluid grid** with a strong emphasis on vertical rhythm. 

- **Grid:** A 12-column system for desktop, collapsing to 4 columns for mobile. 
- **Rhythm:** All spacing (padding, margins, gaps) is a multiple of the 8px base unit.
- **Hierarchy:** Use "Stack-LG" (48px) to separate major sections like "Product Details" from "Related Items." Use "Stack-SM" (12px) for grouping labels with their respective input fields or values.
- **Mobile Adaption:** For mobile devices, all "Side-by-Side" layouts (e.g., Image left, Text right) must stack vertically to ensure large tap targets and comfortable reading.

## Elevation & Depth

To maintain the low-fidelity wireframe aesthetic while adding a "magical" feel, this design system uses **Tonal Layering and Crisp Outlines** instead of heavy shadows.

- **Surface Tiers:** Use a slightly darker cream (#F0EAE0) for container backgrounds to denote "sunken" areas like search bars or code blocks.
- **Ghost Borders:** Elements like cards and inputs use a 1px solid border in Dark Cocoa at 20% opacity. This defines the wireframe structure without overwhelming the content.
- **Active Elevation:** Only the primary action buttons or "featured" candies receive a subtle, 4px hard-edge shadow (non-diffused) in the Primary Color to indicate they are "hovering" or "active."

## Shapes

The shape language is **"Soft-Geometric."** 

- **Base Radius:** 0.25rem (4px) is the standard for cards and input fields, giving a clean, technical feel.
- **Buttons:** Use slightly more rounded corners (8px) to distinguish interactive elements from static containers.
- **Interactive Elements:** Checkboxes and selection indicators should remain sharp (0px - 2px) to mimic the look of a drafted blueprint.

## Components

**Buttons**
- **Primary:** Solid Deep Purple background with White text. Use for "Add to Inventory" or "Explore."
- **Secondary:** Transparent background with a Deep Teal border. Use for "Cancel" or "Go Back."
- **Size:** Minimum height of 48px to ensure WCAG-compliant tap targets.

**Cards (The Candy Profile)**
- A 1px bordered container.
- Header: Cinzel Headline-SM.
- Image Area: A grey placeholder box with a 45-degree diagonal cross-hatch (standard wireframe style).
- Footer: Contains a "Label-caps" rarity tag and the price in Antique Gold.

**Input Fields**
- Label sits 8px above the field in "Label-caps".
- The field is a 1px bordered rectangle with 12px internal padding.
- Focused state: Border changes to Deep Purple with a 2px thickness.

**Chips / Tags**
- Small, rounded-pill containers with Deep Teal borders.
- Used for candy attributes (e.g., "Levitation," "Time-Warp," "Sugar-Free").

**Navigation**
- A top-bar sticky header with the shop title in Cinzel (Primary Color).
- Text-only links with a 2px underline appearing on hover.