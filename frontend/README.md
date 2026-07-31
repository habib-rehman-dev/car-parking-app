# Car Parking App — Frontend

This is the frontend client for the Car Parking App that consumes the backend API. The front end provides user signup/login, parking lot browsing, slot reservation, and reservation management.

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Requirements](#requirements)
- [Quickstart](#quickstart)
- [Environment variables](#environment-variables)
- [Run (development & production)](#run-development--production)
- [Architecture & folder structure](#architecture--folder-structure)
- [API integration](#api-integration)
- [Authentication flow](#authentication-flow)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- Responsive UI for desktop & mobile
- User registration & login
- Browse parking lots and view available slots
- Create and manage reservations
- Admin interface for managing parking lots and slots (if role = admin)
- Form validation and client-side checks

## Tech stack

- React (or the framework used — replace if different)
- React Router for routing
- Axios or fetch for API calls
- Context API / Redux for state management (optional)
- CSS / Tailwind / Styled Components (adjust to your stack)
- Vite or Create React App (adjust to your stack)
- JWT stored in memory or HttpOnly cookies (recommend cookie for security)

## Requirements

- Node.js >= 16
- npm or yarn

## Quickstart

1. Clone the repository and navigate to frontend
   ```bash
   git clone https://github.com/habib-rehman-dev/car-parking-app.git
   cd car-parking-app/frontend
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Create `.env` file (see below)

4. Run dev server
   ```bash
   npm run dev
   # or
   npm start
   ```

Open http://localhost:3000 (or the URL printed in console).

## Environment variables

Create `.env.local` (or `.env`) with:

```
VITE_API_BASE_URL=http://localhost:5000/api
REACT_APP_API_BASE_URL=http://localhost:5000/api  # if CRA
```

If using OAuth or other services, add required keys.

## Run (development & production)

- Development:
  - npm run dev (Vite) or npm start (CRA)
- Build (production):
  - npm run build
  - Serve the built files (deploy to Netlify/Vercel/GitHub Pages or host with a static server)

Example scripts in package.json:
```json
{
  "scripts": {
    "dev": "vite",
    "start": "vite preview",
    "build": "vite build",
    "lint": "eslint src --ext .js,.jsx",
    "test": "vitest"
  }
}
```

## Architecture & folder structure

A recommended structure (adjust to repo):
```
/public
/src
  /api          # axios instances, api helper functions
  /components   # UI components (Header, Footer, ParkingList, SlotCard)
  /pages        # Page-level components (Home, Login, Dashboard, Admin)
  /hooks        # custom hooks (useAuth, useReservations)
  /contexts     # context providers (AuthContext)
  /styles       # global styles
  /utils        # helpers
  main.jsx
/package.json
```

## API integration

- Use a single Axios instance with baseURL from env:
  ```js
  import axios from 'axios';
  export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL,
    withCredentials: true // if using cookies
  });
  ```

- Example usage:
  - GET /parking-lots
  - POST /auth/login { email, password }
  - POST /reservations { parkingLotId, slotId, startAt, endAt }

## Authentication flow

- On login, backend returns JWT (or sets HttpOnly cookie).
- Store token in memory or rely on cookies for increased security.
- Protect routes by checking auth state (AuthContext) and redirecting to /login when unauthenticated.
- Refresh tokens or re-login on token expiry.

## UX considerations

- Show real-time slot availability (polling or WebSocket) for better UX.
- Show local validation on forms (license plate, times).
- Display reservation countdown or active session.

## Testing

- Unit test components with React Testing Library and Vitest/Jest.
- E2E tests with Cypress for critical flows (signup, login, booking).

## Deployment

- Static hosts: Vercel, Netlify, GitHub Pages (if SPA).
- Configure environment variables on host to point API_BASE_URL to your production backend.
- For server-side rendering frameworks (Next.js), follow framework-specific deployment steps.

## Contributing

- Fork -> branch -> PR
- Run linter and tests before opening PR
- Document UI/UX changes in PR description

## License

MIT — see ../LICENSE (root)
