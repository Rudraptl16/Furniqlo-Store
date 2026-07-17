# 🛋️ Furniqlo — Premium Furniture Store

<div align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0066?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</div>

<br />

> **Furniqlo** is a premium, modern e-commerce furniture store built with React 19, TypeScript, and Vite. It delivers a stunning shopping experience with fluid animations, a fully functional cart, and an immersive product catalogue.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🛒 **Shopping Cart** | Full cart drawer with quantity controls, item removal, and totals |
| 💳 **Checkout Flow** | Multi-step simulated checkout with success notification |
| 🔍 **Live Search** | Real-time product search across name and category |
| 🏷️ **Category Filters** | Filter products by Artisanal, Modern, Minimalist, Vintage |
| ❤️ **Wishlist** | Add/remove items to a persistent wishlist |
| 🪟 **Quick View Modal** | Detailed product modals with specs, features, and carousel |
| 🌍 **Multi-Currency** | Switch between USD, EUR, and INR |
| 📱 **Responsive** | Fully optimised for mobile, tablet, and desktop |
| 🎨 **Custom Cursor** | Premium magnetic cursor effect on desktop |
| ⚡ **Framer Motion** | Smooth page and component animations throughout |
| 🧑‍💼 **Admin Panel** | Basic admin route for product management at `/admin` |
| 📊 **Vercel Analytics** | Integrated `@vercel/analytics` for production insights |

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **  ** | UI rendering & component architecture |
| **TypeScript** | Type-safe codebase |
| **Vite 8** | Lightning-fast dev server & build tool |
| **React Router DOM v7** | Client-side routing (`/`, `/admin`) |
| **Framer Motion v12** | Animation & gesture library |
| **Lucide React** | Modern icon library |
| **i18next** | Internationalisation foundation |
| **Recharts** | Admin analytics charts |
| **Vanilla CSS** | Custom design system — no frameworks |
| **Vercel Analytics** | Real-time usage analytics |

---

## 📁 Project Structure

```
Furniture/
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Local images
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky navbar with mobile hamburger
│   │   ├── MobileMenu.tsx      # Full-screen animated mobile menu
│   │   ├── Hero.tsx            # Hero section with parallax
│   │   ├── Features.tsx        # Key selling-point strip
│   │   ├── FeaturedProducts.tsx # Curated top picks carousel
│   │   ├── BrandStory.tsx      # Brand narrative section
│   │   ├── Craftsmanship.tsx   # Craft & quality section
│   │   ├── PromoSection.tsx    # Promotional banner
│   │   ├── CategoryShowcase.tsx # Category tabs grid
│   │   ├── ProductGrid.tsx     # All Products with filters
│   │   ├── SpecialCollections.tsx # Curated collections
│   │   ├── Newsletter.tsx      # Email subscription
│   │   ├── CartDrawer.tsx      # Slide-in cart sidebar
│   │   ├── ProductModal.tsx    # Quick view modal
│   │   ├── CheckoutModal.tsx   # Multi-step checkout
│   │   ├── Admin.tsx           # Admin dashboard (/admin)
│   │   ├── CustomCursor.tsx    # Magnetic cursor component
│   │   ├── Dropdown.tsx        # Currency/language dropdown
│   │   └── MagneticButton.tsx  # Magnetic hover button
│   ├── context/
│   │   └── CartContext.tsx     # Global cart, wishlist & currency state
│   ├── data/
│   │   └── products.ts         # Full product catalogue (20+ items)
│   ├── i18n.ts                 # i18next configuration
│   ├── App.tsx                 # Root app & routing
│   ├── App.css                 # Component-level styles
│   └── index.css               # Global design tokens & base styles
├── index.html
├── vite.config.ts
├── tsconfig.json
├── vercel.json                 # SPA rewrite rule for Vercel
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** v9+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Rudraptl16/Furniqlo-Store.git

# 2. Navigate into the project
cd Furniqlo-Store

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 🔗 Routing

| Route | Component | Description |
|---|---|---|
| `/` | `Home` | Main storefront page |
| `/admin` | `Admin` | Admin product management panel |

> The `vercel.json` includes an SPA rewrite rule so all routes resolve correctly on Vercel.

---

## 🎨 Design System

The project uses a custom CSS design system defined in `index.css`:

```css
--primary:      #1a1a1a        /* Rich black */
--accent:       #d4a373        /* Warm gold */
--accent-light: #e6c8a8        /* Light gold */
--bg-hero:      #dce7ee        /* Soft blue-grey hero */
--bg-cream:     #f9f7f2        /* Cream background */
--font-serif:   'Playfair Display', serif
--font-sans:    'Outfit', sans-serif
```

---

## 📸 Page Sections

- ✅ **Hero** — Full-screen hero with parallax furniture image
- ✅ **Features Strip** — Free shipping, quality guarantee, easy returns
- ✅ **Featured Products** — Curated horizontal scroll of top picks
- ✅ **Brand Story** — Narrative section with imagery
- ✅ **Craftsmanship** — Artisan process highlights
- ✅ **Promo Banner** — Sale or seasonal promotion
- ✅ **Category Showcase** — Browse by room/style tab grid
- ✅ **All Products** — Filterable, searchable 20+ product grid
- ✅ **Special Collections** — Curated collection cards
- ✅ **Newsletter** — Email capture section
- ✅ **Footer** — Links, newsletter, copyright

---

## 🌐 Deployment

The project is deployed on **Vercel** with automatic GitHub integration.

- Live URL: [https://furniqlo-store.vercel.app](https://furniqlo-store.vercel.app)
- Every push to `main` triggers an automatic deployment

---

## 📜 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  Developed with ❤️ by <a href="https://github.com/Rudraptl16"><strong>Rudraptl16</strong></a>
</div>
