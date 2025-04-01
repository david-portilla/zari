import React from "react";

/**
 * Displays a loading state while products are being fetched
 */
const GridLoadingState: React.FC = () => {
	return (
		<div className="text-center py-12" data-testid="grid-loading-state">
			<div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
			<p className="text-gray-600">Loading products...</p>
		</div>
	);
};

export default GridLoadingState;
