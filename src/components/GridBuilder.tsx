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
		isLoading,
		isFetching,
		error: apiError,
		displayedProductCount,
		hasLimitedProducts,
		updateRowTemplate,
		updateRows,
	} = useProductGrid(productIds, rowCount);

	// Handle error states
	if (paramError) {
		return (
			<GridErrorState message={paramError} data-testid="grid-error-state" />
		);
	}

	if (isLoading) {
		return <GridLoadingState data-testid="grid-loading-state" />;
	}

	if (apiError) {
		return <GridErrorState message={apiError} data-testid="grid-error-state" />;
	}

	if (!isLoading && !isFetching && products.length === 0) {
		return <GridEmptyState data-testid="grid-empty-state" />;
	}

	return (
		<main data-testid="grid-builder">
			<div className="max-w-5xl mx-auto">
				{isFetching && !isLoading && (
					<div
						className="bg-blue-50 text-blue-600 text-center py-2 mb-4 rounded-md"
						data-testid="updating-banner"
					>
						Updating products...
					</div>
				)}

				<GridStats
					totalProducts={products.length}
					displayedProducts={displayedProductCount}
					rowCount={rows.length}
					specifiedRowCount={rowCount}
					hasLimitedProducts={hasLimitedProducts}
					data-testid="grid-stats"
				/>
				<ProductGrid
					rows={rows}
					onTemplateChange={updateRowTemplate}
					onUpdateRows={updateRows}
					data-testid="product-grid"
				/>
			</div>
		</main>
	);
};
