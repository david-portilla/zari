import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Product, ProductRow, RowAlignment } from "../types";
import { fetchProducts } from "../services/productService";

/**
 * Custom hook for managing product grid state and operations
 * Handles product loading, row distribution, and template changes
 * @param productIds - Array of product IDs to fetch
 * @param specifiedRowCount - Optional number of rows to create
 * @returns State and operations for the product grid
 */
export const useProductGrid = (
	productIds: string[] | null,
	specifiedRowCount: number | null
) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [rows, setRows] = useState<ProductRow[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	// Track previous prop values to avoid unnecessary re-fetches
	const prevProductIdsRef = useRef<string[] | null>(null);
	const prevRowCountRef = useRef<number | null>(null);

	// Constants for grid layout
	const MIN_PRODUCTS_PER_ROW = 1;
	const MAX_PRODUCTS_PER_ROW = 3;

	/**
	 * Creates initial row distribution based on fetched products and optional row count
	 * @param productList - List of products to distribute into rows
	 * @param rowCount - Optional number of rows to create
	 */
	const distributeProductsIntoRows = (
		productList: Product[],
		rowCount: number | null
	): ProductRow[] => {
		const initialRows: ProductRow[] = [];

		// If row count is specified, distribute products accordingly
		if (rowCount !== null) {
			// Calculate how many products we can actually display with the constraints
			const maxDisplayableProducts = Math.min(
				productList.length,
				rowCount * MAX_PRODUCTS_PER_ROW
			);

			// Check if we have enough products to meet minimum requirements
			if (maxDisplayableProducts < rowCount) {
				// We don't have enough products to create the specified number of rows
				// with at least 1 product per row
				const possibleRows = Math.min(rowCount, productList.length);

				// Create rows with 1 product each up to the number of products we have
				for (let i = 0; i < possibleRows; i++) {
					initialRows.push({
						id: uuidv4(),
						products: [productList[i]],
						template: "LEFT", // Default template
					});
				}
			} else {
				// We have enough products to distribute
				// Try to distribute products evenly across the specified rows
				const productsToDistribute = productList.slice(
					0,
					maxDisplayableProducts
				);
				const baseProductsPerRow = Math.floor(
					productsToDistribute.length / rowCount
				);
				let remainingProducts = productsToDistribute.length % rowCount;

				let productIndex = 0;

				// Create the specified number of rows
				for (let i = 0; i < rowCount; i++) {
					// Calculate how many products to put in this row
					let productsInThisRow = baseProductsPerRow;

					// Distribute remaining products one per row until they're gone
					if (remainingProducts > 0) {
						productsInThisRow++;
						remainingProducts--;
					}

					// Ensure we don't exceed MAX_PRODUCTS_PER_ROW
					productsInThisRow = Math.min(productsInThisRow, MAX_PRODUCTS_PER_ROW);

					// Ensure we have at least MIN_PRODUCTS_PER_ROW
					if (productsInThisRow >= MIN_PRODUCTS_PER_ROW) {
						const rowProducts = productsToDistribute.slice(
							productIndex,
							productIndex + productsInThisRow
						);

						initialRows.push({
							id: uuidv4(),
							products: rowProducts,
							template: "LEFT", // Default template
						});

						productIndex += productsInThisRow;
					}
				}
			}
		} else {
			// No row count specified, distribute products automatically
			// (max 3 products per row)
			let currentRow: Product[] = [];

			productList.forEach((product, index) => {
				currentRow.push(product);

				// Create a new row after 3 products or at the end
				if (
					currentRow.length === MAX_PRODUCTS_PER_ROW ||
					index === productList.length - 1
				) {
					initialRows.push({
						id: uuidv4(),
						products: [...currentRow],
						template: "LEFT", // Default template
					});
					currentRow = [];
				}
			});
		}

		return initialRows;
	};

	/**
	 * Updates the template/alignment for a specific row
	 * @param rowId - ID of the row to update
	 * @param template - New template alignment to apply
	 */
	const updateRowTemplate = (rowId: string, template: RowAlignment) => {
		setRows((prevRows) =>
			prevRows.map((row) => (row.id === rowId ? { ...row, template } : row))
		);
	};

	// Convert productIds array to string for stable dependency comparison
	const productIdsString = productIds ? productIds.join(",") : "";

	// Load products on component mount or when inputs change
	useEffect(() => {
		const loadProducts = async () => {
			if (!productIds || productIds.length === 0) {
				setError("No product IDs provided");
				setLoading(false);
				return;
			}

			setLoading(true);
			setError(null);

			try {
				const fetchedProducts = await fetchProducts(productIds);
				setProducts(fetchedProducts);

				// Create initial row distribution
				if (fetchedProducts.length > 0) {
					const initialRows = distributeProductsIntoRows(
						fetchedProducts,
						specifiedRowCount
					);
					setRows(initialRows);
				} else {
					setRows([]);
				}
			} catch (err) {
				setError("Failed to load products");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		loadProducts();

		// Update refs with current values
		prevProductIdsRef.current = productIds ? [...productIds] : null;
		prevRowCountRef.current = specifiedRowCount;
	}, [productIdsString, specifiedRowCount]);

	// Calculate displayed vs total products
	const displayedProductCount = rows.reduce(
		(total, row) => total + row.products.length,
		0
	);
	const hasLimitedProducts = displayedProductCount < products.length;

	return {
		products,
		rows,
		loading,
		error,
		displayedProductCount,
		hasLimitedProducts,
		updateRowTemplate,
	};
};
