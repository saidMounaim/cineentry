# 🎬 CineEntry

**CineEntry** is a clean, minimal **online movie ticket booking** web app built with **Next.js**, **Prisma**, **BetterAuth**, and **ShadCN/UI**. Users can browse movies, create screenings, upload posters, and **book tickets** directly—no payment required.

## 🚀 Live Demo

🔗 [https://cineentry.vercel.app](https://cineentry.vercel.app)

---

## ✨ Features

- 🔐 Sign up / Sign in with BetterAuth
- 🎬 Create and manage movie screenings with title, poster, time, seat count, and description
- 📸 Upload movie posters using ImageKit
- 🎟️ Book tickets instantly (no payment needed)
- 📊 View your bookings in your personal dashboard
- 💅 Fully responsive and minimal design using ShadCN/UI and Tailwind CSS

---

## 📦 Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN/UI](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [BetterAuth](https://www.better-auth.com/)
- [ImageKit](https://imagekit.io/) — image uploads

---

## 🛠 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/saidMounaim/cineentry.git
cd cineentry
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root:

```env
# Database
DATABASE_URL="postgresql://..."

# BetterAuth
BETTER_AUTH_BASE_URL="https://cineentry.vercel.app"
BETTER_AUTH_SECRET="your_betterauth_secret"

# ImageKit
IMAGEKIT_PUBLIC_KEY="your_public_key"
IMAGEKIT_PRIVATE_KEY="your_private_key"
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your_id"

# App
NEXT_PUBLIC_APP_URL="https://cineentry.vercel.app"
```

### 4. Start the dev server

```bash
npm run dev
```

---

## 💼 Contribution

All contributions are welcome!  
Fork the repo, create a new branch, and submit a pull request.
