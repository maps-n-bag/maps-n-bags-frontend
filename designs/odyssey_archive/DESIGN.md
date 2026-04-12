# Ethereal Chronicle Design System

### 1. Overview & Creative North Star
**Creative North Star: The Modern Chronicler**
Ethereal Chronicle is a high-end editorial design system that bridges the gap between traditional print journalism and immersive digital storytelling. It rejects the "app-like" rigidity of standard grids in favor of an asymmetrical, layered aesthetic that feels curated and archival.

The system uses **Intentional Asymmetry**—overlapping images, off-center typography, and background-to-foreground shifts—to create a sense of movement and narrative depth. It is designed for discovery, where the interface recedes to let photography and long-form storytelling take center stage.

### 2. Colors
The palette is rooted in organic, earthy tones: Terracotta Primary (`#b6271a`), Mossy Tertiary (`#47674a`), and a parchment-inspired Neutral base (`#fff9eb`).

- **The "No-Line" Rule:** Sectioning is strictly prohibited via 1px solid borders. Separation must be achieved through shifts in the surface hierarchy (e.g., transitioning from `surface` to `surface_container_low`).
- **Surface Hierarchy & Nesting:** Use `surface_container` for secondary modules and `surface_container_highest` for floating editorial callouts to create depth without lines.
- **Glass & Gradient:** Navigation elements should utilize `backdrop-blur-xl` with 80% opacity to maintain a sense of lightness. Main CTAs utilize a soft `bg-gradient-to-br` from Primary to Primary-Container for a subtle 3D "painterly" feel.

### 3. Typography
The system uses a sophisticated pairing of **Newsreader** (Serif) for headlines and **Plus Jakarta Sans** (Sans-Serif) for UI and body text.

**Typography Scale (Ground Truth):**
- **Display Large:** `12rem` (Used as ghost-text background elements for high editorial impact).
- **Hero Headline:** `6rem` to `3.75rem` (Newsreader, -0.02em tracking).
- **Sub-Headlines:** `3rem` to `2.25rem`.
- **UI Labels:** `0.875rem` to `0.75rem` (Bold, often uppercase with `0.3em` tracking).
- **Micro-Copy:** `10px` (Used for meta-tags and archival dates).

Headline hierarchy conveys identity through the use of **Italicized emphasis** within standard headings to highlight "human" or "emotional" keywords.

### 4. Elevation & Depth
Depth is conveyed through **Tonal Layering** and atmospheric shadows rather than structural borders.

- **The Layering Principle:** Elements are "stacked" with slight rotations (e.g., -6 degrees) to mimic physical papers on a desk.
- **Ambient Shadows:**
    - `shadow-lg`: Used for smaller floating cards (e.g., testimonials).
    - `shadow-xl`: Used for primary action cards.
    - `shadow-2xl`: Reserved for the most prominent editorial images to pull them forward.
- **Glassmorphism:** Navigation bars use `backdrop-blur-xl` to create a "glass overlay" effect that keeps the user grounded in the content while scrolling.

### 5. Components
- **Buttons:**
    - *Primary:* Rounded-xl, gradient fill, soft shadow-xl.
    - *Secondary:* Ghost style with an underline-offset transition rather than a full box.
- **Editorial Cards:** Images should feature `overflow-hidden` with a `scale-105` hover transition. Content overlays use gradient scrims (black/80 to transparent) for legibility.
- **Theme Switcher:** Compact pill-shaped containers using `surface_container` with icon buttons that scale slightly on hover.
- **Inputs:** High-contrast borders (`white/20`) against dark backgrounds (`inverse_surface`) for newsletter subscriptions.

### 6. Do's and Don'ts
**Do:**
- Use wide gutters (spacing: 3) to allow the design to "breathe."
- Mix font weights and styles (Italic Newsreader next to Bold Plus Jakarta).
- Use photography with high contrast and warm, "painterly" color grading.

**Don't:**
- Use hard black (`#000000`) for text; use `on_surface` (`#363323`) to maintain the parchment feel.
- Use sharp 90-degree corners on containers; maintain a consistent `0.25rem` to `0.75rem` radius.
- Center-align large blocks of text; editorial layouts should lean into left-aligned asymmetry.