/**
 * Mock data for the ZARI store application
 * Contains products and templates information
 */

// Types
export interface Product {
	id: string;
	name: string;
	image: string;
	price: {
		amount: number;
		currency: string;
	};
}

export interface Template {
	id: string;
	name: string;
	alignment: "LEFT" | "CENTER" | "RIGHT";
}

export interface Grid {
	id: string;
	name: string;
	rows: Row[];
}

export interface Row {
	id: string;
	templateId: string;
	products: string[]; // Product IDs
}

// Mock Products
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

// Mock Templates
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

// Mock Saved Grids
export const grids: Grid[] = [];
