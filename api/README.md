# ZARI Store API for Vercel

This directory contains serverless functions that implement the backend API for the ZARI Store application. These functions are designed to be deployed on Vercel and replace the Express server that's used in local development.

## API Endpoints

| Endpoint         | Method | Description                       |
| ---------------- | ------ | --------------------------------- |
| `/api/products`  | GET    | Retrieves products by IDs         |
| `/api/templates` | GET    | Retrieves all available templates |
| `/api/grids`     | GET    | Retrieves all saved grids         |
| `/api/grids`     | POST   | Saves a new grid configuration    |

## Important Notes

### Data Persistence

Since these are serverless functions, the `grids` array is stored in memory and will reset between function invocations. In a production environment, you should use a database to store this data.

To add persistent storage, you would:

1. Set up a database (e.g., MongoDB Atlas, Supabase, Vercel Postgres)
2. Update the functions to connect to this database
3. Replace the in-memory operations with database operations

### Environment Configuration

The application automatically detects whether it's running in development or production:

- In development, it uses `http://localhost:3001` (Express server)
- In production, it uses `https://zari-store.vercel.app/api` (Vercel Serverless Functions)

This is handled through the `.env` and `.env.production` files.

## How It Works

When deployed to Vercel:

1. The `vercel.json` configuration routes API requests to the serverless functions
2. Each function handles a specific endpoint and implements the same logic as the Express server
3. The frontend application uses the environment variable `VITE_LOCAL_API_URL` to determine the API base URL

## Local Testing

To test these functions locally, you can use the Vercel CLI:

```bash
npm install -g vercel
vercel dev
```

This will simulate the Vercel environment locally, running both the frontend and the API functions.
