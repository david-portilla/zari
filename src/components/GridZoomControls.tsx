import React from "react";

interface GridZoomControlsProps {
	zoomLevel: number;
	onZoomIn: () => void;
	onZoomOut: () => void;
	onReset: () => void;
}

/**
 * Component that displays zoom controls for the product grid
 */
const GridZoomControls: React.FC<GridZoomControlsProps> = ({
	zoomLevel,
	onZoomIn,
	onZoomOut,
	onReset,
}) => {
	return (
		<div className="fixed bottom-4 right-4 flex items-center gap-2 bg-white p-2 rounded-lg shadow-lg">
			<button
				onClick={onZoomOut}
				className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
				title="Zoom Out"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="text-gray-600"
				>
					<circle cx="11" cy="11" r="8" />
					<line x1="21" y1="21" x2="16.65" y2="16.65" />
					<line x1="8" y1="11" x2="14" y2="11" />
				</svg>
			</button>

			<div className="flex items-center gap-2">
				<button
					onClick={onReset}
					className="px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded transition-colors"
				>
					{Math.round(zoomLevel * 100)}%
				</button>
			</div>

			<button
				onClick={onZoomIn}
				className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
				title="Zoom In"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="text-gray-600"
				>
					<circle cx="11" cy="11" r="8" />
					<line x1="21" y1="21" x2="16.65" y2="16.65" />
					<line x1="11" y1="8" x2="11" y2="14" />
					<line x1="8" y1="11" x2="14" y2="11" />
				</svg>
			</button>
		</div>
	);
};

export default GridZoomControls;
