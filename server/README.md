# ZARI Store Server

This is the backend server for the ZARI store application. It provides a RESTful API for managing products, templates, and grid layouts.

## Technologies

- Node.js
- Express
- TypeScript
- UUID for generating unique identifiers
- CORS for cross-origin resource sharing

## API Endpoints

### Products

#### GET /products

Retrieves product information based on provided IDs.

**Query Parameters:**

- `ids`: Array of product IDs (can be provided as JSON array or comma-separated string)

**Response:**

```json
[
	{
		"id": "prod_001",
		"name": "Blue Jean",
		"image": "https://example.com/image.jpg",
		"price": {
			"amount": 36.87,
			"currency": "EUR"
		}
	}
]
```

### Templates

#### GET /templates

Retrieves all available templates for grid row alignment.

**Response:**

```json
[
	{
		"id": "template_001",
		"name": "Aesthetic Left",
		"alignment": "LEFT"
	}
]
```

### Grids

#### POST /grids

Saves a new grid configuration.

**Request Body:**

```json
{
	"name": "My Grid",
	"rows": [
		{
			"id": "row_001",
			"templateId": "template_001",
			"products": ["prod_001", "prod_002"]
		}
	]
}
```

**Response:**

```json
{
	"id": "grid_001",
	"name": "My Grid",
	"rows": [
		{
			"id": "row_001",
			"templateId": "template_001",
			"products": ["prod_001", "prod_002"]
		}
	]
}
```

#### GET /grids

Retrieves all saved grid configurations.

**Response:**

```json
[
  {
    "id": "grid_001",
    "name": "My Grid",
    "rows": [...]
  }
]
```

## Data Models

### Product

```typescript
interface Product {
	id: string;
	name: string;
	image: string;
	price: {
		amount: number;
		currency: string;
	};
}
```

### Template

```typescript
interface Template {
	id: string;
	name: string;
	alignment: "LEFT" | "CENTER" | "RIGHT";
}
```

### Grid

```typescript
interface Grid {
	id: string;
	name: string;
	rows: Row[];
}

interface Row {
	id: string;
	templateId: string;
	products: string[]; // Product IDs
}
```

## Setup and Development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:3001`.
