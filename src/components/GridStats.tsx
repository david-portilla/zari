import React from "react";

interface GridStatsProps {
	totalProducts: number;
	displayedProducts: number;
	rowCount: number;
	specifiedRowCount: number | null;
	hasLimitedProducts: boolean;
}

/**
 * Displays statistics and information about the current product grid
 * Shows product counts, row information, and any display limitations
 */
const GridStats: React.FC<GridStatsProps> = ({
	totalProducts,
	displayedProducts,
	rowCount,
	specifiedRowCount,
	hasLimitedProducts,
}) => {
	return (
		<div className="text-center mb-8">
			<p className="text-gray-500">
				{displayedProducts} of {totalProducts} products loaded across {rowCount}{" "}
				rows.
			</p>

			{specifiedRowCount !== null && (
				<p className="text-blue-500 mt-2">
					Using specified row count: {specifiedRowCount}
				</p>
			)}

			{hasLimitedProducts && (
				<p className="text-amber-500 mt-2">
					Some products are not displayed due to row constraints (max 3 products
					per row).
					<br />
					Try adding more rows to the grid via url parameter. Ex:
					<span className="font-bold">?rows=5</span>
				</p>
			)}
		</div>
	);
};

export default GridStats;
