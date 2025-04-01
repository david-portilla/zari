import React from "react";

/**
 * Displays a message when no products are found
 */
const GridEmptyState: React.FC = () => {
	return (
		<div
			className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200"
			data-testid="grid-empty-state"
		>
			<div className="text-gray-400 text-4xl mb-4">
				<span role="img" aria-label="Empty box">
					📦
				</span>
			</div>
			<h3 className="text-lg font-medium text-gray-700 mb-2">
				No Products Found
			</h3>
			<p className="text-gray-500 mb-4">
				No products were found with the specified IDs.
			</p>

			<p className="text-gray-500">
				Please check that server is running and that the product IDs are
				correct.
				<br />
			</p>
			<a
				className="text-blue-500"
				href="http://localhost:3001/products?ids=prod_001,prod_002,prod_003"
				target="_blank"
				rel="noopener noreferrer"
			>
				Example: http://localhost:3001/products?ids=prod_001,prod_002,prod_003
			</a>
		</div>
	);
};

export default GridEmptyState;
