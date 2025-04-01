import React from "react";

interface GridStatsProps {
	totalProducts: number;
	displayedProducts: number;
	rowCount: number;
	specifiedRowCount: number | null;
	hasLimitedProducts: boolean;
	"data-testid"?: string;
}

/**
 * Displays statistics about the product grid with Zara-inspired minimalist style
 * Shows product counts, row information, and any display limitations
 */
const GridStats: React.FC<GridStatsProps> = ({
	totalProducts,
	displayedProducts,
	rowCount,
	specifiedRowCount,
	hasLimitedProducts,
	...props
}) => {
	return (
		<div className="mb-6 md:mb-0" {...props}>
			<p className="text-xs uppercase tracking-wider font-light">
				{displayedProducts} of {totalProducts} products displayed in {rowCount}{" "}
				rows
			</p>

			{specifiedRowCount !== null && (
				<p className="text-xs font-light mt-2">
					Using specified row count: {specifiedRowCount}
				</p>
			)}

			{hasLimitedProducts && (
				<p className="text-xs mt-3 font-light">
					Some products are not displayed due to row constraints (max 3 products
					per row).
					<br />
					<span className="mt-1 inline-block">
						Add more rows with the parameter:{" "}
						<span className="font-medium">?rows=5</span>
					</span>
				</p>
			)}
		</div>
	);
};

export default GridStats;
