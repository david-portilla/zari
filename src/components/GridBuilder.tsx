import React from "react";
import { useGridParams } from "../hooks/useGridParams";
import { useProductGrid } from "../hooks/useProductGrid";
import GridStats from "./GridStats";
import ProductGrid from "./ProductGrid";
import GridLoadingState from "./GridLoadingState";
import GridErrorState from "./GridErrorState";
import GridEmptyState from "./GridEmptyState";

/**
 * Main component for building and managing the product grid
 * Orchestrates the different components and handles state transitions
 * Implements the Single Responsibility and Open/Closed principles of SOLID
 */
export const GridBuilder: React.FC = () => {
	// Parse URL parameters
	const { productIds, rowCount, error: paramError } = useGridParams();

	// Initialize grid state with parsed parameters
	const {
		products,
		rows,
		loading,
		error: apiError,
		displayedProductCount,
		hasLimitedProducts,
		updateRowTemplate,
	} = useProductGrid(productIds, rowCount);

	// Handle error states
	if (paramError) {
		return <GridErrorState message={paramError} />;
	}

	if (loading) {
		return <GridLoadingState />;
	}

	if (apiError) {
		return <GridErrorState message={apiError} />;
	}

	if (products.length === 0) {
		return <GridEmptyState />;
	}

	return (
		<main>
			<div className="max-w-5xl mx-auto">
				<GridStats
					totalProducts={products.length}
					displayedProducts={displayedProductCount}
					rowCount={rows.length}
					specifiedRowCount={rowCount}
					hasLimitedProducts={hasLimitedProducts}
				/>
				<ProductGrid rows={rows} onTemplateChange={updateRowTemplate} />
			</div>
		</main>
	);
};
