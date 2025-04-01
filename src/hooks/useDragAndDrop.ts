import { useState } from "react";
import { Product, ProductRow } from "../types";

interface DragState {
	isDragging: boolean;
	draggedProduct: Product | null;
	sourceRowId: string | null;
}

interface UseDragAndDropProps {
	rows: ProductRow[];
	onUpdateRows: (updatedRows: ProductRow[]) => void;
}

/**
 * Custom hook to handle drag and drop functionality for products between rows
 * @param rows - Current array of product rows
 * @param onUpdateRows - Callback to update rows when changes occur
 * @returns Object containing drag state and handlers for product drag and drop
 */
export const useDragAndDrop = ({ rows, onUpdateRows }: UseDragAndDropProps) => {
	const [dragState, setDragState] = useState<DragState>({
		isDragging: false,
		draggedProduct: null,
		sourceRowId: null,
	});

	/**
	 * Handles the start of a product drag operation
	 * @param product - The product being dragged
	 * @param rowId - The ID of the row containing the product
	 */
	const handleDragStart = (product: Product, rowId: string) => {
		setDragState({
			isDragging: true,
			draggedProduct: product,
			sourceRowId: rowId,
		});
	};

	/**
	 * Handles the end of a product drag operation
	 */
	const handleDragEnd = () => {
		setDragState({
			isDragging: false,
			draggedProduct: null,
			sourceRowId: null,
		});
	};

	/**
	 * Handles when a draggable product enters a drop target
	 * @param event - Drag event
	 */
	const handleDragOver = (event: React.DragEvent) => {
		event.preventDefault();
		event.stopPropagation();
	};

	/**
	 * Handles dropping a product into a row
	 * @param targetRowId - The ID of the row where the product is being dropped
	 */
	const handleDrop = (targetRowId: string) => {
		if (!dragState.draggedProduct || !dragState.sourceRowId) return;

		// If dropping in the same row, do nothing
		if (targetRowId === dragState.sourceRowId) {
			handleDragEnd();
			return;
		}

		// Find target row
		const targetRow = rows.find((row) => row.id === targetRowId);
		if (!targetRow || targetRow.products.length >= 3) return;

		const draggedProduct = dragState.draggedProduct;

		const updatedRows = rows.map((row) => {
			// Remove product from source row
			if (row.id === dragState.sourceRowId) {
				return {
					...row,
					products: row.products.filter((p) => p.id !== draggedProduct.id),
				};
			}
			// Add product to target row
			if (row.id === targetRowId) {
				return {
					...row,
					products: [...row.products, draggedProduct],
				};
			}
			return row;
		});

		onUpdateRows(updatedRows);
		handleDragEnd();
	};

	return {
		dragState,
		handleDragStart,
		handleDragEnd,
		handleDragOver,
		handleDrop,
	};
};
