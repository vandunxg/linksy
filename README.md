# Linksy — Save & Organize Your Links

A simple and powerful **Bookmark Manager** to organize folders, save URLs, search bookmarks, and share collections. Built with **React + TypeScript + Vite**, using modern UI components and clean architecture.

---

## 🚀 Features

- Save and manage bookmarks with ease
- Organize your links into folders and collections
- Search bookmarks instantly
- View analytics and recent activities
- Public sharing of folders and collections
- User authentication & protected routes
- Beautiful UI built using reusable components
- OG/OpenGraph metadata for social sharing

---

## 🏗 Project Structure Overview

```
project
├── agent              # Internal documentation, requirements, planning
├── public             # Static assets, including OG-image
├── src
│   ├── assets         # Static UI assets
│   ├── components     # UI components & feature components
│   │   ├── ui         # Reusable shadcn/ui-based components
│   │   ├── dialogs, cards, tables, navigation, etc.
│   ├── hooks          # Custom React hooks
│   ├── layouts        # Layout wrappers: Auth, Public, Protected
│   ├── lib            # API clients, Supabase client, utilities
│   ├── pages          # Page-level components
│   ├── routes         # Centralized routing config
│   ├── services       # API service modules (auth, bookmark, folder)
│   ├── stores         # Global state stores (Zustand)
│   ├── types          # Shared TypeScript types
│   ├── utils          # Constants, theme provider, helpers
│   ├── App.tsx        # Main app component
│   ├── main.tsx       # App bootstrap
│   └── index.css      # Global styles
├── config files       # tsconfig, eslint, prettier, vite, vercel
└── README.md
```

---

## 🧰 Tech Stack

- **React 18**
- **TypeScript**
- **Vite** (Lightning-fast dev server)
- **Zustand** for state management
- **Axios** for API calls
- **Supabase** for authentication & storage
- **shadcn/ui** for consistent and modern UI components

---

## 🖼 Open Graph (OG) Metadata

This project includes full meta tags for rich link previews:

- `og:title`
- `og:description`
- `og:type`
- `og:image`
- Twitter card metadata

Located inside `index.html`.

The OG-image lives at:

```
public/og-image.png
```

---

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/vandunxg/linksy.git
cd linksy
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

---

## 📦 Folder Highlights

### Components (src/components)

- Modular structure
- Reusable UI components inside `/ui`
- Feature-specific components: dialogs, cards, tables, navigation

### Services (src/services)

Encapsulates all API requests:

- `authService.ts`
- `bookmarkService.ts`
- `folderService.ts`

### Stores (src/stores)

Zustand stores for:

- Authentication
- Bookmarks
- Folders

### Pages

- Dashboard
- Folders
- Bookmarks
- Login
- Public shared pages

---

## 🌐 Deployment

This project includes `vercel.json` for smooth deployment on **Vercel**.

---

## 🛡 Meta Tags Example (index.html)

```html
<meta property="og:title" content="Linksy — Save & Organize Your Links" />
<meta
    property="og:description"
    content="A simple and powerful Bookmark Manager to organize folders, save URLs, search bookmarks, and share collections."
/>
<meta
    property="og:image"
    content="https://linksy-ruddy.vercel.app/og-image.png"
/>
```

---

## ✨ Summary

Linksy is a modern, beautifully designed **bookmark manager** that focuses on simplicity, speed, and usability. This project provides a scalable architecture, modular UI, and clean codebase for easy collaboration and upgrades.

---

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

---

## 📄 License

MIT License — Free to use and modify.
