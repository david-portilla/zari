import React from "react";
import { ProductRow, RowAlignment } from "../types";
import ProductRowComponent from "./ProductRow";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import { useRowDragAndDrop } from "../hooks/useRowDragAndDrop";

interface ProductGridProps {
	rows: ProductRow[];
	onTemplateChange: (rowId: string, template: RowAlignment) => void;
	onUpdateRows: (updatedRows: ProductRow[]) => void;
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
		handleDragOver: handleProductDragOver,
		handleDrop: handleProductDrop,
	} = useDragAndDrop({ rows, onUpdateRows });

	const {
		rowDragState,
		handleRowDragStart,
		handleRowDragEnd,
		handleRowDragOver,
		handleRowDrop,
	} = useRowDragAndDrop({ rows, onUpdateRows });

	/**
	 * Handles drag over events for both products and rows
	 * Prevents default behavior and applies necessary visual feedback
	 * @param event - The drag over event
	 */
	const handleDragOverEvent = (event: React.DragEvent) => {
		event.preventDefault();
		if (productDragState.isDragging) {
			handleProductDragOver(event);
		}
		if (rowDragState.isDragging) {
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

	return (
		<div className="space-y-4" data-testid="product-grid">
			{rows.map((row) => (
				<div
					key={row.id}
					className={`mb-8 ${getCursorClass()} transition-all duration-200 ${getRowOpacityClass(
						row.id
					)}`}
					draggable
					onDragStart={() => handleRowDragStart(row.id)}
					onDragEnd={handleRowDragEnd}
					onDragOver={handleDragOverEvent}
					onDrop={(e) => handleDropEvent(e, row.id)}
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
	);
};

export default ProductGrid;
