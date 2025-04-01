import React from "react";
import { ProductRow, RowAlignment } from "../types";
import ProductRowComponent from "./ProductRow";

interface ProductGridProps {
	rows: ProductRow[];
	onTemplateChange: (rowId: string, template: RowAlignment) => void;
}

/**
 * Container component displaying all product rows in the grid
 * Manages the layout and renders individual row components
 */
const ProductGrid: React.FC<ProductGridProps> = ({
	rows,
	onTemplateChange,
}) => {
	return (
		<div className="space-y-4" data-testid="product-grid">
			{rows.map((row) => (
				<div key={row.id} className="mb-8">
					<ProductRowComponent row={row} onTemplateChange={onTemplateChange} />
				</div>
			))}
		</div>
	);
};

export default ProductGrid;
