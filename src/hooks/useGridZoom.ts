import { useState } from "react";

interface UseGridZoomOptions {
	minZoom?: number;
	maxZoom?: number;
	zoomStep?: number;
}

/**
 * Custom hook to manage zoom functionality for the product grid
 * @param options - Configuration options for zoom behavior
 * @returns Object containing zoom state and control functions
 */
export const useGridZoom = (options: UseGridZoomOptions = {}) => {
	const { minZoom = 0.5, maxZoom = 1.5, zoomStep = 0.1 } = options;

	const [zoomLevel, setZoomLevel] = useState(1);

	/**
	 * Increases the zoom level by the zoom step
	 */
	const zoomIn = () => {
		setZoomLevel((prevZoom) =>
			Math.min(maxZoom, Math.round((prevZoom + zoomStep) * 10) / 10)
		);
	};

	/**
	 * Decreases the zoom level by the zoom step
	 */
	const zoomOut = () => {
		setZoomLevel((prevZoom) =>
			Math.max(minZoom, Math.round((prevZoom - zoomStep) * 10) / 10)
		);
	};

	/**
	 * Sets the zoom level to a specific value
	 * @param level - The zoom level to set
	 */
	const setZoom = (level: number) => {
		const clampedLevel = Math.max(minZoom, Math.min(maxZoom, level));
		setZoomLevel(Math.round(clampedLevel * 10) / 10);
	};

	/**
	 * Resets the zoom level to 1 (100%)
	 */
	const resetZoom = () => {
		setZoomLevel(1);
	};

	/**
	 * Gets the CSS transform style for the current zoom level
	 * @returns Object containing transform and transform-origin CSS properties
	 */
	const getZoomStyle = () => ({
		transform: `scale(${zoomLevel})`,
		transformOrigin: "top left",
	});

	return {
		zoomLevel,
		zoomIn,
		zoomOut,
		setZoom,
		resetZoom,
		getZoomStyle,
	};
};
