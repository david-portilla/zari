/**
 * Represents a product in the store
 */
export interface Product {
	id: string;
	name: string;
	price: {
		amount: number;
		currency: string;
	};
	image: string;
}

/**
 * Defines possible alignment templates for product rows
 */
export type RowAlignment = "left" | "center" | "right";

/**
 * Represents a row in the product grid
 */
export interface ProductRow {
	id: string;
	products: Product[];
	template?: RowAlignment;
}
