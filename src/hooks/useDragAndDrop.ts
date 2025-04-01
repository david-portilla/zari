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
 * and for reordering products within a row
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
	 * Handles the end of a drag operation, resetting the drag state
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
	 * @param targetPosition - Optional index position within the row to place the product
	 */
	const handleDrop = (targetRowId: string, targetPosition?: number) => {
		if (!dragState.draggedProduct || !dragState.sourceRowId) return;

		const sourceRowId = dragState.sourceRowId;
		const draggedProduct = dragState.draggedProduct;

		// If dropping in the same row and no target position, do nothing and reset
		if (targetRowId === sourceRowId && targetPosition === undefined) {
			handleDragEnd();
			return;
		}

		const updatedRows = [...rows];

		// Find source and target row indexes
		const sourceRowIndex = updatedRows.findIndex(
			(row) => row.id === sourceRowId
		);
		const targetRowIndex = updatedRows.findIndex(
			(row) => row.id === targetRowId
		);

		if (sourceRowIndex === -1 || targetRowIndex === -1) {
			handleDragEnd();
			return;
		}

		// Same row reordering
		if (targetRowId === sourceRowId && targetPosition !== undefined) {
			const rowProducts = [...updatedRows[sourceRowIndex].products];

			// Validate target position
			if (targetPosition < 0 || targetPosition > rowProducts.length) {
				handleDragEnd();
				return;
			}

			// Find the position of the dragged product
			const currentPosition = rowProducts.findIndex(
				(p) => p.id === draggedProduct.id
			);
			if (currentPosition === -1) {
				handleDragEnd();
				return;
			}

			// If dropping in the same position, do nothing
			if (currentPosition === targetPosition) {
				handleDragEnd();
				return;
			}

			// Remove from current position
			const [productToMove] = rowProducts.splice(currentPosition, 1);

			// If target position is after current position, we need to adjust it
			// because the array length changed after removal
			let finalPosition = targetPosition;
			if (targetPosition > currentPosition) {
				finalPosition = targetPosition - 1;
			}

			// Insert at new position
			rowProducts.splice(finalPosition, 0, productToMove);

			// Update the row
			updatedRows[sourceRowIndex] = {
				...updatedRows[sourceRowIndex],
				products: rowProducts,
			};
		}
		// Moving between different rows
		else {
			// Verify target row has capacity
			if (updatedRows[targetRowIndex].products.length >= 3) {
				handleDragEnd();
				return;
			}

			// Remove from source row
			updatedRows[sourceRowIndex] = {
				...updatedRows[sourceRowIndex],
				products: updatedRows[sourceRowIndex].products.filter(
					(p) => p.id !== draggedProduct.id
				),
			};

			// Add to target row at specific position or at the end
			if (targetPosition !== undefined) {
				// Validate target position
				if (
					targetPosition < 0 ||
					targetPosition > updatedRows[targetRowIndex].products.length
				) {
					handleDragEnd();
					return;
				}

				const targetProducts = [...updatedRows[targetRowIndex].products];
				targetProducts.splice(targetPosition, 0, draggedProduct);
				updatedRows[targetRowIndex] = {
					...updatedRows[targetRowIndex],
					products: targetProducts,
				};
			} else {
				// Add to the end of target row
				updatedRows[targetRowIndex] = {
					...updatedRows[targetRowIndex],
					products: [...updatedRows[targetRowIndex].products, draggedProduct],
				};
			}
		}

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
