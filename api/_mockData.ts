/**
 * Mock data for the ZARI store application
 * Contains type definitions and mock data for products, templates, and grids
 *
 * @module mockData
 */

/**
 * Represents a product in the store
 * @interface Product
 * @property {string} id - Unique identifier for the product
 * @property {string} name - Name of the product
 * @property {string} image - URL of the product image
 * @property {Object} price - Price information
 * @property {number} price.amount - Price amount
 * @property {string} price.currency - Currency code (e.g., EUR)
 */
export interface Product {
	id: string;
	name: string;
	image: string;
	price: {
		amount: number;
		currency: string;
	};
}

/**
 * Represents a template for row alignment
 * @interface Template
 * @property {string} id - Unique identifier for the template
 * @property {string} name - Display name of the template
 * @property {("LEFT"|"CENTER"|"RIGHT")} alignment - Alignment type for the row
 */
export interface Template {
	id: string;
	name: string;
	alignment: "LEFT" | "CENTER" | "RIGHT";
}

/**
 * Represents a grid configuration
 * @interface Grid
 * @property {string} id - Unique identifier for the grid
 * @property {string} name - Display name of the grid
 * @property {Row[]} rows - Array of rows in the grid
 */
export interface Grid {
	id: string;
	name: string;
	rows: Row[];
}

/**
 * Represents a row in a grid
 * @interface Row
 * @property {string} id - Unique identifier for the row
 * @property {string} templateId - ID of the template to apply
 * @property {string[]} products - Array of product IDs in the row (1-3 products)
 */
export interface Row {
	id: string;
	templateId: string;
	products: string[]; // Product IDs
}

/**
 * Mock product data
 * Contains a variety of clothing and accessories
 * @constant {Product[]}
 */
export const products: Product[] = [
	{
		id: "prod_001",
		name: "Blue Jean",
		image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
		price: {
			amount: 36.87,
			currency: "EUR",
		},
	},
	{
		id: "prod_002",
		name: "White T-Shirt",
		image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
		price: {
			amount: 19.99,
			currency: "EUR",
		},
	},
	{
		id: "prod_003",
		name: "Leather Jacket",
		image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
		price: {
			amount: 89.95,
			currency: "EUR",
		},
	},
	{
		id: "prod_004",
		name: "Summer Dress",
		image: "https://images.unsplash.com/photo-1623609163859-ca93c959b98a?w=400",
		price: {
			amount: 45.5,
			currency: "EUR",
		},
	},
	{
		id: "prod_005",
		name: "Running Shoes",
		image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
		price: {
			amount: 59.99,
			currency: "EUR",
		},
	},
	{
		id: "prod_006",
		name: "Wool Beanie",
		image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=400",
		price: {
			amount: 15.75,
			currency: "EUR",
		},
	},
	{
		id: "prod_007",
		name: "Blue Jean",
		image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
		price: {
			amount: 36.87,
			currency: "EUR",
		},
	},
	{
		id: "prod_008",
		name: "Backpack",
		image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
		price: {
			amount: 49.95,
			currency: "EUR",
		},
	},
	{
		id: "prod_009",
		name: "Watch",
		image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=400",
		price: {
			amount: 125.0,
			currency: "EUR",
		},
	},
	{
		id: "prod_010",
		name: "Sneakers",
		image: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?w=400",
		price: {
			amount: 75.5,
			currency: "EUR",
		},
	},
];

/**
 * Mock template data
 * Defines available row alignment options
 * @constant {Template[]}
 */
export const templates: Template[] = [
	{
		id: "template_001",
		name: "Aesthetic Left",
		alignment: "LEFT",
	},
	{
		id: "template_002",
		name: "Centered Style",
		alignment: "CENTER",
	},
	{
		id: "template_003",
		name: "Right Aligned",
		alignment: "RIGHT",
	},
];

/**
 * Mock grids storage
 * In-memory storage for saved grid configurations
 * Note: In a serverless environment, this will reset between function invocations
 * In production, this should be replaced with a database
 * @constant {Grid[]}
 */
export const grids: Grid[] = [];
