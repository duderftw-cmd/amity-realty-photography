# Design System Document

## 1. Overview & Creative North Star: "The Architectural Curator"

This design system is engineered to elevate real estate photography from a service to an art form. The **Creative North Star** is "The Architectural Curator"—a philosophy that mirrors the precision, depth, and lighting of high-end property cinematography. 

The system moves away from the "flat web" by embracing **Tonal Depth** and **Intentional Asymmetry**. We achieve this by using a dark, obsidian-like canvas where content is not merely placed, but *revealed* through light and texture. By rejecting standard borders and rigid grids in favor of layered surfaces and sophisticated gold accents, we create a high-end editorial experience that feels as premium as the properties it showcases.

---

## 2. Colors

The palette is rooted in deep structural tones, punctuated by a signature warm gold that mimics the "golden hour" in photography.

### Color Tokens (Material Design Convention)
- **Surface (Base):** `#131313` — The foundation of the application.
- **Primary:** `#f5bc71` — The radiant gold for key CTAs.
- **Primary Container:** `#ce9a52` — The muted gold for secondary emphasis and backgrounds.
- **Surface Container (Lowest to Highest):**
    - `Lowest: #0e0e0e`
    - `Low: #1c1b1b`
    - `Standard: #201f1f`
    - `High: #2a2a2a`
    - `Highest: #353534`

### Design Principles for Color
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined solely through background color shifts. For example, a `surface-container-high` card should sit on a `surface` background to create a visual edge.
*   **Surface Hierarchy & Nesting:** Treat the UI as physical layers. Use `surface-container-lowest` to "recede" into the background and `surface-container-highest` to bring critical interactive elements toward the user.
*   **The "Glass & Gradient" Rule:** To provide "soul" to the UI, use subtle gradients transitioning from `primary` to `primary-container` for main action buttons. For floating navigation or overlays, apply **Glassmorphism**: use a semi-transparent surface color (e.g., `#201f1f` at 80%) with a `20px` backdrop-blur.

---

## 3. Typography

The typography strategy balances the modern technicality of **Manrope** with the clean readability of **Inter**, creating a rhythm that feels both authoritative and accessible.

| Category | Token | Font | Size | Character |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Manrope | 3.5rem | Bold, tight tracking, editorial scale. |
| **Headline**| `headline-md`| Manrope | 1.75rem | Used for section titles; high-contrast. |
| **Title**   | `title-lg`   | Inter   | 1.375rem| Semi-bold; used for card headers. |
| **Body**    | `body-md`    | Inter   | 0.875rem| High-legibility, generous line-height. |
| **Label**   | `label-sm`   | Inter   | 0.6875rem| All-caps for utility or small metadata. |

**Editorial Intent:** Use `display-lg` with intentional negative space. Do not center-align everything; use left-aligned blocks of text against right-aligned imagery to create a sophisticated, asymmetrical tension.

---

## 4. Elevation & Depth

We eschew traditional drop shadows in favor of **Tonal Layering**, which feels more architectural and integrated.

*   **The Layering Principle:** Depth is achieved by "stacking" the surface-container tiers. Use `surface-container-low` for the page body and `surface-container-high` for interactive cards.
*   **Ambient Shadows:** If a floating element (like a modal) requires a shadow, it must be extra-diffused. 
    *   *Shadow Style:* `0px 24px 48px rgba(0, 0, 0, 0.4)`. The shadow should never look "gray"—it should look like a soft occlusion of light.
*   **The "Ghost Border" Fallback:** If an element lacks sufficient contrast against a specific background, use a **Ghost Border**: `outline-variant` (`#504538`) at **15% opacity**.
*   **Glassmorphism:** For overlays, use a blur-heavy glass effect to let property photography "bleed" through the UI, softening the interface and keeping the focus on the visual content.

---

## 5. Components

### Buttons
*   **Primary:** Background: Gradient (`primary` to `primary-container`). Text: `on-primary` (`#452b00`). Radius: `md` (6px).
*   **Secondary:** Background: `surface-container-high`. Text: `primary`. Subtle ghost border.
*   **Tertiary:** No background. Underline on hover using the `primary` color at 2px thickness.

### Cards
*   **Visual Container:** Use `surface-container-high`. 
*   **Rule:** Forbid the use of divider lines inside cards. Use vertical white space (`spacing-6`) to separate headline from body.
*   **Image Handling:** Real estate imagery in cards should have a subtle inner-glow (10% opacity white) to make the photos "pop" against the dark containers.

### Input Fields
*   **State:** Use `surface-container-highest` for the field background. 
*   **Indicator:** Instead of a full-box border, use a 2px bottom-border in `primary` only when the field is **focused**.

### Custom Component: Image Portfolio Scrubber
*   A horizontal carousel that uses `surface-container-lowest` as a track. The active image should have a "Glass" overlay displaying the property name in `label-sm` typography.

---

## 6. Do's and Don'ts

### Do
*   **Do** use the spacing scale (`spacing-16` or `spacing-20`) to create massive "breathing room" between sections.
*   **Do** use asymmetrical layouts where text blocks overlap 10-15% of an image area to create depth.
*   **Do** ensure all "Gold" text (`primary`) meets a 4.5:1 contrast ratio against its background.

### Don't
*   **Don't** use 1px solid white or gray lines to separate content. It breaks the "Architectural Curator" aesthetic.
*   **Don't** use sharp 0px corners. Always use the `DEFAULT` (4px) or `md` (6px) rounding to soften the digital feel.
*   **Don't** use pure black (`#000000`). Use `surface-container-lowest` (`#0e0e0e`) to ensure the display feels premium and not "clipped."