import { Product } from "../types";

const LOCAL_API_URL = import.meta.env.VITE_LOCAL_API_URL;

/**
 * Fetches products from the backend API based on provided product IDs
 * @param productIds - Array of product identifiers to fetch
 * @returns Promise containing array of products
 */
export const fetchProducts = async (
	productIds: string[]
): Promise<Product[]> => {
	try {
		// Create a comma-separated string of product IDs
		const idsParam = productIds.join(",");
		const response = await fetch(`${LOCAL_API_URL}/products?ids=${idsParam}`);

		if (!response.ok) {
			throw new Error("Failed to fetch products");
		}

		const data = await response.json();
		return data || [];
	} catch (error) {
		console.error("Error fetching products:", error);
		return [];
	}
};
