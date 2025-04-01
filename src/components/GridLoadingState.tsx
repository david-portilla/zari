import React from "react";

interface GridLoadingStateProps {
	"data-testid"?: string;
}

/**
 * Displays a loading state for the grid with minimal Zara-inspired styling
 */
const GridLoadingState: React.FC<GridLoadingStateProps> = (props) => {
	return (
		<div
			className="pt-12 pb-20 flex flex-col items-center justify-center"
			{...props}
		>
			<div className="w-full max-w-screen-xl mx-auto px-6 md:px-8">
				<div className="flex flex-col items-center">
					<div className="w-6 h-6 border-t-2 border-r-2 border-black animate-spin mb-6"></div>
					<p className="text-xs uppercase tracking-wider font-light">
						Loading products
					</p>
				</div>
			</div>
		</div>
	);
};

export default GridLoadingState;
