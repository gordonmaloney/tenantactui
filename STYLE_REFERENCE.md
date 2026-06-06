# TenantAct UI Style Reference

This document records the visual rules TenantAct UI should defer to when adding new components. It is based on the current `tenantactUI` catalogue, the attached component-library screenshots, and the nearby ReachOut, Amplify, and Tribunal Scraper Vite projects.

The goal is a coherent internal TenantAct component layer: civic, practical, serious, warm, and recognisably related to ReachOut and Amplify, without looking like stock MUI.

## Source Priorities

Use this order when a new component needs a visual decision:

1. `src/lib/tokens/tenantact.css` in this project.
2. Existing TenantAct UI reusable components in `src/lib/components`.
3. The component-library poster screenshots.
4. ReachOut and Amplify for TenantAct family patterns.
5. Tribunal Scraper for restraint, document clarity, and simple data layouts.

ReachOut and Amplify are the strongest references for typography, brand feel, green accents, borders, and compact controls. Tribunal Scraper is visually more neutral, so use it as a reminder to keep dense views readable rather than as the main palette source.

## Typography

Use the same type family across TenantAct projects:

- Display: `Bebas Neue`, via `--ta-font-display`.
- Body: `Roboto`, via `--ta-font-body`.
- Labels and code-like UI: `Space Mono`, via `--ta-font-mono`.

Display headings should be condensed, uppercase, and confident. In reusable components, avoid dramatic letter spacing. ReachOut uses wider display letter spacing in product shells, but the component library should stay more neutral so it works inside admin and documentation surfaces.

Recommended sizes:

- App/product wordmark: `32px` to `38px`, line-height `1`.
- Page h1: `clamp(2.2rem, 4vw, 4.2rem)`, line-height `0.95`.
- Panel/detail h2: about `1.75rem`.
- Card title: `1rem`, weight `700`.
- Body text: default `1rem`, line-height `1.45` to `1.6`.
- Small helper text: `0.72rem` to `0.86rem`.
- Mono labels/eyebrows: `0.68rem` to `0.75rem`, uppercase, weight `700` or `800`.

Do not use negative letter spacing in the catalogue or library components. Use `letter-spacing: 0` unless matching a product wordmark.

## Colour Tokens

Canonical light-mode tokens:

| Token | Value | Use |
| --- | --- | --- |
| `--ta-green` | `#1e633b` | Primary actions, selected states, progress, key icons |
| `--ta-green-dark` | `#13582b` | Primary text on pale green, stronger links |
| `--ta-green-soft` | `#dcefe2` | Active nav, positive badges, icon tiles |
| `--ta-green-soft-2` | `#eef7f0` | Soft green surface fills |
| `--ta-bg` | `#f6f4ed` | Warm page background |
| `--ta-bg-warm` | `#fffefa` | Header and clean field surfaces |
| `--ta-surface` | `#fffefa` | Cards, panels, popovers |
| `--ta-surface-muted` | `#f1f6ef` | Empty states, dropzones, soft cards |
| `--ta-border` | `#dedbd0` | Default 1px border and dividers |
| `--ta-border-strong` | `#c9c4b7` | Dashed borders, handles, stronger separation |
| `--ta-text` | `#141817` | Main charcoal text |
| `--ta-text-muted` | `#626b64` | Secondary copy |
| `--ta-text-soft` | `#7e857f` | Counts, hints, low-emphasis labels |
| `--ta-warning` | `#b87612` | Warning accents |
| `--ta-danger` | `#d64a45` | Destructive/error accents |
| `--ta-info` | `#2f6f9f` | Informational accents |

ReachOut and Amplify light mode use a nearby green around `#317144`. The poster palette uses a deeper forest green around `#1e633b`. For the shared component library, prefer `#1e633b`: it is closer to the screenshot and still sits comfortably beside ReachOut and Amplify.

Avoid raw colour literals in new components. If a one-off colour is needed, add a token first unless it is truly local to a demo.

## Text Colour

Use charcoal for primary content, not pure black:

- Primary: `var(--ta-text)`.
- Secondary paragraphs: `var(--ta-text-muted)`.
- Low-emphasis meta: `var(--ta-text-soft)`.
- Green links and active labels: `var(--ta-green-dark)`.
- Text on solid green: white.

Muted text should remain legible. Do not push helper text below `#7e857f` on warm backgrounds without checking contrast.

## Surfaces

The TenantAct light theme should feel warm and paper-like rather than white SaaS chrome.

Preferred surfaces:

- Page background: warm off-white gradient using `--ta-bg-warm` and `--ta-bg`.
- Cards and panels: `--ta-surface`, sometimes mixed with `--ta-green-soft`.
- Soft cards and empty states: `--ta-surface-muted`.
- Preview/demo surfaces: pale green-white wash with a very subtle dotted texture.

Use full-width bands or plain layouts for page sections. Reserve cards for repeated items, panels, component previews, modals, and actual framed tools.

## Borders, Dividers, Shadows

Default border:

```css
border: 1px solid var(--ta-border);
```

Default divider:

```css
border-top: 1px solid var(--ta-border);
```

Use `--ta-border-strong` only when the boundary needs clearer affordance, such as dropzones or drag handles.

Shadows should be soft and sparse:

