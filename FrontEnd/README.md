# Car Parking App — Frontend

A React frontend for the Car Parking Management application (MERN stack). This README explains how to set up, run, build, and develop the frontend.

## Table of contents
- [Features](#features)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Environment variables](#environment-variables)
- [Getting started (development)](#getting-started-development)
- [Available scripts](#available-scripts)
- [Build & production](#build--production)
- [Docker (optional)](#docker-optional)
- [Linting & testing](#linting--testing)
- [Folder structure](#folder-structure)
- [Deployment notes](#deployment-notes)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License & contact](#license--contact)

## Features
- User authentication (login/signup)
- Vehicle registration and management
- Parking slot booking and release
- Live parking availability (via WebSockets / polling)
- Dashboard for admins and users
- (Optional) Map view for parking locations

## Tech stack
- React (JavaScript)
- React Router
- State management: React Query
- HTTP client:  axios
- Styling: CSS / Tailwind / styled-components /Mui (project-specific)
- Build tool: Create React App / Vite (project-specific)

## Prerequisites
- Node.js >= 16 (or project-specific version)
- npm >= 8 or Yarn
- The backend server (MERN API) should be running and accessible (see `REACT_APP_API_URL` below).

This are not used but you can use later
.env.example:
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=ws://localhost:5000
REACT_APP_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
REACT_APP_ENABLE_DEBUG=false
NODE_ENV=development
```

Notes:
- Set `REACT_APP_API_URL` to the backend API base URL (e.g., `http://localhost:5000/api` or `https://car-parking-app-xi.vercel.app`).
- If using WebSockets or Socket.IO, set `REACT_APP_SOCKET_URL`.
- Add any 3rd-party keys (maps, auth) as needed.

## Getting started (development)
Install dependencies:
```bash
# npm
npm install

# or yarn
yarn install
```

Start the dev server:
```bash
# npm (create-react-app)
npm start

# or Vite
npm run start

# yarn
yarn start
# or
yarn dev
```

Open http://localhost:3000 (CRA) or the port shown by Vite.

Ensure your backend is running and `REACT_APP_API_URL` points to it.

## Available scripts
Typical scripts you might have in package.json (adjust if your project uses different names):
```json
"scripts": {
  "start": "react-scripts start",        // or "vite"
  "lint": "eslint 'src/**'",
  "format": "prettier --write 'src/**'",
}
```

- `npm start` — run development server
- `npm run build` — build optimized production bundle
- `npm run format` — format code

## Build & production
Build for production:
```bash
npm run build
```
Serve the build with a static server, or integrate with your backend to serve static assets from `build/` (Create React App) or `dist/` (Vite). When deploying, ensure environment variables are set appropriately for the hosting provider.

## Docker (optional)
Example Dockerfile (adjust base image and commands to match your setup):
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Linting & testing
- Run ESLint: `npm run lint`
- Run Prettier: `npm run format`
- Unit tests: `npm test`
- End-to-end: Cypress or Playwright (if present)

Add/adjust configurations in `.eslintrc`, `.prettierrc`, and test config files as needed.

## Folder structure (example)
```
frontend/
├─ public/
├─ src/
│  ├─ api/            # API clients
│  ├─ assets/         # images, icons
│  ├─ components/     # reusable components
│  ├─ pages/          # route-level components
│  ├─ hooks/          # custom hooks
│  ├─ contexts/       # context providers or redux store
│  ├─ styles/         # global styles
│  ├─ utils/          # helpers
│  └─ index.js
├─ .env
├─ package.json
└─ README.md
```

## Deployment notes
- If backend serves frontend, make sure the backend routes static files from the frontend build folder.
- Configure reverse proxy / Nginx for single-page-app routing (rewrite to index.html).
- Set environment variables on your hosting platform (Netlify, Vercel, Heroku, AWS S3 + CloudFront, etc.).

## Troubleshooting
- Blank page or 404s on refresh: ensure SPA routing redirect to index.html on server.
- CORS errors: set appropriate CORS headers on the backend or use proxy in development (`package.json` proxy or `vite.config.js`).
- Environment variables not picked up: ensure variables are prefixed with `REACT_APP_` (for CRA) and rebuild after changes.

## Contributing
- Follow the repository's contribution guidelines.
- Run linter and tests before submitting PRs:
```bash
npm run lint
npm test
```

## License & contact
This frontend inherits the repository license. For questions, reach out to the project owner or open an issue in the repository.
