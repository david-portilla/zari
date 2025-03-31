import React from "react";
import { ProductRow as ProductRowType, RowAlignment } from "../types";
import { ProductCard } from "./ProductCard";

interface ProductRowProps {
	row: ProductRowType;
}

/**
 * Displays a row of products with specified alignment
 * Handles rows with 1-3 products
 * @param row - The row data containing products and template alignment
 */
const ProductRow: React.FC<ProductRowProps> = ({ row }) => {
	// Determine the appropriate CSS class based on the template alignment
	const getAlignmentClass = (alignment: RowAlignment | undefined): string => {
		switch (alignment) {
			case "left":
				return "justify-start";
			case "center":
				return "justify-center";
			case "right":
				return "justify-end";
			default:
				return "justify-start"; // Default to left alignment
		}
	};

	// Calculate the width for each product card based on the number of products in the row
	const getCardWidthClass = (productCount: number): string => {
		switch (productCount) {
			case 1:
				return "w-full max-w-xs"; // One product takes up to 320px
			case 2:
				return "w-1/2 max-w-xs"; // Two products each take half the space
			case 3:
				return "w-1/3 max-w-xs"; // Three products each take a third of the space
			default:
				return "w-full max-w-xs";
		}
	};

	const productCount = row.products.length;

	return (
		<div className="mb-8 border-2 border-dashed border-blue-200 p-4 rounded-lg">
			<div className={`flex gap-4 ${getAlignmentClass(row.template)}`}>
				{row.products.map((product) => (
					<div key={product.id} className={getCardWidthClass(productCount)}>
						<ProductCard product={product} />
					</div>
				))}
			</div>
			{row.template && (
				<div className="mt-2 text-sm text-gray-500 text-right">
					Template: {row.template}
				</div>
			)}
		</div>
	);
};

export default ProductRow;
