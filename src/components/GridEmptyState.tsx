import React from "react";

/**
 * Properties for the GridEmptyState component
 */
interface GridEmptyStateProps {
	"data-testid"?: string;
}

/**
 * Displays an empty state message when no products are available
 * Provides instructions for loading products
 */
const GridEmptyState: React.FC<GridEmptyStateProps> = (props) => {
	const apiUrl = import.meta.env.VITE_LOCAL_API_URL || "http://localhost:3001";

	return (
		<div
			className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg"
			{...props}
		>
			<h2 className="text-2xl font-bold text-gray-700 mb-3">
				No Products Found
			</h2>
			<p className="text-gray-500 mb-6 max-w-md mx-auto">
				Add product IDs as URL parameters to start building your grid.
			</p>

			<div className="mb-8">
				<p className="font-medium text-gray-600 mb-2">Example URL:</p>
				<code className="bg-gray-100 px-3 py-2 rounded-md text-sm break-all">
					<a
						href={`${apiUrl}/products?ids=prod_001,prod_002,prod_003`}
						className="text-blue-600 hover:underline"
						target="_blank"
						rel="noreferrer"
					>
						{apiUrl}/products?ids=prod_001,prod_002,prod_003
					</a>
				</code>
			</div>

			<p className="text-gray-500 text-sm max-w-md mx-auto">
				You can also specify the number of rows by adding the{" "}
				<code className="bg-gray-100 px-1.5 py-0.5 rounded-sm">rows</code>{" "}
				parameter.
			</p>
		</div>
	);
};

export default GridEmptyState;
