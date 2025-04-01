import React, { useRef, useEffect } from "react";
import { Product, ProductRow as ProductRowType, RowAlignment } from "../types";
import { ProductCard } from "./ProductCard";

interface ProductRowProps {
	row: ProductRowType;
	onTemplateChange?: (rowId: string, template: RowAlignment) => void;
	onDragStart: (product: Product, rowId: string) => void;
	onDragEnd: () => void;
	onProductDropInRow?: (rowId: string, position: number) => void;
	isDragging: boolean;
	draggedProductId?: string;
}

/**
 * Displays a row of products with specified alignment
 * Handles rows with 1-3 products and drag and drop functionality
 * @param row - The row data containing products and template alignment
 * @param onTemplateChange - Callback for when template changes
 * @param onDragStart - Callback for when drag starts
 * @param onDragEnd - Callback for when drag ends
 * @param onProductDropInRow - Callback for when a product is dropped at a specific position
 * @param isDragging - Whether a product is currently being dragged
 * @param draggedProductId - ID of the product being dragged
 */
const ProductRow: React.FC<ProductRowProps> = ({
	row,
	onTemplateChange,
	onDragStart,
	onDragEnd,
	onProductDropInRow,
	isDragging,
	draggedProductId,
}) => {
	// References to track product card elements for position calculation
	const productRefs = useRef<Array<HTMLDivElement | null>>([]);

	// Reset refs when products change
	useEffect(() => {
		productRefs.current = productRefs.current.slice(0, row.products.length);
	}, [row.products]);

	// Determine the appropriate CSS class based on the template alignment
	const getAlignmentClass = (alignment: RowAlignment | undefined): string => {
		switch (alignment) {
			case "LEFT":
				return "justify-start";
			case "CENTER":
				return "justify-center";
			case "RIGHT":
				return "justify-end";
			default:
				return "justify-start"; // Default to left alignment
		}
	};

	// Calculate the width for each product card based on the number of products in the row
	const getCardWidthClass = (productCount: number): string => {
		switch (productCount) {
			case 1:
				return "w-full max-w-xs"; // One product takes up to 320px
			case 2:
				return "w-1/2 max-w-xs"; // Two products each take half the space
			case 3:
				return "w-1/3 max-w-xs"; // Three products each take a third of the space
			default:
				return "w-full max-w-xs";
		}
	};

	/**
	 * Handles the template selection change
	 * @param event - Change event from select element
	 */
	const handleTemplateChange = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		if (onTemplateChange) {
			onTemplateChange(row.id, event.target.value as RowAlignment);
		}
	};

	/**
	 * Handles drag over on a product card to enable intra-row reordering
	 * @param event - The drag over event
	 */
	const handleProductDragOver = (event: React.DragEvent) => {
		event.preventDefault();
		event.stopPropagation();
	};

	/**
	 * Handles drop on a specific product position within the row
	 * @param event - The drop event
	 * @param index - The target index where the product should be dropped
	 */
	const handleProductDrop = (event: React.DragEvent, index: number) => {
		event.preventDefault();
		event.stopPropagation();

		// Only process if we are in a dragging state and have a callback
		if (isDragging && draggedProductId && onProductDropInRow) {
			onProductDropInRow(row.id, index);
		}
	};

	/**
	 * Calculates the drop position for a product within the row based on mouse position
	 * @param event - The drag over event
	 * @returns The index where the product should be dropped
	 */
	const calculateDropPosition = (event: React.DragEvent): number => {
		const containerRect = event.currentTarget.getBoundingClientRect();
		const mouseX = event.clientX - containerRect.left;

		// If we're dragging to the beginning of the row
		if (mouseX < containerRect.width * 0.1) {
			return 0;
		}

		// If we're dragging to the end of the row
		if (mouseX > containerRect.width * 0.9) {
			return row.products.length;
		}

		// Otherwise, find the closest product card
		for (let i = 0; i < row.products.length; i++) {
			const ref = productRefs.current[i];
			if (!ref) continue;

			const cardRect = ref.getBoundingClientRect();
			const cardCenter = cardRect.left + cardRect.width / 2;

			if (event.clientX < cardCenter) {
				return i;
			}
		}

		// Default to the end if no other position is determined
		return row.products.length;
	};

	/**
	 * Handles drag over for the entire row to determine product drop position
	 * @param event - The drag over event
	 */
	const handleRowDragOver = (event: React.DragEvent) => {
		event.preventDefault();
		event.stopPropagation();

		// We only handle this for reordering products, not for row reordering
		if (!isDragging || !draggedProductId) return;

		// Add visual indicators for potential drop positions here if needed
	};

	/**
	 * Handles drop on the row container to determine product position
	 * @param event - The drop event
	 */
	const handleRowDrop = (event: React.DragEvent) => {
		event.preventDefault();
		event.stopPropagation();

		// We only handle this for reordering products, not for row reordering
		if (!isDragging || !draggedProductId || !onProductDropInRow) return;

		const position = calculateDropPosition(event);
		onProductDropInRow(row.id, position);
	};

	const productCount = row.products.length;
	const alignmentClass = getAlignmentClass(row.template);

	/**
	 * Sets a ref for a product card element
	 * @param index - The index in the array to set the ref
	 */
	const setProductRef = (index: number) => (el: HTMLDivElement | null) => {
		productRefs.current[index] = el;
	};

	return (
		<div className="border border-gray-100 shadow-sm p-4 bg-white">
			<div
				className={`flex gap-4 ${alignmentClass} relative`}
				onDragOver={handleRowDragOver}
				onDrop={handleRowDrop}
			>
				{row.products.map((product, index) => (
					<div
						key={product.id}
						ref={setProductRef(index)}
						className={`${getCardWidthClass(productCount)} ${
							isDragging && draggedProductId === product.id ? "opacity-50" : ""
						} transition-all`}
						draggable
						onDragStart={() => onDragStart(product, row.id)}
						onDragEnd={onDragEnd}
						onDragOver={handleProductDragOver}
						onDrop={(e) => handleProductDrop(e, index)}
					>
						<ProductCard product={product} />
					</div>
				))}
			</div>

			{/* Template dropdown selector */}
			<div className="mt-3 text-sm flex items-center">
				<label
					htmlFor={`template-${row.id}`}
					className="text-xs uppercase tracking-wider font-light mr-2"
				>
					Template:
				</label>
				<select
					id={`template-${row.id}`}
					value={row.template || "LEFT"}
					onChange={handleTemplateChange}
					className="px-3 py-1.5 border border-gray-100 text-xs focus:outline-none focus:border-black"
				>
					<option value="LEFT">Left</option>
					<option value="CENTER">Center</option>
					<option value="RIGHT">Right</option>
				</select>
			</div>
		</div>
	);
};

export default ProductRow;
