# DigitalGhuru Promotional Applications Workspace

A unified monorepo workspace orchestrating DigitalGhuru's two independent promotional landing page applications.

---

## Workspace Structure

```
promotional page kids/
├── apps/
│   ├── kids/                           # AI for Kids promotional landing page (Grades 1–12)
│   │   ├── src/
│   │   ├── public/brand/
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vite.config.ts             # Configured for Port 5173
│   │
│   └── digital-marketing/              # AI-Powered Digital Marketing & Full-Stack landing page
│       ├── src/
│       ├── public/brand/
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts             # Configured for Port 5174
│
├── package.json                        # Root workspace orchestration
├── .gitignore
└── README.md
```

---

## Root Workspace Commands

Run these commands from the root directory:

### Development Servers

- **AI for Kids** (Runs on `http://localhost:5173`):
  ```bash
  npm run dev:kids
  ```

- **Digital Marketing** (Runs on `http://localhost:5174`):
  ```bash
  npm run dev:dm
  # or
  npm run dev:marketing
  ```

### Production Builds

- **Build Both Applications**:
  ```bash
  npm run build
  ```

- **Build AI for Kids Only**:
  ```bash
  npm run build:kids
  ```

- **Build Digital Marketing Only**:
  ```bash
  npm run build:dm
  ```

### Production Previews

- **Preview AI for Kids**:
  ```bash
  npm run preview:kids
  ```

- **Preview Digital Marketing**:
  ```bash
  npm run preview:dm
  ```

---

## Independent Application Execution

Each application remains 100% independent and can also be run directly from its own directory:

```bash
# AI for Kids
cd apps/kids
npm run dev
npm run build

# Digital Marketing
cd apps/digital-marketing
npm run dev
npm run build
```

