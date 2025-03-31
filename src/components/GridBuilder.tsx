import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { Product, ProductRow, RowAlignment } from "../types";
import { fetchProducts } from "../services/productService";
import ProductRowComponent from "./ProductRow";

/**
 * Main component for building and managing the product grid
 * Parses product IDs from URL and creates initial grid layout
 */

export const GridBuilder: React.FC = () => {
	const [searchParams] = useSearchParams();
	const [products, setProducts] = useState<Product[]>([]);
	const [rows, setRows] = useState<ProductRow[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadProducts = async () => {
			setLoading(true);
			setError(null);

			// Get product IDs from URL
			const productIdsParam = searchParams.get("productIds");

			if (!productIdsParam) {
				setError(
					"No product IDs specified in URL. Use format: ?productIds=prod_001,prod_002,..."
				);

				setLoading(false);
				return;
			}

			const productIds = productIdsParam.split(",");

			try {
				const fetchedProducts = await fetchProducts(productIds);
				setProducts(fetchedProducts);

				// Create initial row distribution
				if (fetchedProducts.length > 0) {
					createInitialRows(fetchedProducts);
				}
			} catch (err) {
				setError("Failed to load products");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		loadProducts();
	}, [searchParams]);

	/**
	 * Creates initial row distribution based on fetched products
	 * @param productList - List of products to distribute into rows
	 */
	const createInitialRows = (productList: Product[]) => {
		const MAX_PRODUCTS_PER_ROW = 3;
		const initialRows: ProductRow[] = [];
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

		setRows(initialRows);
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

	if (loading) {
		return <div className="text-center py-8">Loading products...</div>;
	}

	if (error) {
		return <div className="text-center py-8 text-red-500">{error}</div>;
	}

	if (products.length === 0) {
		return <div className="text-center py-8">No products found</div>;
	}

	return (
		<main>
			<div className="max-w-5xl mx-auto">
				<div className="text-center mb-8">
					<p className="text-gray-500">
						{products.length} products loaded. Organize them into rows with 1-3
						products each.
					</p>
				</div>

				<div className="grid-builder">
					{rows.map((row) => (
						<div key={row.id} className="mb-8">
							<ProductRowComponent
								row={row}
								onTemplateChange={updateRowTemplate}
							/>
						</div>
					))}
				</div>
			</div>
		</main>
	);
};
