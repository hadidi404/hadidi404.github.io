# Rayson Tech Services Website

Source code for the official website of **Rayson Tech Services** — a device repair portfolio and service showcase.

---

## Tech Stack

- **Vue 3** — Composition API (`<script setup>`)
- **Vue Router** — HTML5 history, clean URLs
- **Tailwind CSS v4** — via `@tailwindcss/vite` plugin
- **Vite** — build tool
- **Vercel** — hosting with serverless API routes
- **MongoDB Atlas** — repair data storage
- **Cloudinary** — image storage and CDN delivery

---

## Site Structure

| Route | Description |
|---|---|
| `/` | Homepage — all main sections |
| `/repairs` | Repair gallery |
| `/admin` | Admin — create and edit repairs |
| `/admin/manage` | Admin — reorder repairs via drag and drop |

### Homepage sections

- **Home** — hero with stats and CTAs
- **Services** — phone, laptop, and diagnostics service cards
- **Recent Repairs** — live data from MongoDB with before/after toggle
- **Why Choose Me** — trust and value cards
- **About** — bio, photo, and quick stats
- **Service Area** — Baguio City and Infanta locations
- **Contact** — phone, Messenger, and location info

---

## Project Structure

```
src/
  components/
    layout/       # Navbar, Footer
    sections/     # Homepage sections
    ui/           # RecentRepairCards and other reusable components
  pages/
    HomePage.vue
    GalleryPage.vue
    AdminPage.vue
    AdminManagePage.vue
  router/
    index.js
  main.js         # App entry; registers global v-animate directive
  style.css
api/
  repairs.js      # Vercel serverless handler (GET, POST, PATCH, DELETE)
  lib/
    mongodb.js    # MongoDB connection
public/
  images/         # Static assets
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `ADMIN_SECRET` | Password for admin access |
| `VITE_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Cloudinary unsigned upload preset |

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
