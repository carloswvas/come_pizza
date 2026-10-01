---
name: Obsidian Flame D2C
colors:
  surface: '#111319'
  surface-dim: '#111319'
  surface-bright: '#373940'
  surface-container-lowest: '#0c0e14'
  surface-container-low: '#191b22'
  surface-container: '#1e1f26'
  surface-container-high: '#282a30'
  surface-container-highest: '#33343b'
  on-surface: '#e2e2eb'
  on-surface-variant: '#e4beba'
  inverse-surface: '#e2e2eb'
  inverse-on-surface: '#2e3037'
  outline: '#ab8986'
  outline-variant: '#5b403e'
  surface-tint: '#ffb3ae'
  primary: '#ffb3ae'
  on-primary: '#68000b'
  primary-container: '#ff5352'
  on-primary-container: '#5c0008'
  inverse-primary: '#ba1724'
  secondary: '#ffb690'
  on-secondary: '#552100'
  secondary-container: '#ec6a06'
  on-secondary-container: '#4a1c00'
  tertiary: '#f9bd22'
  on-tertiary: '#402d00'
  tertiary-container: '#b88900'
  on-tertiary-container: '#372700'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad7'
  primary-fixed-dim: '#ffb3ae'
  on-primary-fixed: '#410004'
  on-primary-fixed-variant: '#930014'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb690'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783200'
  tertiary-fixed: '#ffdf9f'
  tertiary-fixed-dim: '#f9bd22'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5c4300'
  background: '#111319'
  on-background: '#e2e2eb'
  surface-variant: '#33343b'
typography:
  display-hero:
    fontFamily: Outfit
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Outfit
    fontSize: 38px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Outfit
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Outfit
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Outfit
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system delivers a tactile, dark-luxury culinary experience tailored for modern artisanal gastronomy. Centered around the primal warmth of woodfire craft, the aesthetic merges the high-end sensory intimacy of an exclusive night kitchen with the precision of contemporary eCommerce. 

Visual principles:
- **Atmospheric Nocturne:** Predominantly deep charcoal and midnight onyx canvas layers, allowing vibrant culinary imagery and heated accents to emerge like glowing embers.
- **Glass & Fireglow:** Subtle frosted layers, delicate perimeter reflections, and warm amber light leaks emulate heat radiating from an artisan woodfire hearth.
- **Artisanal Precision:** Strict geometric alignment paired with bold typographic scale creates an editorial magazine aura, balancing raw craft with computational polish.

## Colors
The palette balances nocturnal depths with chromatic kinetic heat:

- **Midnight Onyx (`#0F1117`):** The primary void canvas, grounding all content in immersive contrast.
- **Oven Charcoal (`#1A1D24`):** Elevated tactile surfaces, drawer panels, and structural card containers.
- **Woodfire Flame Red (`#FF4D4D`):** Primary interactions, urgent calls-to-action, active heat states, and high-energy highlights.
- **Ember Orange (`#F97316`):** Secondary accents, ambient glow highlights, dynamic hover transitions, and progress states.
- **Cheese Gold (`#FBBF24`):** Rating stars, curation badges, award recognition, and premium loyalty indicators.
- **Crust Amber (`#D97706`):** Subtle dividers, hairline border treatments, and baked artisan category tags.
- **Warm Ivory (`#FFFBEB`):** Primary typography and prominent iconography, softening harsh white glare into a buttery, organic glow.
- **Slate Ash (`#94A3B8`):** Secondary metadata, sub-labels, and muted utility elements.

## Typography
The system employs `Outfit` for editorial presence across display and body copy—offering a warm geometric structure with open counters that mimic dough bubbles and hearth geometry. `Space Grotesk` introduces a crisp culinary-lab aesthetic for micro-copy, nutritional specs, cooking temperatures, prices, and status indicators.

Uppercase transformation is reserved exclusively for `label-sm` and `label-md` when rendering metadata chips, baking temperatures, and crust categories.

## Layout & Spacing
Built on a strict 8pt rhythmic grid to preserve visual tension and breathing room around rich food imagery:

- **Desktop (1024px+):** 12-column layout, max-width bounded at 1440px with `3rem` (`48px`) margins and `1.5rem` (`24px`) gutters.
- **Tablet (768px - 1023px):** 8-column layout, `2rem` (`32px`) margins and `1.25rem` (`20px`) gutters.
- **Mobile (< 768px):** 4-column layout, fluid full-width modules, `1.25rem` (`20px`) outer margins, and `1rem` (`16px`) gutters.

