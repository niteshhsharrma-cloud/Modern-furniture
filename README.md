# Modern Furniture Hetauda — Digital Product Catalogue

A simple production-oriented MERN product catalogue for a local furniture business.

## Architecture

- `client/`: React + Vite + React Router + plain CSS
- `server/`: Node.js + Express + Mongoose
- MongoDB stores products and the admin account.
- Cloudinary stores uploaded product images.
- Admin authentication uses a JWT stored in an HTTP-only cookie.
- Public product endpoints are read-only; admin mutation endpoints require authentication.

Customer flow:

`Business → Products → Product Details → Call / WhatsApp`

Admin flow:

`Login → Products → Add/Edit/Delete`

## Database schema

### Product
- name
- price
- category
- description
- images[]
- dimensions
- material
- colors[]
- createdAt
- updatedAt

### Admin
- email
- passwordHash
- role
- createdAt
- updatedAt

## API routes

### Public
- `GET /api/health`
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/products/categories`

### Admin auth
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### Admin products
- `POST /api/products`
- `PATCH /api/products/:id`
- `DELETE /api/products/:id`

Product creation/update uses `multipart/form-data` so images can be uploaded.

## Authentication

The server hashes the admin password with bcrypt and signs a short-lived JWT. The JWT is sent as an HTTP-only cookie, so frontend JavaScript cannot read the token.

For a real deployment:
- use HTTPS
- set a strong `JWT_SECRET`
- set `COOKIE_SECURE=true`
- use a strong MongoDB credential
- configure Cloudinary credentials
- restrict CORS to the deployed frontend URL

## Frontend ↔ backend

The React app calls `/api/...` endpoints through Axios. In development, Vite proxies `/api` to the Express server. In production, set `VITE_API_URL` if frontend and backend are hosted on different origins.

## Setup

### 1. Server

```bash
cd server
npm install
cp .env.example .env
npm run seed:admin
npm run dev
```

### 2. Client

```bash
cd client
npm install
npm run dev
```

Default development URLs:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

The seeded admin account comes from `.env`:
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

Change those before deployment.

## Image storage

Cloudinary is used instead of storing image files on the application server. This avoids losing uploads when deploying to an ephemeral/container-based host.

If you do not want Cloudinary, the image service can later be replaced without changing the customer-facing product model.

## Production checklist

- Use HTTPS.
- Use a strong unique JWT secret.
- Change the seeded admin password.
- Set `COOKIE_SECURE=true`.
- Set `CLIENT_URL` to the exact production frontend origin.
- Use a production MongoDB deployment.
- Configure Cloudinary.
- Put the server behind a reverse proxy/platform with HTTPS.
- Do not commit `.env`.
