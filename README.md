# The Stash House — Official Gastropub Website

> A production-grade, immersive, interactive website for **The Stash House**, Haridwar's premier speakeasy gastropub, cocktail lounge, and private gathering venue located on the First Floor of The Pentagon Mall.

---

## 🥃 Table of Contents
1. [Overview & Tech Stack](#overview--tech-stack)
2. [Quickstart & Setup](#quickstart--setup)
3. [Environment Variables](#environment-variables)
4. [Project Structure](#project-structure)
5. [How to Edit Content](#how-to-edit-content)
   - [Editing Menu Items & Pricing](#editing-menu-items--pricing)
   - [Editing Operating Hours & Live Badge](#editing-operating-hours--live-badge)
   - [Adding / Changing Venue Photos](#adding--changing-venue-photos)
   - [Swapping the Official Logo File](#swapping-the-official-logo-file)
6. [API Endpoints](#api-endpoints)
7. [Testing & Verification](#testing--verification)
8. [Unverified Facts & Placeholders (Confirmation Checklist)](#unverified-facts--placeholders-confirmation-checklist)
9. [Photo Licensing & Intellectual Property Note](#photo-licensing--intellectual-property-note)

---

## 1. Overview & Tech Stack

- **Framework**: Next.js 16 (App Router, Server & Client Components)
- **Language**: TypeScript (Strict typing)
- **Styling**: Tailwind CSS v4 + Custom Speakeasy Design Tokens
- **3D Hero WebGL**: Three.js (ACESFilmic tone mapping, ambient warm lighting, hanging pendant lamps, floating dust motes & crystal decanters)
- **Icons**: Lucide React
- **Validation**: Zod + Native HTML5 Constraint Validation
- **Accessibility & Overlays**: Modern Web Guidance (`<dialog:modal>`, `dialog::backdrop`, `overscroll-behavior: contain`, `:user-invalid` styling)
- **SEO**: Structured JSON-LD schema (`Restaurant`, `BarOrPub`), OpenGraph tags, dynamic `sitemap.ts`, `robots.ts`

---

## 2. Quickstart & Setup

### Prerequisites
- Node.js 18.x or later (Tested with Node v26)
- npm 10.x or later

### Installation
```bash
cd the-stash-house
npm install
```

### Development Server
```bash
npm run dev
# The local development server will start at http://localhost:3000
```

### Production Build & Launch
```bash
npm run build
npm run start
```

### Running Automated Tests
```bash
npm test
# Runs the native Node.js test suite for Zod validation and live venue hours logic
```

---

## 3. Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

| Variable | Description | Default / Example |
|---|---|---|
| `NODE_ENV` | Application environment | `production` |
| `PORT` | Local server port | `3000` |
| `OWNER_NOTIFICATION_EMAIL` | Owner email for reservation alerts | `contact@thestashhouse.in` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Restaurant WhatsApp for direct customer chat | `918599000029` |
| `NEXT_PUBLIC_SITE_URL` | Canonical public URL for SEO & sitemaps | `https://thestashhouse.in` |

---

## 4. Project Structure

```text
the-stash-house/
├── public/
│   └── images/
│       └── stash/               # 20 downloaded high-res authentic photos
│           ├── manifest.json    # Photo metadata & verified alt text
│           └── stash-*.jpg
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── reservations/    # POST /api/reservations (Zod + Honeypot + Rate Limit)
│   │   │   └── contact/         # POST /api/contact
│   │   ├── menu/page.tsx        # Dedicated /menu route with search & dietary filters
│   │   ├── reserve/page.tsx     # Dedicated /reserve booking route
│   │   ├── globals.css          # Tailwind CSS v4 design tokens & modal rules
│   │   ├── layout.tsx           # Root layout, metadata & fluid typography
│   │   ├── page.tsx             # Interactive Home landing page
│   │   ├── robots.ts            # Dynamic robots.txt
│   │   └── sitemap.ts           # Dynamic sitemap.xml
│   ├── components/
│   │   ├── brand/Logo.tsx       # Vector speakeasy crest logo
│   │   ├── hero/                # Three.js WebGL hero canvas & hero banner
│   │   ├── navigation/          # Desktop/Mobile Nav, Footer, Sticky Mobile Bar
│   │   ├── sections/            # Story, Experience, Menu, Bar, Gallery, Events, Reviews, Visit
│   │   └── ui/                  # Button, Section, Reveal, MenuCard, Modal, Marquee, BookingForm
│   └── data/
│       ├── restaurant.ts        # Official venue data & live hours calculator (Asia/Kolkata)
│       ├── menu.ts              # Typed menu data with categories & dietary tags
│       ├── gallery.ts           # 20 authentic photos with categories
│       └── reviews.ts           # Google review highlights
├── test/
│   └── validation-and-hours.test.js # Unit tests for API schema & open-now logic
└── package.json
```

---

## 5. How to Edit Content

### Editing Menu Items & Pricing
Open [`src/data/menu.ts`](file:///e:/antigravity%20projects/the-stash-house/src/data/menu.ts). Each item has:
```ts
{
  id: "paneer-sufiyana",
  name: "Paneer Sufiyana Tikka",
  category: "starters", // "starters" | "mains" | "biryani" | "continental" | "desserts" | "cocktails" | "mocktails"
  description: "Tender malai paneer cubes infused with ground fennel...",
  dietary: ["veg", "signature"], // "veg" | "non-veg" | "vegan" | "signature" | "alcoholic"
  price: 395, // Set verified rupee price here
  isChefSpecial: true,
  ingredients: ["Fresh Paneer", "Fennel Pollen", "Cardamom"],
  pairing: "Pairs with Haridwar Highball"
}
```

### Editing Operating Hours & Live Badge
Open [`src/data/restaurant.ts`](file:///e:/antigravity%20projects/the-stash-house/src/data/restaurant.ts):
```ts
hours: {
  display: "11:00 AM – 11:30 PM",
  openHour: 11,
  openMinute: 0,
  closeHour: 23,
  closeMinute: 30,
  days: "Monday – Sunday (All 7 Days)",
}
```
The live badge automatically converts the user's local time to `Asia/Kolkata` (IST) and calculates whether the venue is currently open and displays the remaining hours.

### Adding / Changing Venue Photos
1. Place image files into `public/images/stash/`.
2. Register the image in [`src/data/gallery.ts`](file:///e:/antigravity%20projects/the-stash-house/src/data/gallery.ts) with meaningful `alt`, `title`, and `category` (`interior` | `bar` | `food` | `gatherings`).

### Swapping the Official Logo File
When the client provides the official logo file:
1. Save the file to `public/images/logo.png` (or `.svg`).
2. Update [`src/components/brand/Logo.tsx`](file:///e:/antigravity%20projects/the-stash-house/src/components/brand/Logo.tsx) to render the client's asset.

---

## 6. API Endpoints

### `POST /api/reservations`
Submits table booking.
- **Request Body**:
  ```json
  {
    "name": "Aarav Malhotra",
    "phone": "+91 98765 11111",
    "email": "aarav@example.com",
    "date": "2026-11-25",
    "time": "20:00",
    "guests": "4",
    "occasion": "Anniversary",
    "notes": "Corner table preferred",
    "honeypot": ""
  }
  ```
- **Responses**:
  - `201 Created`: `{ "success": true, "reservationId": "..." }`
  - `400 Bad Request`: Validation failure message
  - `429 Too Many Requests`: Rate limit protection

### `POST /api/contact`
General inquiries and feedback.

---

## 7. Testing & Verification

Run the test suite:
```bash
npm test
```
All 8 test assertions verify Zod input boundary sanitization and accurate Asia/Kolkata timezone open/close boundaries.

---

## 8. Unverified Facts & Placeholders (Confirmation Checklist)

Before launching to the public, the owner or management should confirm:
1. **Exact Item Prices**: Dishes in `src/data/menu.ts` currently list authentic item descriptions without hardcoded prices until the owner supplies the current physical menu card pricing.
2. **Official Email Address**: Currently configured as `contact@thestashhouse.in` (`// TODO: confirm with owner`).
3. **Pincode**: Confirmed on public records as `249403` (Sector 12, SIDCUL, BHEL Township). Please cross-verify against trade license.
4. **Happy Hour / Live Music Nights**: Weekend live music is highlighted per Google reviews; specific DJ timings or acoustic nights can be configured in `src/data/restaurant.ts`.

---

## 9. Photo Licensing & Intellectual Property Note

The 20 high-resolution images located in `public/images/stash/` were downloaded from public business listings (Restaurant Guru / Google Maps place listing) for development, visual palette extraction, and prototype testing.
As noted in the project brief, **the website owner must confirm owner permission or supply their proprietary photography before public commercial launch**.
