import React from "react";
import { ProductRow as ProductRowType, RowAlignment } from "../types";
import ProductRowComponent from "./ProductRow";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { useRowDragAndDrop } from "../hooks/useRowDragAndDrop";
import { useGridZoom } from "../hooks/useGridZoom";
import GridZoomControls from "./GridZoomControls";

interface ProductGridProps {
	rows: ProductRowType[];
	onTemplateChange: (rowId: string, template: RowAlignment) => void;
	onUpdateRows: (updatedRows: ProductRowType[]) => void;
}

/**
 * Container component displaying all product rows in the grid
 * Manages the layout and renders individual row components
 * Handles drag and drop functionality for both products between rows
 * and row reordering
 */
const ProductGrid: React.FC<ProductGridProps> = ({
	rows,
	onTemplateChange,
	onUpdateRows,
}) => {
	const {
		dragState: productDragState,
		handleDragStart: handleProductDragStart,
		handleDragEnd: handleProductDragEnd,
		handleDrop: handleProductDrop,
	} = useDragAndDrop({ rows, onUpdateRows });

	const {
		rowDragState,
		handleRowDragStart,
		handleRowDragEnd,
		handleRowDragOver,
		handleRowDrop,
	} = useRowDragAndDrop({ rows, onUpdateRows });

	const { zoomLevel, zoomIn, zoomOut, resetZoom, getZoomStyle } = useGridZoom({
		minZoom: 0.5,
		maxZoom: 1.5,
		zoomStep: 0.1,
	});

	/**
	 * Handles drag over events for both products and rows
	 * Prevents default behavior and applies necessary visual feedback
	 * @param event - The drag over event
	 */
	const handleDragOverEvent = (event: React.DragEvent) => {
		event.preventDefault();
		if (productDragState.isDragging) {
			handleRowDragOver(event);
		}
	};

	/**
	 * Handles drop events for both products and rows
	 * Determines the type of drag operation and calls appropriate handler
	 * @param event - The drop event
	 * @param targetRowId - The ID of the target row
	 */
	const handleDropEvent = (event: React.DragEvent, targetRowId: string) => {
		event.preventDefault();
		event.stopPropagation();

		if (productDragState.isDragging && productDragState.draggedProduct) {
			handleProductDrop(targetRowId);
			handleProductDragEnd();
		} else if (rowDragState.isDragging && rowDragState.sourceRowId) {
			handleRowDrop(targetRowId);
			handleRowDragEnd();
		}
	};

	/**
	 * Gets the opacity class for a row based on current drag states
	 * @param rowId - The ID of the row to get opacity for
	 * @returns The appropriate opacity class string
	 */
	const getRowOpacityClass = (rowId: string): string => {
		if (rowDragState.isDragging && rowDragState.sourceRowId === rowId) {
			return "opacity-50";
		}
		if (rowDragState.isDragging) {
			return "hover:opacity-75";
		}
		if (productDragState.isDragging && productDragState.sourceRowId === rowId) {
			return "opacity-75";
		}
		return "";
	};

	/**
	 * Gets the cursor class based on current drag states
	 * @returns The appropriate cursor class string
	 */
	const getCursorClass = (): string => {
		if (rowDragState.isDragging) {
			return "cursor-grabbing";
		}
		return "cursor-grab";
	};

	/**
	 * Handles mouse wheel events for zooming
	 * @param event - The wheel event
	 */
	const handleWheel = (event: React.WheelEvent) => {
		if (event.ctrlKey || event.metaKey) {
			event.preventDefault();
			if (event.deltaY < 0) {
				zoomIn();
			} else {
				zoomOut();
			}
		}
	};

	return (
		<div className="relative min-h-[50vh] bg-gray-50">
			{/* Grid container with dynamic height */}
			<div className="h-full overflow-x-auto" onWheel={handleWheel}>
				{/* Zoom container with padding */}
				<div className="p-8">
					{/* Grid content with zoom transform */}
					<div
						className="relative origin-top-left transition-transform duration-200 ease-in-out"
						style={getZoomStyle()}
					>
						{rows.map((row) => (
							<div
								key={row.id}
								draggable
								onDragStart={() => handleRowDragStart(row.id)}
								onDragEnd={handleRowDragEnd}
								onDragOver={handleDragOverEvent}
								onDrop={(e) => handleDropEvent(e, row.id)}
								className={`
									mb-8 transition-all duration-200 
									${getCursorClass()}
									${getRowOpacityClass(row.id)}
								`}
							>
								<ProductRowComponent
									row={row}
									onTemplateChange={onTemplateChange}
									onDragStart={handleProductDragStart}
									onDragEnd={handleProductDragEnd}
									isDragging={productDragState.isDragging}
									draggedProductId={productDragState.draggedProduct?.id}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
			<GridZoomControls
				zoomLevel={zoomLevel}
				onZoomIn={zoomIn}
				onZoomOut={zoomOut}
				onReset={resetZoom}
			/>
		</div>
	);
};

export default ProductGrid;
