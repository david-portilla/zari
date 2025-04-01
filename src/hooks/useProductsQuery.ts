import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Product } from "../types";

/**
 * Type representing the raw API response for products
 */
type ProductsApiResponse = Product[];

/**
 * Fetches products from the backend API based on provided product IDs
 * @param productIds - Array of product identifiers to fetch
 * @returns Promise containing array of products
 */
const fetchProducts = async (
	productIds: string[]
): Promise<ProductsApiResponse> => {
	if (!productIds.length) return [];

	const apiUrl = import.meta.env.VITE_LOCAL_API_URL || "http://localhost:3001";
	const url = `${apiUrl}/products?ids=${productIds}`;

	try {
		const response = await fetch(url);
		const data = await response.json();
		if (!Array.isArray(data)) {
			console.warn("Server returned non-array data:", data);
			return [];
		}

		return data;
	} catch (error) {
		console.error("Error fetching products:", error);
		throw error;
	}
};

/**
 * Query key factory for products queries
 * Helps with consistent query keys for caching and invalidation
 */
export const productKeys = {
	all: ["products"] as const,
	list: (ids: string[]) => [...productKeys.all, "list", ids] as const,
};

/**
 * React Query hook for fetching products by IDs
 * Provides loading, error, and data states with caching and refetching capabilities
 * @param productIds - Array of product IDs to fetch
 * @param options - Additional TanStack Query options
 * @returns Query result with products data, loading and error states
 */
export const useProductsQuery = (
	productIds: string[] | null,
	options?: UseQueryOptions<
		Product[], // TData - The type of data that will be available to components
		Error, // TError - The type of error
		ProductsApiResponse, // TQueryFnData - The type of data returned by the API
		ReturnType<typeof productKeys.list> // TQueryKey - The type of the query key
	>
) => {
	const result = useQuery({
		queryKey: productKeys.list(productIds || []),
		queryFn: () => fetchProducts(productIds || []),
		// Don't run the query if no product IDs are provided
		enabled: !!productIds && productIds.length > 0,
		// Default to an empty array if query is disabled
		initialData: [],
		// For debugging, disable caching temporarily
		staleTime: 0,
		gcTime: 1000, // 1 second cache
		...options,
	});

	return result;
};
