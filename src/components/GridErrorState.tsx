import React from "react";

interface GridErrorStateProps {
	message: string;
	"data-testid"?: string;
}

/**
 * Displays an error message for the grid
 * Used for parameter validation errors or API errors
 * Can render HTML content in the message
 */
const GridErrorState: React.FC<GridErrorStateProps> = ({
	message,
	...props
}) => {
	return (
		<div className="text-center py-8" {...props}>
			<div
				className="text-red-500 font-medium"
				dangerouslySetInnerHTML={{ __html: message }}
			></div>
			<p className="text-gray-500 mt-4">
				Please check the URL parameters and try again.
			</p>
		</div>
	);
};

export default GridErrorState;
