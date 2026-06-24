---
version: 1.0
name: Nour
description: A warm, calming French-language Islamic wellness PWA on a beige/off-white canvas. Each screen carries its own pastel accent (green for Home/branding, orange for Mood, violet for Journal, blue for Breathing, gold for Content, rose for Profile, teal for Support) layered over a shared neutral base. Shapes are soft — rounded cards, pill badges and buttons, no hard corners. Type is modest in weight; the system trusts whitespace and color over typographic muscle, in the spirit of Airbnb's DESIGN.md but adapted to a single-column mobile-first wellness app.

colors:
  green-deep: "#2D5016"
  green-mid: "#4A7C59"
  green-soft: "#6B9E78"
  green-light: "#E8F0E4"
  gold-muted: "#B8963E"
  gold-light: "#F2E6C8"
  beige: "#F5F0E8"
  beige-dark: "#EDE6D8"
  charcoal: "#2C2A26"
  charcoal-mid: "#4A4740"
  charcoal-light: "#7A7570"
  off-white: "#FDFAF5"
  surface: "#FFFFFF"
  surface-2: "#F8F4EE"
  border: "rgba(44,42,38,0.12)"
  danger: "#8B2500"
  danger-bg: "#FDF0EB"

accent-themes:
  default-green: { deep: "#2D5016", mid: "#4A7C59", light: "#E8F0E4" }
  orange: { deep: "#C97B3D", mid: "#E0A876", light: "#FBEEDF" }
  violet: { deep: "#6B5B95", mid: "#9C8AC4", light: "#EFEAFA" }
  blue: { deep: "#3E6E8E", mid: "#7FAFC9", light: "#E6F2F7" }
  gold: { deep: "#B8963E", mid: "#D9B871", light: "#F2E6C8" }
  rose: { deep: "#B5707A", mid: "#D99FA8", light: "#F9E8EA" }
  teal: { deep: "#3D7A6E", mid: "#6FA89B", light: "#E3F1EE" }

typography:
  page-title:
    fontSize: 1.3-1.6rem
    fontWeight: 600
    color: "{accent.deep}"
  section-title:
    fontSize: 1rem
    fontWeight: 600
    color: "{colors.charcoal}"
  body-label:
    fontSize: 0.85-0.95rem
    fontWeight: 400-500
    color: "{colors.charcoal-mid}"
  caption:
    fontSize: 0.7-0.8rem
    fontWeight: 400-500
    color: "{colors.charcoal-light}"
  arabic:
    fontFamily: "'Amiri', serif"
    direction: rtl
    lineHeight: 2

rounded:
  sm: 8px
  md: 12px
  lg: 20px
  xl: 28px
  full: 9999px

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  base: 16px
  lg: 24px
  xl: 32px
  xxl: 48px

components:
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.border}"
    padding: "1rem 1.25rem"
    boxShadow: "0 1px 4px rgba(44,42,38,0.08)"
  badge-pill:
    rounded: "{rounded.full}"
    padding: "2px 8px"
    fontSize: 0.7-0.8rem
    fontWeight: 500
  button-primary:
    backgroundColor: "{accent.deep}"
    textColor: white
    rounded: "{rounded.md}"
    fontWeight: 600
  disclaimer:
    backgroundColor: "{colors.gold-light}"
    rounded: "{rounded.sm}"
    fontSize: 0.8rem
  emergency-banner:
    backgroundColor: "{colors.danger-bg}"
    textColor: "{colors.danger}"
    rounded: "{rounded.sm}"
---

## Overview

Nour is a single-column, mobile-first (max-width 430px) PWA for Islamic emotional wellbeing — mood tracking, journaling, guided breathing, adhkâr/duas/hadiths, and a directory of Muslim mental-health and religious resources. The base canvas is warm **beige** (`#F5F0E8`), never pure white or pure black — text runs on a near-black **charcoal** (`#2C2A26`).

### Per-screen accent system

Unlike a single-brand-color system, Nour gives each feature screen its own pastel accent via a `.theme-*` class on the page root, which overrides three CSS custom properties consumed everywhere on that screen:

```css
--accent-deep   /* titles, primary buttons, active states */
--accent-mid    /* secondary accents, borders, progress */
--accent-light  /* badge/chip backgrounds, soft fills */
```

| Screen | Class | Accent |
|---|---|---|
| Accueil, Onboarding, Connexion | *(none — default)* | Green (brand) |
| Humeur | `.theme-orange` | Orange |
| Journal | `.theme-violet` | Violet |
| Souffle | `.theme-blue` | Blue |
| Contenu islamique | `.theme-gold` | Gold |
| Profil | `.theme-rose` | Rose |
| Soutien | `.theme-teal` | Teal |

Onboarding, Login and Register intentionally keep the green brand color — they're the first impression and should feel consistent regardless of which screen the user lands on next.

**Semantic exception:** the Coran/Hadith badge inside `ContentPage`'s `ReflectionCard` is hardcoded green/gold (not accent-driven) because it distinguishes *source type*, not screen identity — changing it with the page theme would lose that meaning.

## Shape & Elevation

Soft everywhere: cards at 12px radius, dialogs/onboarding at 20-28px, every badge and pill button at `{rounded.full}`. One shadow tier (`--shadow-card`), used on every `.card` — no layered elevation system. Depth comes from the beige/white surface contrast and the per-screen tint, not from shadows.

## Typography

No custom webfont for Latin text — `DM Sans` (system-ui fallback) for everything, `Amiri` (serif) exclusively for Arabic text via the `.arabic` class (`direction: rtl`, `line-height: 2` — Arabic needs more vertical room for diacritics).

Page titles run 1.3–1.6rem / 600 weight, colored with `--accent-deep` (not a fixed charcoal) — this is how each screen telegraphs its identity even before any content loads. Body copy stays 0.85–0.95rem at charcoal-mid; captions and metadata drop to 0.7–0.8rem at charcoal-light.

## Components

- **`.card`** — the universal content container: white surface, 12px radius, 1px border, single shadow tier.
- **Badge pills** — `var(--radius-full)` + 2px 8px padding, accent-light background / accent-deep text. Used for tags, authenticity labels, mood triggers, directory contact links.
- **`.disclaimer`** — gold-tinted box for provisional-content or medical-disclaimer notices. Appears wherever the app needs to flag "this isn't professional advice" or "this content needs scholarly review."
- **`.emergency-banner`** — danger-red box, reserved exclusively for crisis/suicide-prevention messaging. Never reuse this color for anything else — it must stay rare and alarming.

## Working with this file

Update this file when the design system changes (new accent theme, new component pattern, new typography rule) so it stays a reliable reference for whoever — human or agent — touches the UI next.
