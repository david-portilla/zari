import React from "react";
import { useGridParams } from "../hooks/useGridParams";
import { useProductGrid } from "../hooks/useProductGrid";
import GridStats from "./GridStats";
import ProductGrid from "./ProductGrid";
import GridLoadingState from "./GridLoadingState";
import GridErrorState from "./GridErrorState";
import GridEmptyState from "./GridEmptyState";
import SaveGridButton from "./SaveGridButton";

/**
 * Main component for building and managing the product grid
 * Uses a minimalist design inspired by Zara.com
 */
export const GridBuilder: React.FC = () => {
	const { productIds, rowCount, error: paramError } = useGridParams();

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
		<main data-testid="grid-builder" className="pt-4 pb-20">
			<div className="max-w-screen-xl mx-auto px-6 md:px-8">
				{isFetching && !isLoading && (
					<div
						className="text-[11px] uppercase tracking-wider text-center py-2 mb-6 font-light"
						data-testid="updating-banner"
					>
						Updating products...
					</div>
				)}

				<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
					<GridStats
						totalProducts={products.length}
						displayedProducts={displayedProductCount}
						rowCount={rows.length}
						specifiedRowCount={rowCount}
						hasLimitedProducts={hasLimitedProducts}
						data-testid="grid-stats"
					/>
					<SaveGridButton rows={rows} />
				</div>

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
