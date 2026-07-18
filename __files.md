Here's the frontend-only file structure for habib-rehman-dev/car-parking-app plus short tips so an AI (or developer) can quickly find the login/auth flow and related pieces.

What I did: I listed the repository's FrontEnd directory and inspected the src tree (README, package.json, vite config, etc.) to extract the structure and the files most relevant to authentication.

Frontend file tree (FrontEnd/)

- FrontEnd/
  - README.md
  - eslint.config.js
  - extra.md
  - index.html
  - package.json
  - package-lock.json
  - vite.config.js
  - public/
    - bg-parking.jpg
  - src/
    - App.css
    - App.jsx
    - main.jsx
    - api/
      - axiosInstance.js
    - components/
      - common/        (directory for small shared components)
      - layout/        (directory for layout components)
    - contexts/
      - AuthContext.jsx
      - useAuth.js
    - features/
      - auth/          (auth-related pages/components — login/register forms)
    - hooks/
      - useGetUser.js
    - lib/
      - queryClient.js (react-query client config)
    - page/
      - Home.jsx
    - router/
      - Approuter.jsx
      - protect.jsx    (route guard — currently an empty file in repo)

Quick tips to help an AI tool (or a developer) find and understand the login/auth flow

- Entry point and routing:
  - index.html → main.jsx mounts the React app. App.jsx is the top-level component.
  - Routing is handled in src/router/Approuter.jsx. Private routes are expected to be protected via src/router/protect.jsx (check here for guard logic or usage).

- Where the login UI likely lives:
  - src/features/auth/ — look here first for Login.jsx / Register.jsx or form components. (This is the feature folder for auth pages.)
  - Also check src/components/common/ and src/components/layout/ for reusable form inputs, buttons, or layout wrappers used by the login page.

- Auth state and helpers:
  - src/contexts/AuthContext.jsx — provides authentication context (user/session, login/logout helpers). This is the primary place to see how auth state is stored and propagated.
  - src/contexts/useAuth.js — convenience hook to consume AuthContext.
  - src/hooks/useGetUser.js — a hook to fetch the current user (likely called on app start or after login).

- API integration and tokens:
  - src/api/axiosInstance.js — central axios instance. Check here for baseURL, Authorization header setup, and interceptors that attach tokens or handle 401 responses. This shows how auth tokens are sent to the backend.
  - Typical places to find token storage: AuthContext.jsx, useGetUser.js, or axiosInstance.js (localStorage/sessionStorage usage or in-memory storage).

- Data fetching:
  - src/lib/queryClient.js — react-query client configuration; login-related fetches or user refetching may use react-query.

- Quick searches an AI should run in the repo:
  - Search for strings: "login", "auth", "token", "Authorization", "useAuth", "AuthContext", "axios", "refresh".
  - Inspect axiosInstance.js for baseURL to know backend endpoints (helps discover endpoints like /auth/login).

- Running & local dev hints:
  - Frontend uses Vite (vite.config.js). Start with npm install then npm run dev (or check package.json scripts).
  - index.html and public/ contains static assets (bg-parking.jpg).

If you want, I can:
- Open the specific files (AuthContext.jsx, axiosInstance.js, useGetUser.js, files inside features/auth) and summarize exactly how login tokens are stored and which endpoints are called.
- Or produce a short map: "To log in, the UI component X calls API Y using axiosInstance; token is saved in Z; protected routes check A" — I can extract those details directly from the code. Which would you like next?