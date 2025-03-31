import React from "react";
import { ProductRow as ProductRowType, RowAlignment } from "../types";
import { ProductCard } from "./ProductCard";

interface ProductRowProps {
	row: ProductRowType;
	onTemplateChange?: (rowId: string, template: RowAlignment) => void;
}

/**
 * Displays a row of products with specified alignment
 * Handles rows with 1-3 products
 * @param row - The row data containing products and template alignment
 * @param onTemplateChange - Callback for when template changes
 */
const ProductRow: React.FC<ProductRowProps> = ({ row, onTemplateChange }) => {
	// Determine the appropriate CSS class based on the template alignment
	const getAlignmentClass = (alignment: RowAlignment | undefined): string => {
		switch (alignment) {
			case "LEFT":
				return "justify-start";
			case "CENTER":
				return "justify-center";
			case "RIGHT":
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

	/**
	 * Handles the template selection change
	 * @param event - Change event from select element
	 */
	const handleTemplateChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		if (onTemplateChange) {
			onTemplateChange(row.id, event.target.value as RowAlignment);
		}
	};

	const productCount = row.products.length;
	const alignmentClass = getAlignmentClass(row.template);

	return (
		<div className="border-2 border-dashed border-blue-200 p-4 rounded-lg bg-white">
			<div className={`flex gap-4 ${alignmentClass}`}>
				{row.products.map((product) => (
					<div key={product.id} className={getCardWidthClass(productCount)}>
						<ProductCard product={product} />
					</div>
				))}
			</div>

			{/* Template dropdown selector */}
			<div className="mt-3 text-sm flex items-center">
				<label
					htmlFor={`template-${row.id}`}
					className="font-medium mr-2 text-gray-600"
				>
					Template:
				</label>
				<select
					id={`template-${row.id}`}
					value={row.template || "LEFT"}
					onChange={handleTemplateChange}
					className="px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
					disabled={!onTemplateChange}
				>
					<option value="LEFT">Left</option>
					<option value="CENTER">Center</option>
					<option value="RIGHT">Right</option>
				</select>
			</div>
		</div>
	);
};

export default ProductRow;
