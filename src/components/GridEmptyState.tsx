import React from "react";

/**
 * Properties for the GridEmptyState component
 */
interface GridEmptyStateProps {
	"data-testid"?: string;
}

/**
 * Displays an empty state message when no products are available
 * Uses Zara-inspired minimalist design
 */
const GridEmptyState: React.FC<GridEmptyStateProps> = (props) => {
	const apiUrl = import.meta.env.VITE_LOCAL_API_URL || "http://localhost:3001";

	return (
		<div className="pt-16 pb-20 flex flex-col items-center" {...props}>
			<div className="w-full max-w-screen-xl mx-auto px-6 md:px-8">
				<div className="border-t border-gray-200 pt-10 text-center">
					<h2 className="text-base uppercase tracking-wider font-light mb-6">
						No Products Found
					</h2>
					<p className="text-xs text-gray-500 max-w-md mx-auto mb-8">
						Add product IDs as URL parameters to start building your grid.
					</p>

					<div className="mb-8">
						<p className="text-xs text-gray-700 mb-3 uppercase tracking-wider">
							Example URL:
						</p>
						<code className="bg-gray-50 px-4 py-3 font-mono text-xs block max-w-md mx-auto border border-gray-100">
							<a
								href={`${apiUrl}/products?ids=prod_001,prod_002,prod_003`}
								className="text-black hover:underline"
								target="_blank"
								rel="noreferrer"
							>
								{apiUrl}/products?ids=prod_001,prod_002,prod_003
							</a>
						</code>
					</div>

					<p className="text-xs text-gray-500 max-w-md mx-auto">
						You can also specify the number of rows by adding the{" "}
						<code className="bg-gray-50 px-1.5 py-0.5 text-xs border border-gray-100">
							rows
						</code>{" "}
						parameter.
					</p>
				</div>
			</div>
		</div>
	);
};

export default GridEmptyState;
