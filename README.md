# DigitalGhuru Unified Promotional Application

A unified Single Page Application (SPA) with client-side routing combining both **Digital Marketing & Full-Stack** and **AI Super Kids** into a single deployable project.

---

## Project Structure

```
digitalghuru-promo/
├── public/
│   └── brand/                    # Unified brand images, banners, and logos
├── src/
│   ├── digital-marketing/        # Digital Marketing & Full-Stack promotional app
│   │   ├── components/
│   │   ├── data/
│   │   └── App.tsx
│   ├── kids/                     # AI Super Kids promotional app
│   │   ├── components/
│   │   ├── data/
│   │   ├── assets/
│   │   └── App.tsx
│   ├── App.tsx                   # Route orchestration (React Router)
│   ├── main.tsx                  # Root entry point
│   ├── index.css                 # Unified Tailwind & design system styles
│   └── vite-env.d.ts
├── index.html                    # Single HTML template
├── package.json                  # Unified dependencies & scripts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Route Configuration

| URL Route | Destination |
| :--- | :--- |
| `/` | **Digital Marketing & Full-Stack Program** |
| `/kids` | **AI Super Kids Program (Grades 1–12)** |
| `/digital-marketing` | Redirects to `/` |
| `/digitalghuru` | Redirects to `/` |

---

## Development

Start the development server:

```bash
npm run dev
```

- Application runs at: `http://localhost:5173`
- Kids page runs at: `http://localhost:5173/kids`

---

## Production Build & Live Deployment

Run the build command:

```bash
npm run build
```

This compiles everything into a single `dist/` directory.

### Live Server Deployment (Nginx / Apache / Vercel / Netlify / cPanel)

Because this is a Single Page Application (SPA) with routing, ensure your web server rewrites all URL requests to `index.html`.

#### Nginx
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

#### Apache (`.htaccess`)
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