Component padding expands generously to communicate artisanal calm. Product grids enforce asymmetric rhythm: featured woodfire drops span 8 columns paired with a 4-column pairing module (oils, wine, crust dips).

## Elevation & Depth
Depth is constructed through optical stratification using luminous glassmorphism and warm atmospheric back-lighting instead of conventional neutral dropshadows:

- **Ground Level (Canvas):** Pure `#0F1117` with low-opacity radial thermal gradients (`rgba(249, 115, 22, 0.04)`) anchored in section corners to convey oven hearth radiation.
- **Level 1 (Cards & Trays):** Semi-translucent Oven Charcoal (`rgba(26, 29, 36, 0.82)`) with `backdrop-filter: blur(16px)` and a continuous hairline stroke of `rgba(255, 255, 255, 0.08)`.
- **Level 2 (Interactive Floating Modules & Modals):** `rgba(32, 36, 45, 0.92)` glass with a compound elevation:
  - Ambient base: `0 20px 40px -10px rgba(0, 0, 0, 0.6)`
  - Thermal rim glow: `0 0 24px -4px rgba(249, 115, 22, 0.12)`
- **Level 3 (Primary Heat Trigger):** Active primary buttons and badges emit a soft thermal aura: `0 8px 24px -4px rgba(255, 77, 77, 0.35)`.

## Shapes
Shapes echo the soft, hand-stretched contour of artisanal dough. The baseline scale (`2`) produces:
- **Base (0.5rem / 8px):** Micro badges, form controls, and selection tokens.
- **Large (1rem / 16px):** Standard dish cards, floating ingredient panels, order status modules.
- **Extra Large (1.5rem / 24px):** Hero feature banners, modal sheets, and checkout modules.

Pill radii are applied exclusively to counter buttons (e.g., quantity selectors `+ / -`), global tags, and cart pill triggers to contrast with architectural container corners.

## Components

### Buttons
- **Primary ("Ignite"):** Solid Woodfire Flame Red (`#FF4D4D`) with Warm Ivory (`#FFFBEB`) text, subtle ember shadow, and a 16px border-radius. On hover, smooth transition to Ember Orange (`#F97316`) with a 4px upward translation.
- **Secondary ("Smolder"):** Translucent Charcoal (`rgba(26, 29, 36, 0.8)`) with 1px border `rgba(255, 255, 255, 0.12)`. On hover, the border transitions to Crust Amber (`#D97706`) with text brightening to Warm Ivory.
- **Ghost:** Text-only in Slate Ash (`#94A3B8`) shifting to `#FF4D4D` with an inline glowing underline indicator.

### Cards & Menu Containers
- Backed with Oven Charcoal glass (`rgba(26, 29, 36, 0.8)`) and border `1px solid rgba(255, 255, 255, 0.08)`.
- Internal imagery uses soft bottom-fade masks to blend seamlessly into container surfaces.
- Hover states subtly scale the food photography while tinting the top card perimeter with an Ember Orange hairline reflection.

### Chips & Ingredient Tags
- Rendered in `Space Grotesk` uppercase (`label-sm`).
- Unselected: Dark slate background (`rgba(255, 255, 255, 0.04)`) with muted Slate Ash text.
- Active/Selected: Outlined in Cheese Gold (`#FBBF24`) or Ember Orange (`#F97316`) with matched low-opacity background fill (`rgba(251, 191, 36, 0.1)`).

### Input Fields & Selectors
- Background: `#13161C` with an inset hairline border `1px solid rgba(255, 255, 255, 0.08)`.
- Focus state: Border smoothly turns into Crust Amber (`#D97706`) with an ambient outer glow of `0 0 0 3px rgba(249, 115, 22, 0.15)`.
- Input text: Warm Ivory (`#FFFBEB`) with placeholder in Slate Ash (`#64748B`).

### Checkboxes & Radios
- Custom rounded squares (8px radius) and concentric circles.
- Active state fills with Woodfire Flame Red (`#FF4D4D`) accompanied by a white flame or check glyph.

### Domain-Specific Components
- **Oven Temperature Live Gauge:** Radial circular meter tracking baking deck temps (e.g., "900°F Neapolitan") using Ember-to-Flame gradients.
- **Crust Fermentation Badge:** Minimalist pill displaying dough proofing hours (e.g., "72H BIGA FERMENT") styled in `Space Grotesk` with a cheese-gold dot indicator.