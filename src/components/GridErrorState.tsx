import React from "react";

interface GridErrorStateProps {
	message: string;
	"data-testid"?: string;
}

/**
 * Displays an error message for the grid
 */
const GridErrorState: React.FC<GridErrorStateProps> = ({
	message,
	...props
}) => {
	return (
		<div className="pt-16 pb-20 flex flex-col items-center" {...props}>
			<div className="w-full max-w-screen-xl mx-auto px-6 md:px-8">
				<div className="border-t border-gray-200 pt-10 text-center">
					<h2 className="text-base uppercase tracking-wider font-light mb-6">
						Error
					</h2>
					<div
						className="text-xs font-light mb-8"
						dangerouslySetInnerHTML={{ __html: message }}
					></div>
					<p className="text-xs text-gray-500 max-w-md mx-auto">
						Please check the URL parameters and try again.
					</p>
				</div>
			</div>
		</div>
	);
};

export default GridErrorState;
