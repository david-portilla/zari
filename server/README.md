# ZARI Store Server

Backend server for the ZARI store application, providing RESTful APIs for managing products, templates, and grid layouts.

## Table of Contents

1. [Technologies](#technologies)
2. [Setup and Development](#setup-and-development)
3. [API Reference](#api-reference)
4. [Data Models](#data-models)
5. [Testing](#testing)
6. [Error Handling](#error-handling)

## Technologies

- Node.js
- Express
- TypeScript
- UUID for generating unique identifiers
- CORS for cross-origin resource sharing

## Setup and Development

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The server will start on `http://localhost:3001`

3. Verify the server is running:

```bash
curl http://localhost:3001/templates
```

## API Reference

### 1. Products API

#### GET /products

Retrieves product information based on provided IDs.

**Endpoint:**

```
GET http://localhost:3001/products
```

**Query Parameters:**
| Parameter | Type | Required | Description |
| --------- | ------ | -------- | --------------------------------------------------- |
| ids | string | Yes | Product IDs in comma-separated format or JSON array |

**Example Requests:**

1. Using comma-separated IDs:

```bash
curl "http://localhost:3001/products?ids=prod_001,prod_002,prod_003"
```

2. Using JSON array:

```bash
curl "http://localhost:3001/products?ids=[\"prod_001\",\"prod_002\"]"
```

**Success Response:**

```json
[
	{
		"id": "prod_001",
		"name": "Blue Jean",
		"image": "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
		"price": {
			"amount": 36.87,
			"currency": "EUR"
		}
	},
	{
		"id": "prod_002",
		"name": "White T-Shirt",
		"image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
		"price": {
			"amount": 19.99,
			"currency": "EUR"
		}
	}
]
```

### 2. Templates API

#### GET /templates

Returns all available templates for row alignment.

**Endpoint:**

```
GET http://localhost:3001/templates
```

**Example Request:**

```bash
curl http://localhost:3001/templates
```

**Success Response:**

```json
[
	{
		"id": "template_001",
		"name": "Aesthetic Left",
		"alignment": "LEFT"
	},
	{
		"id": "template_002",
		"name": "Centered Style",
		"alignment": "CENTER"
	},
	{
		"id": "template_003",
		"name": "Right Aligned",
		"alignment": "RIGHT"
	}
]
```

### 3. Grids API

#### GET /grids

Returns all saved grid configurations.

**Endpoint:**

```
GET http://localhost:3001/grids
```

**Example Request:**

```bash
curl http://localhost:3001/grids
```

**Success Response:**

```json
[
	{
		"id": "grid_001",
		"name": "Summer Collection",
		"rows": [
			{
				"id": "row_1",
				"templateId": "template_001",
				"products": ["prod_001", "prod_002"]
			}
		]
	}
]
```

#### POST /grids

Saves a new grid configuration.

**Endpoint:**

```
POST http://localhost:3001/grids
```

**Request Body:**

```json
{
	"name": "Summer Collection",
	"rows": [
		{
			"id": "row_1",
			"templateId": "template_001",
			"products": ["prod_001", "prod_002"]
		},
		{
			"id": "row_2",
			"templateId": "template_002",
			"products": ["prod_003"]
		}
	]
}
```

**Example Request:**

```bash
curl -X POST http://localhost:3001/grids \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Summer Collection",
    "rows": [
      {
        "id": "row_1",
        "templateId": "template_001",
        "products": ["prod_001", "prod_002"]
      }
    ]
  }'
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
	products: string[]; // Product IDs, 1-3 items
}
```

## Error Handling

### Common Error Responses

1. Missing Required Parameters:

```json
{
	"error": "Missing required parameter: ids"
}
```

2. Invalid Format:

```json
{
	"error": "Invalid ids format. Expected array of product IDs"
}
```

3. Invalid Grid Data:

```json
{
	"error": "Invalid grid data. Required fields: name, rows"
}
```

4. Invalid Row Data:

```json
{
	"error": "Invalid row data. Each row must have a templateId and 1-3 products"
}
```

## Testing

### Using cURL

Test all endpoints using the following commands:

1. Get Products:

```bash
curl "http://localhost:3001/products?ids=prod_001,prod_002,prod_003"
```

2. Get Templates:

```bash
curl http://localhost:3001/templates
```

3. Save Grid:

```bash
curl -X POST http://localhost:3001/grids \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Summer Collection",
    "rows": [
      {
        "id": "row_1",
        "templateId": "template_001",
        "products": ["prod_001", "prod_002"]
      }
    ]
  }'
```

4. Get All Grids:

```bash
curl http://localhost:3001/grids
```

### Using Postman

Import the following collection to test all endpoints:
[Download Postman Collection](./postman/zari-store-api.json)
