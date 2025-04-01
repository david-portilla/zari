import { useState } from "react";
import { ProductRow } from "../types";

interface RowDragState {
	isDragging: boolean;
	sourceRowId: string | null;
}

interface UseRowDragAndDropProps {
	rows: ProductRow[];
	onUpdateRows: (updatedRows: ProductRow[]) => void;
}

/**
 * Custom hook to handle drag and drop functionality for reordering rows
 * @param rows - Current array of product rows
 * @param onUpdateRows - Callback to update rows when changes occur
 * @returns Object containing drag state and handlers for row reordering
 */
export const useRowDragAndDrop = ({
	rows,
	onUpdateRows,
}: UseRowDragAndDropProps) => {
	const [dragState, setDragState] = useState<RowDragState>({
		isDragging: false,
		sourceRowId: null,
	});

	/**
	 * Handles the start of a row drag operation
	 * @param rowId - The ID of the row being dragged
	 */
	const handleRowDragStart = (rowId: string) => {
		setDragState({
			isDragging: true,
			sourceRowId: rowId,
		});
	};

	/**
	 * Handles the end of a row drag operation
	 */
	const handleRowDragEnd = () => {
		setDragState({
			isDragging: false,
			sourceRowId: null,
		});
	};

	/**
	 * Handles when a draggable row enters a drop target
	 * @param event - Drag event
	 */
	const handleRowDragOver = (event: React.DragEvent) => {
		event.preventDefault();
		event.stopPropagation();
	};

	/**
	 * Handles dropping a row into a new position
	 * @param targetRowId - The ID of the row where we're dropping
	 */
	const handleRowDrop = (targetRowId: string) => {
		if (
			!dragState.isDragging ||
			!dragState.sourceRowId ||
			dragState.sourceRowId === targetRowId
		) {
			return;
		}

		const sourceIndex = rows.findIndex(
			(row) => row.id === dragState.sourceRowId
		);
		const targetIndex = rows.findIndex((row) => row.id === targetRowId);

		if (sourceIndex === -1 || targetIndex === -1) {
			return;
		}

		const updatedRows = [...rows];
		const [movedRow] = updatedRows.splice(sourceIndex, 1);
		updatedRows.splice(targetIndex, 0, movedRow);

		onUpdateRows(updatedRows);
		handleRowDragEnd();
	};

	return {
		rowDragState: dragState,
		handleRowDragStart,
		handleRowDragEnd,
		handleRowDragOver,
		handleRowDrop,
	};
};
