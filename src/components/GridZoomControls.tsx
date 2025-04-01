import React from "react";

interface GridZoomControlsProps {
	zoomLevel: number;
	onZoomIn: () => void;
	onZoomOut: () => void;
	onReset: () => void;
}

/**
 * Component that displays zoom controls for the product grid with Zara-inspired minimalist styling
 */
const GridZoomControls: React.FC<GridZoomControlsProps> = ({
	zoomLevel,
	onZoomIn,
	onZoomOut,
	onReset,
}) => {
	return (
		<div className="fixed bottom-6 right-6 flex items-center gap-3 bg-white p-3 border border-gray-100 shadow-sm">
			<button
				onClick={onZoomOut}
				className="p-1 hover:bg-gray-50 transition-colors"
				title="Zoom Out"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="text-gray-800"
				>
					<line x1="5" y1="12" x2="19" y2="12" />
				</svg>
			</button>

			<div className="flex items-center">
				<button
					onClick={onReset}
					className="px-1 py-0.5 text-xs font-light hover:underline"
				>
					{Math.round(zoomLevel * 100)}%
				</button>
			</div>

			<button
				onClick={onZoomIn}
				className="p-1 hover:bg-gray-50 transition-colors"
				title="Zoom In"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="text-gray-800"
				>
					<line x1="12" y1="5" x2="12" y2="19" />
					<line x1="5" y1="12" x2="19" y2="12" />
				</svg>
			</button>
		</div>
	);
};

export default GridZoomControls;