- Small raised surfaces: `--ta-shadow-sm`.
- Sticky/detail panels and bottom sheets: `--ta-shadow-md`.
- Avoid glossy, high-contrast shadows.
- Hover lift should be subtle: about `translateY(-1px)` if used at all.

## Radius

Use modest radiuses. The screenshots and existing apps favour rounded but not pillowy UI.

- Tiny tags and inner controls: `--ta-radius-xs` (`4px`).
- Buttons, icon buttons, inputs, small active nav items: `--ta-radius-sm` (`6px`).
- Cards, category tiles, tables, modals: `--ta-radius-md` (`8px`).
- Larger panels, drawers, bottom nav: `--ta-radius-lg` (`12px`).
- Large shell panels only: `--ta-radius-xl` (`18px`).
- Pills and avatars may use `999px`.

Do not use large rounded cards as a default decorative style. Keep cards at `8px` unless the component has a specific reason to be softer.

## Buttons And Controls

Buttons should use Roboto, not the display font. They should be compact, purposeful, and easy to scan.

Recommended button metrics:

- Medium button: min-height `36px`, padding `8px 16px`, radius `6px`.
- Small button: min-height `30px`, padding `5px 12px`.
- Large button: min-height `44px`, padding `10px 22px`.
- Icon button: `36px` square, radius `6px`.

Primary buttons use a restrained green vertical gradient from `--ta-green` to `--ta-green-dark`. Outline buttons use `--ta-bg-warm`, green text, and a green-tinted border. Ghost buttons should be transparent and shadowless.

Do not expose raw MUI buttons in catalogue examples. Use `TenantButton` and `TenantIconButton`.

## Cards And Tiles

Standard cards:

- Border: `1px solid var(--ta-border)`.
- Radius: `8px`.
- Padding: `16px` to `20px`.
- Background: `var(--ta-surface)` or a subtle `color-mix` with `--ta-green-soft`.
- Shadow: `--ta-shadow-sm`.

Icon tiles inside cards:

- Size: `38px` to `52px`.
- Radius: `6px` to `8px`.
- Background: `--ta-green-soft` or `--ta-green-soft-2`.
- Icon colour: `--ta-green-dark`.

Card copy should be short and secondary text should use `--ta-text-muted`.

## Forms

Form fields should feel calm and utilitarian.

- Inputs and selects use `--ta-bg-warm`.
- Radius: `6px`.
- Border: `--ta-border`.
- Focus: green outline or green border plus soft green ring.
- Labels can be MUI labels for ordinary fields, or mono uppercase labels for compact catalogue/form groups.

Use MUI internally for accessible fields where useful, but wrap it through TenantAct components.

## Status And Feedback

Status pills and badges:

- Radius: `6px`.
- Font size: about `0.78rem`.
- Weight: `700`.
- Padding: around `5px 9px`.

Semantic fills:

- Ready/active/success: `--ta-green-soft` with `--ta-green-dark`.
- In progress/warning: `--ta-warning-soft` with a dark amber text.
- Error/destructive: `--ta-danger-soft` with dark red text.
- Draft/neutral: warm grey such as `#eeece5` with charcoal text.

Alerts and callouts should use token-based soft backgrounds and a simple 1px border. Avoid loud saturated banners.

## Layout Density

TenantAct UI should support organiser/admin work, so favour dense but breathable layouts:

- Shell top bars: `74px` to `80px` high.
- Sidebars: around `260px` to `292px`.
- Main content padding: `32px` to `52px` on desktop, `16px` to `26px` on mobile.
- Grid gaps: `12px` to `18px` for cards, `20px` to `32px` for major layout columns.

Avoid oversized marketing compositions inside the component catalogue. The first screen should be a working catalogue, not a landing page.

## Motion And Interaction

Keep motion minimal:

- Use quick transitions around `0.2s` to `0.25s`.
- Prefer border/background changes to large movement.
- If using movement, `translateY(-1px)` is enough.

Focus states must be visible:

```css
outline: 2px solid var(--ta-green);
outline-offset: 2px;
```

## MUI Usage

MUI is allowed and useful for behaviour-heavy components such as Dialog, Drawer, Tabs, Select, Menu, Tooltip, and accessible form controls.

Rules:

- Reusable library components wrap MUI in `src/lib`.
- Catalogue code imports TenantAct components, not raw MUI controls, unless it is only internal layout.
- Override MUI styling with TenantAct classes and tokens.
- The public API should say TenantAct things, such as `variant="primary"` or `tone="soft"`, not MUI implementation details.

## Current Catalogue Alignment Notes

The current catalogue is close to the target family:

- It uses the shared font stack from ReachOut and Amplify.
- It keeps the library/catalogue boundary clean.
- It uses warm off-white backgrounds, pale green surfaces, charcoal text, soft borders, and compact controls.
- The primary green has been aligned to the deeper poster-style `#1e633b`.

When extending the catalogue, check new work against these risks:

- Green too bright or too saturated.
- Text too small or too faint inside cards.
- Cards becoming too rounded or too decorative.
- Stock MUI components appearing without TenantAct wrapping.
- Purple, blue, beige, or grey palettes taking over the page.
- Hero-scale typography being used inside compact panels.

## Dark Mode Placeholder

Do not implement dark mode yet. Keep future work token-driven so a later `[data-theme="dark"]` block can be added without rewriting component CSS.
