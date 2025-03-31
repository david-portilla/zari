import React from "react";

interface GridErrorStateProps {
	message: string;
}

/**
 * Displays an error message for the grid
 * Used for parameter validation errors or API errors
 */
const GridErrorState: React.FC<GridErrorStateProps> = ({ message }) => {
	return (
		<div className="text-center py-8">
			<div className="text-red-500 font-medium">{message}</div>
			<p className="text-gray-500 mt-4">
				Please check the URL parameters and try again.
			</p>
		</div>
	);
};

export default GridErrorState;
