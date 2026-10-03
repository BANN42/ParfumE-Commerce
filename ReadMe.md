# LeBonParfum

An Express and MongoDB API for a perfume store.

## Project layout

- `app.js` configures Express middleware and mounts API routes.
- `server.js` loads environment configuration, connects to MongoDB, and starts the HTTP server.
- `config/` contains database and Cloudinary setup.
- `routes/` maps HTTP endpoints to middleware and controllers.
- `controllers/` implements product and user request handling.
- `models/` defines the MongoDB schemas.
- `middlewares/` contains authentication, upload, and request validation.
- `utils/` contains validation schemas, pagination, and token helpers.
- `tests/` contains Node.js test-runner tests.

## Setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and provide the values for your environment.
3. Start the API with `npm run dev` or `npm start`.
4. Run tests with `npm test`.

The API is mounted under `/api/v1/products` and `/api/v1/Auth/user`.
