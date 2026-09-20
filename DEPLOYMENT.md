# Deployment outline

## Backend

Deploy `server/` to a Node-compatible host.

Environment:
- MONGO_URI
- CLIENT_URL
- JWT_SECRET
- COOKIE_SECURE=true
- ADMIN_EMAIL
- ADMIN_PASSWORD
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- CLOUDINARY_FOLDER

Run:
```bash
npm install
npm start
```

Then run the admin seed once:
```bash
npm run seed:admin
```

## Frontend

Deploy `client/` to a static hosting provider.

Build:
```bash
npm install
npm run build
```

Set:
```bash
VITE_API_URL=https://your-api-domain.example
```

If frontend and API share the same origin, `VITE_API_URL` can remain empty and `/api` will be relative.

## Important cookie/CORS detail

The frontend must send credentials and the API must allow the exact frontend origin. This project already configures Axios with `withCredentials: true` and Express CORS with `credentials: true`.

Use HTTPS in production and set `COOKIE_SECURE=true`.
