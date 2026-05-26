# Rayson Tech Services Website

This repository contains the source code for the official website of **Rayson Tech Services**.

The site is a showcase website built with **Vue 3, Vue Router, and Tailwind CSS v4**.  
It presents services, recent repair work, and contact information —  
no booking system or customer portal is included.

---

## Tech Stack

- **Vue 3** — Composition API (`<script setup>`)
- **Vue Router 4** — hash history for GitHub Pages compatibility
- **Tailwind CSS v4** — via `@tailwindcss/vite` plugin
- **Vite** — build tool with vendor chunk splitting
- **GitHub Pages** — hosted at `hadidi404.github.io`

---

## Site Structure

| Route | Description |
|---|---|
| `/` | Home page — all main sections |
| `/#/repairs` | Repairs gallery page |

The home page is divided into the following sections:

- **Home** — hero with stats and CTAs
- **Services** — phone, laptop, and diagnostics service cards
- **Recent Repairs** — photo grid with a link to the full gallery
- **Why Choose Me** — trust and value cards
- **About** — bio, photo, and quick stats
- **Service Area** — Baguio City and Infanta locations
- **Contact** — phone, Messenger, and location info

Navigation uses smooth scroll to section IDs with active highlight tracking.

---

## Project Structure

```
src/
  components/
    layout/       # Navbar, Footer
    sections/     # Page sections (HomeSection, ServicesSection, etc.)
    ui/           # Reusable components (ServiceCard, SectionTitle, etc.)
  pages/
    HomePage.vue
    GalleryPage.vue
  router/
    index.js
  main.js         # App entry; registers global v-animate directive
  style.css
public/
  about.jpg
  sunglass.png
  favicon.svg
```

---

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
