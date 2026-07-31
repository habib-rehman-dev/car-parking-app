# Car Parking App — Backend

A full‑stack MERN car parking management application — Backend service.

This repository contains the backend API for the Car Parking App: a Node.js + Express server with MongoDB for persistent storage, handling authentication, parking lot/slot management, and reservations.

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Requirements](#requirements)
- [Quickstart](#quickstart)
- [Environment variables](#environment-variables)
- [Run (development & production)](#run-development--production)
- [API overview](#api-overview)
- [Data models (summary)](#data-models-summary)
- [Authentication & security](#authentication--security)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- RESTful API for managing parking lots, slots, and reservations
- User registration & login (JWT)
- Role-based endpoints (user, admin)
- Slot availability and reservation lifecycle
- Input validation and error handling
- MongoDB persistence (Mongoose)
- CORS ready for frontend integration

## Tech stack

- Node.js
- Express
- MongoDB (recommended: Atlas or local)
- Mongoose (ODM)
- JSON Web Tokens (JWT) for auth
- bcrypt for password hashing
- dotenv for configuration
- Joi or express-validator for request validation
- nodemon for development

## Requirements

- Node.js >= 16
- npm or yarn
- MongoDB instance (local, Docker, or Atlas)

## Quickstart

1. Clone the repository (backend folder)
   ```bash
   git clone https://github.com/habib-rehman-dev/car-parking-app.git
   cd car-parking-app/backend
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Add environment variables (see next section)

4. Start dev server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The server will default to http://localhost:5000 (or the port you configure).

## Environment variables

Create a `.env` file in the backend root with at least:

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/car-parking-app?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

Optional:
- EMAIL_PROVIDER settings (for notifications)
- PAYMENTS provider keys if payments integrated

Never commit secrets to git.

## Run (development & production)

- Development:
  - npm run dev (nodemon)
- Production:
  - npm run build (if you transpile)
  - npm start

Example package.json scripts:
```json
{
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js",
    "lint": "eslint .",
    "test": "jest"
  }
}
```

## API overview

Base path: /api

Auth
- POST /api/auth/register
  - body: { name, email, password }
  - response: user, token
- POST /api/auth/login
  - body: { email, password }
  - response: user, token

Users (admin)
- GET /api/users/ — list users (admin)
- GET /api/users/:id — get user (admin)

Parking lots & slots
- GET /api/parking-lots — list parking lots
- POST /api/parking-lots — create parking lot (admin)
  - body: { name, address, totalSlots, ... }
- GET /api/parking-lots/:id — details including slots
- POST /api/parking-lots/:id/slots — create slot(s) (admin)
- PATCH /api/slots/:slotId — update slot (status, type) (admin)

Reservations
- GET /api/reservations — list reservations (user: own, admin: all)
- POST /api/reservations — create reservation
  - body: { parkingLotId, slotId, startAt, endAt, vehicleNumber }
- PATCH /api/reservations/:id/cancel — cancel reservation
- PATCH /api/reservations/:id/complete — mark as completed (admin or after end time)

Health & utilities
- GET /api/health — healthcheck
- POST /api/webhook/payment — optional payment webhook endpoint

Notes:
- Protect routes with middleware (auth, role).
- Validate request bodies and return helpful error responses.

## Data models (summary)

- User
  - name, email, passwordHash, role (user|admin), createdAt
- ParkingLot
  - name, address, location (geo), totalSlots, slots: [Slot], metadata
- Slot
  - number, type (regular/compact/EV/disabled), status (available/reserved/occupied), pricePerHour
- Reservation
  - user, parkingLot, slot, vehicleNumber, startAt, endAt, status (active/expired/cancelled/completed), createdAt

Model these using Mongoose schemas and indexes for queries (e.g., availability by time range).

## Authentication & security

- Use HTTPS in production.
- Store passwords hashed with bcrypt.
- Issue JWTs with a short-ish expiry for sensitive actions; provide refresh tokens if required.
- Rate-limit auth endpoints to prevent brute force.
- Sanitize inputs to prevent injection.
- Validate authorization for modifying parking lots/slots (admin-only).

## Testing

- Unit test services/controllers with Jest.
- Integration tests can use an in-memory MongoDB (mongodb-memory-server).
- Postman / Insomnia collection recommended for manual testing.

## Deployment

Options:
- Host on Heroku, Render, DigitalOcean App Platform, or containerize with Docker and deploy on any cloud provider.
- Use MongoDB Atlas for production DB.
- Configure CI (GitHub Actions) to lint, test, and deploy.

Docker example (optional):
- Provide a Dockerfile + docker-compose.yml that starts the API and a MongoDB container for quick local setup.

## Contributing

- Fork -> branch -> PR
- Follow coding standards (ESLint/Prettier)
- Add tests for new features
- Open issues for bugs or improvement proposals

## License

This project is licensed under the MIT License — see ../LICENSE (root) or add a LICENSE file under backend if you want separate licensing.
