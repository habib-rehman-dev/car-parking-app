# Car Parking App — Backend (Tailored)

This is the backend API for the Car Parking Management application in this repository. It is an Express.js (ES module) server that connects to MongoDB, exposes REST endpoints, and is started from server.js.

## Quick summary
- Language: JavaScript (ES modules)
- Entry point: BackEnd/server.js
- Run mode for development: nodemon (script: `dev`)
- Main responsibilities: auth (JWT), parking lots, slots, reservations, and DB connectivity via Mongoose.

## Stack
- Language: JavaScript (Node.js, ES module "type": "module")
- Framework / runtime: Express (v5.x)
- Database: MongoDB (Mongoose)
- Notable libraries: mongoose, jsonwebtoken, bcryptjs, express-validator, helmet, cors

## What’s in this folder
Top-level files:
- BackEnd/package.json — scripts and dependencies (dev: `nodemon server.js`, start: `node server.js`)
- BackEnd/server.js — bootstraps DB connection and starts Express app
- BackEnd/.env.example — example environment variables
- BackEnd/vercel.json — optional Vercel configuration
- BackEnd/src/ — application source files

Representative source folders (BackEnd/src):
- config/ — env loader and DB connection (server imports `src/config/env.js` and `src/config/dbConnect.js`)
- app.js — Express app wiring (middlewares, routes)
- controllers/ — HTTP handlers (route controllers)
- routes/ — route definitions
- model/ — Mongoose schemas / models
- middlewares/ — auth, error handlers, role checks
- services/ — business logic used by controllers
- utils/ — helpers/utilities
- validator/ — request validation logic
- constants/ — app-wide constants

## How it fits together
server.js loads environment configuration, connects to MongoDB via `src/config/dbConnect.js`, then imports the Express app from `src/app.js`. The Express app mounts routes from `src/routes/`, which call controllers that use services and models. Authentication is implemented with JWT; express-validator (and/or custom validators) are used for request validation.

## How to run (shortest path)
From the repository root or BackEnd directory:

1. Install dependencies:
   npm install
   # or
   cd BackEnd && npm install

2. Create an environment file using BackEnd/.env.example as a template. At minimum:
   PORT=5000
   MONGO_URI=<your-mongo-uri>
   JWT_SECRET=<your-jwt-secret>
   NODE_ENV=development

3. Development run (auto-restart):
   npm run dev
   # (runs `nodemon server.js` from BackEnd/package.json)

4. Production run:
   npm start
   # (runs `node server.js`)

The server logs "Server running locally on port <PORT>" when started successfully. server.js will exit with code 1 if DB connectivity fails.

## Useful notes / evidence from this repo
- package.json (BackEnd/package.json) shows:
  - "type": "module"
  - scripts: "dev": "nodemon server.js", "start": "node server.js"
  - dependencies include: bcryptjs, cookie-parser, cors, express, express-rate-limit, express-session, express-validator, helmet, jsonwebtoken, mongoose, mongoose-paginate-v2.
- server.js imports `./src/config/env.js`, `./src/app.js` and `./src/config/dbConnect.js` and awaits DB connection before starting the HTTP server.
- A BackEnd/.env.example file is present (use it as the env template).
- BackEnd/vercel.json exists if you plan to deploy via Vercel.

## Recommended environment variables (minimum)
- PORT (default 5000)
- MONGO_URI
- JWT_SECRET
- JWT_EXPIRES_IN (optional)
- NODE_ENV

## Health & common endpoints (based on README and typical layout)
Base path: /api
- Auth: POST /api/auth/register, POST /api/auth/login
- Parking lots: GET /api/parking-lots, POST /api/parking-lots (admin)
- Slots: POST /api/parking-lots/:id/slots, PATCH /api/slots/:slotId
- Reservations: GET /api/reservations, POST /api/reservations, PATCH /api/reservations/:id/cancel
- Healthcheck: GET /api/health

(Adjust to the exact route names after verifying the files in src/routes/.)

## Troubleshooting
- If the server exits at start: check MONGO_URI and that MongoDB is reachable.
- If CORS is blocking the frontend: ensure BACKEND CORS settings allow your frontend's origin (BackEnd/src/app.js likely configures CORS).
- If auth fails: confirm JWT_SECRET matches token issuer/consumer config.

## License
Follow the repo license at the repository root (MIT if present).