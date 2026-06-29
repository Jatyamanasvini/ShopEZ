# 🛍️ ShopEZ — Static Pulse 002

> **A grunge Y2K e-commerce platform for the cyber-subculture.**  
> Curating the intersection of street utility and digital decay.

---

## 📑 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
  - [User Features](#user-features)
  - [Admin Features](#admin-features)
  - [UI/UX Features](#uiux-features)
- [Tech Stack](#-tech-stack)
- [Tools & Dependencies](#-tools--dependencies)
- [Architecture](#-architecture)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Installation & Setup](#-installation--setup)
- [Services & URLs](#-services--urls)
- [Usage](#-usage)
  - [As a User](#as-a-user)
  - [As an Admin](#as-an-admin)
- [Future Enhancements](#-future-enhancements)
- [Developer](#-developer)
- [License](#-license)

---

## 🧠 About the Project

**ShopEZ** is a full-stack e-commerce web application built with the MERN stack. It features a dark, grunge Y2K aesthetic inspired by cyberpunk streetwear and late-90s digital artifacts. The platform caters to what the creator calls **"grunge baddies"** — users who prefer dark romance, cyber-grunge, and Y2K nostalgia over florals and basics.

The frontend is a single-page application built with **React 19 + Vite**, styled with a custom dark theme. The backend is an **Express.js + Mongoose** REST API with JWT-based authentication. The database runs on **MongoDB**.

---

## ✨ Features

### User Features

| Feature | Description |
|---|---|
| **User Authentication** | Sign up and log in with email/password. JWT tokens persist sessions across visits. |
| **Product Browsing** | Browse the full catalog on the Shop page. |
| **Category Filtering** | Filter products by category — Jackets, Bottoms, Tops, Accessories, Footwear. |
| **Product Details** | View product images, descriptions, prices, and available sizes. |
| **Shopping Cart** | Add products with selected sizes, update quantities, remove items. |
| **Coupon System** | Apply discounts based on cart total — 5% (₹2000+), 10% (₹5000+), 15% (₹8000+). One coupon at a time. |
| **Freebie Rewards** | Orders above ₹5000 unlock a free SHOPEZ Charm Keychain — pop-up modal with claim option. |
| **Order Placement** | Place orders and save them to the database. |
| **Order History** | View past orders on the Profile and Orders pages. |
| **Wishlist** | Save items for later (UI ready). |
| **Responsive Design** | Optimized for desktop and mobile viewports. |

### Admin Features

| Feature | Description |
|---|---|
| **Admin Dashboard** | Dedicated admin panel with real-time statistics from the database. |
| **Stats Overview** | Total orders, total users, pending/delivered/cancelled counts, total revenue, this month's revenue, freebies sent. |
| **User Management** | View all users with their order count, total spent, last order date, and most-purchased product. |
| **Order Management** | View all orders with customer info, item breakdowns (freebies marked with 🎁), and order dates. |
| **Order Status Control** | Update order status via dropdown — Being shipped → Shipped → Delivered → Cancelled. Changes persist to the database. |
| **Access Control** | Server-verified admin role; non-admins are automatically logged out and redirected. |

### UI/UX Features

| Feature | Description |
|---|---|
| **Dark Grunge Theme** | Full dark mode with #0d0d11 background and #ff007f pink accents. |
| **Hero Section** | Full-width editorial hero with grayscale-filtered imagery and bold typography. |
| **Collage Banners** | Scrollable full-viewport collage sections with multi-image layouts, grayscale hover effects, and Y2K-themed captions (404 Angel, Pink Panic, Glitter Graveyard, etc.). |
| **Static Pulse Branding** | "StaticPulse 002" hero branding with Rubik Mono One font. |
| **Marquee Ticker** | Scrolling announcement bar (configurable). |
| **Responsive Layouts** | Grid-based product displays adapt from 4 columns to 2 to 1 on smaller screens. |
| **Cart Summary** | Real-time subtotal, coupon discount breakdown, and final total with white text styling. |
| **Freebie Modal** | Fullscreen overlay modal with product image and claim/dismiss options. |
| **Collage Variations** | Each banner uses a different layout — 2-up, triptych, mosaic, reverse grid — for visual variety. |
| **Admin Dashboard Tables** | Clean data tables with status badges (colour-coded), hover states, and inline action controls. |

---

## 🛠 Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React 19** | UI library for building component-based interfaces |
| **React Router DOM 6** | Client-side routing between pages |
| **Vite 8** | Fast build tool and dev server with HMR |
| **CSS3 (Custom)** | Dark theme with hand-written stylesheets |

### Backend

| Technology | Purpose |
|---|---|
| **Node.js 24** | JavaScript runtime |
| **Express 5** | Web framework for REST API |
| **Mongoose 9** | MongoDB ODM for data modeling |
| **JSON Web Token** | Authentication and session management |
| **bcryptjs** | Password hashing |

### Database

| Technology | Purpose |
|---|---|
| **MongoDB 7+** | NoSQL document database |
| **MongoDB Atlas** | Optional cloud deployment |

---

## 📦 Tools & Dependencies

### Backend (`backend/package.json`)

```
bcryptjs   ^3.0.3    — Password hashing
cors       ^2.8.6    — Cross-origin resource sharing
dotenv     ^17.4.2   — Environment variable management
express    ^5.2.1    — Web framework
jsonwebtoken ^9.0.3  — JWT signing & verification
mongoose   ^9.7.2    — MongoDB ODM
nodemon    ^3.1.14   — Dev auto-restart (dev dependency)
```

### Frontend (`frontend/package.json`)

```
react             ^19.2.7  — UI library
react-dom         ^19.2.7  — DOM rendering
react-router-dom  ^6.14.2  — Routing
vite              ^8.1.0   — Build tool
@vitejs/plugin-react ^6.0.2 — Vite React plugin
```

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (Client)                      │
│  ┌───────────────────────────────────────────────────┐  │
│  │           React SPA (Vite :5173)                  │  │
│  │  ┌──────┐  ┌───────┐  ┌────────┐  ┌──────────┐  │  │
│  │  │Pages │  │Comps  │  │Context │  │Styles/   │  │  │
│  │  │ 12   │  │Header │  │Auth    │  │data      │  │  │
│  │  │.jsx  │  │Navbar │  │Cart    │  │products  │  │  │
│  │  └──────┘  └───────┘  └────────┘  └──────────┘  │  │
│  └──────────────────┬────────────────────────────────┘  │
│                     │ fetch() /api/*                      │
│                     │ (Vite proxy to :5000)               │
└─────────────────────┼────────────────────────────────────┘
                      │
┌─────────────────────┼────────────────────────────────────┐
│              Express API Server (:5000)                   │
│  ┌─────────┐  ┌───────────┐  ┌──────────────────────┐   │
│  │Routes   │  │Middleware  │  │Controllers           │   │
│  │auth     │  │auth.js    │  │authController.js      │   │
│  │orders   │  │adminAuth  │  │orderController.js     │   │
│  │products │  │.js        │  │productController.js   │   │
│  │admin    │  │           │  │                       │   │
│  └─────────┘  └───────────┘  └──────────────────────┘   │
│                       │                                   │
│              ┌────────┴────────┐                          │
│              │    Mongoose     │                          │
│              │      ODM        │                          │
│              └────────┬────────┘                          │
└───────────────────────┼──────────────────────────────────┘
                        │
              ┌─────────┴──────────┐
              │    MongoDB          │
              │  (Local/Atlas)      │
              │  Database: shopez   │
              └────────────────────┘
```

**Data Flow:**
1. User interacts with React UI → triggers `fetch()` calls
2. Vite dev proxy forwards `/api/*` requests to the Express backend
3. Express routes apply middleware (auth/adminAuth) → call controllers
4. Controllers use Mongoose models to query MongoDB
5. JSON responses flow back through the chain to the UI

**Auth Flow:**
1. User logs in → backend validates credentials → returns JWT + user role
2. Token stored in `localStorage` → sent as `Authorization: Bearer <token>`
3. `auth.js` middleware verifies JWT → attaches `req.user`
4. `adminAuth.js` middleware additionally checks `role === "admin"`
5. Frontend Admin page verifies role with `/api/admin/verify` on mount

---

## 🗄 Database Schema

### Users Collection (`users`)

```json
{
  "_id": "ObjectId",
  "name": "String (required)",
  "email": "String (required, unique)",
  "password": "String (required, bcrypt hashed)",
  "role": "String (enum: user | admin, default: user)",
  "createdAt": "Date (auto)",
  "updatedAt": "Date (auto)"
}
```

### Products Collection (`products`)

```json
{
  "_id": "ObjectId",
  "title": "String (required)",
  "category": "String (required)",
  "description": "String (required)",
  "price": "Number (required)",
  "sizes": ["String"],
  "stock": "Number (default: 0)",
  "material": "String",
  "images": ["String"],
  "featured": "Boolean (default: false)",
  "trending": "Boolean (default: false)",
  "createdAt": "Date (auto)",
  "updatedAt": "Date (auto)"
}
```

### Orders Collection (`orders`)

```json
{
  "_id": "ObjectId",
  "user": "ObjectId (ref: User, required)",
  "items": [
    {
      "name": "String (required)",
      "quantity": "Number (required)",
      "size": "String (required)",
      "price": "Number (required)"
    }
  ],
  "total": "Number (required)",
  "status": "String (enum: Being shipped | Shipped | Delivered | Cancelled, default: Being shipped)",
  "createdAt": "Date (auto)",
  "updatedAt": "Date (auto)"
}
```

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/signup` | — | Create a new user account |
| `POST` | `/api/auth/login` | — | Log in and receive JWT |

### Products

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/products` | — | Get all products |
| `GET` | `/api/products/:id` | — | Get a single product by ID |
| `POST` | `/api/products` | — | Create a new product |
| `PUT` | `/api/products/:id` | — | Update a product |
| `DELETE` | `/api/products/:id` | — | Delete a product |

### Orders

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/orders` | Required | Create a new order |
| `GET` | `/api/orders` | Required | Get current user's orders |

### Admin

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/admin/stats` | Admin | Dashboard statistics |
| `GET` | `/api/admin/orders` | Admin | All orders with user info |
| `PATCH` | `/api/admin/orders/:id` | Admin | Update order status |
| `GET` | `/api/admin/users` | Admin | All users with order analytics |
| `GET` | `/api/admin/verify` | Admin | Verify admin role from token |

### Health

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/health` | — | Health check endpoint |
| `GET` | `/` | — | Welcome message |

---

## 🔧 Installation & Setup

### Prerequisites

- **Node.js** v18+ (built on v24)
- **MongoDB** v7+ (local or Atlas)
- **npm** v9+

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ShopEZ
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Install root dependencies (optional)
cd ..
npm install
```

### 3. Configure Environment

Create `backend/.env` (already provided):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/shopez
JWT_SECRET=shopez123
```

> **Note:** Change `JWT_SECRET` to a secure random string for production.  
> To use MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

### 4. Start MongoDB

```bash
# Local MongoDB
mongosh
# Or start the MongoDB service
net start MongoDB
```

### 5. Seed Admin User (Optional)

```bash
cd backend
node -e "
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const User = require('./models/User');
  const hash = await bcrypt.hash('admin123', 10);
  const existing = await User.findOne({ email: 'admin@shopez.com' });
  if (existing) {
    existing.password = hash;
    await existing.save();
    console.log('Admin password reset to admin123');
  } else {
    await User.create({ name: 'Admin', email: 'admin@shopez.com', password: hash, role: 'admin' });
    console.log('Admin user created: admin@shopez.com / admin123');
  }
  await mongoose.disconnect();
})();
"
```

### 6. Run the Application

```bash
# From the root directory:

# Start backend (terminal 1)
npm run dev:backend

# Start frontend (terminal 2)
npm run dev:frontend
```

Or individually:

```bash
# Backend
cd backend && node server.js

# Frontend
cd frontend && npx vite
```

---

## 🌐 Services & URLs

| Service | URL | Description |
|---|---|---|
| **Frontend (Dev)** | `http://localhost:5173` | Vite React dev server with HMR |
| **Backend API** | `http://localhost:5000` | Express REST API |
| **MongoDB** | `mongodb://127.0.0.1:27017/shopez` | Local database |

---

## 🎮 Usage

### As a User

1. **Open** `http://localhost:5173`
2. **Browse** the homepage — hero section, collage banners with Y2K captions.
3. **Shop** all products or filter by category (Jackets, Bottoms, Tops, Accessories, Footwear).
4. **View a product** — see its image, description, price, and select a size.
5. **Add to cart** — selected items appear with quantity controls.
6. **Apply a coupon** — if your cart total qualifies (≥₹2000), click "Apply coupon" and choose a discount.
7. **Proceed to checkout** — review your order and place it.
8. **Claim a freebie** — if the order total exceeds ₹5000, a modal pops up with a free SHOPEZ Charm Keychain.
9. **View orders** — visit the Orders or Profile page to see your order history.

### As an Admin

1. **Log in** with admin credentials:
   - **Email:** `admin@shopez.com`
   - **Password:** `admin123`
2. **Navigate to Admin** — the link appears in the top navigation bar only for admin accounts.
3. **View dashboard stats** — total orders, users, pending/delivered/cancelled counts, revenue, monthly revenue, and freebies sent.
4. **Manage users** — see all registered users with their order metrics and top-purchased products.
5. **Manage orders** — view every order with customer details and item breakdowns.
6. **Update order status** — use the dropdown to move orders through the shipping pipeline.

---

## 🚀 Future Enhancements

- [ ] **Cart & Wishlist Backend** — wire up the existing `cartRoutes`, `wishlistRoutes`, and `reviewRoutes` stubs.
- [ ] **Product Reviews & Ratings** — allow users to review and rate products.
- [ ] **Payment Gateway Integration** — integrate Razorpay, Stripe, or similar.
- [ ] **Email Notifications** — order confirmations, shipping updates, and promotional emails.
- [ ] **Real-time Order Tracking** — live status updates with notifications.
- [ ] **Search Functionality** — full-text search across product names and descriptions.
- [ ] **Image Upload** — allow admin to upload product images via the dashboard.
- [ ] **Inventory Management** — automatic stock deduction on order placement.
- [ ] **Discount & Promo Code Engine** — expand the coupon system with admin-defined promo codes.
- [ ] **Multi-language Support** — i18n for international users.
- [ ] **Dark/Light Mode Toggle** — user-selectable theme switching.
- [ ] **PWA Support** — installable as a progressive web app.
- [ ] **Mobile App** — React Native wrapper for iOS/Android.

---

## 👩‍💻 Developer

**Developer:** Menacevini

**Tech Stack Used:**

| Area | Technologies |
|---|---|
| **Frontend** | React 19, React Router DOM 6, Vite 8, CSS3 |
| **Backend** | Node.js 24, Express 5, Mongoose 9 |
| **Database** | MongoDB 7+, MongoDB Compass |
| **Authentication** | JSON Web Tokens (JWT), bcryptjs |
| **Version Control** | Git, GitHub |
| **Environment** | dotenv, nodemon |
| **Design** | Custom dark theme, Rubik Mono One font, Y2K grunge aesthetic |

---

## 📄 License

**Educational Purpose Only**

This project is created for **educational and demonstration purposes only**. It is not intended for commercial use or production deployment. The code, design, and assets are provided as-is for learning and portfolio showcase.

&copy; 2026 ShopEZ — Static Pulse 002