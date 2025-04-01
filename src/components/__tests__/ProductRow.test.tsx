import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductRow from "../ProductRow";
import { ProductRow as ProductRowType, RowAlignment } from "../../types";

describe("ProductRow", () => {
	const mockProduct: ProductRowType = {
		id: "row-1",
		products: [
			{
				id: "1",
				name: "Test Product",
				price: { amount: 100, currency: "USD" },
				image: "test.jpg",
			},
		],
		template: "LEFT" as RowAlignment,
	};

	const mockOnTemplateChange = vi.fn();
	const mockOnDragStart = vi.fn();
	const mockOnDragEnd = vi.fn();

	/**
	 * Test basic rendering
	 */
	it("should render products correctly", () => {
		render(
			<ProductRow
				row={mockProduct}
				onTemplateChange={mockOnTemplateChange}
				onDragStart={mockOnDragStart}
				onDragEnd={mockOnDragEnd}
				isDragging={false}
			/>
		);

		// Check if product is rendered
		expect(screen.getByText("Test Product")).toBeInTheDocument();
		expect(screen.getByText("$100.00")).toBeInTheDocument();
	});

	/**
	 * Test template change handling
	 */
	it("should handle template changes", () => {
		render(
			<ProductRow
				row={mockProduct}
				onTemplateChange={mockOnTemplateChange}
				onDragStart={mockOnDragStart}
				onDragEnd={mockOnDragEnd}
				isDragging={false}
			/>
		);

		const select = screen.getByRole("combobox");
		fireEvent.change(select, { target: { value: "RIGHT" } });

		expect(mockOnTemplateChange).toHaveBeenCalledWith("row-1", "RIGHT");
	});

	/**
	 * Test drag and drop functionality
	 */
	it("should handle drag events", () => {
		render(
			<ProductRow
				row={mockProduct}
				onTemplateChange={mockOnTemplateChange}
				onDragStart={mockOnDragStart}
				onDragEnd={mockOnDragEnd}
				isDragging={false}
			/>
		);

		const productContainer = screen.getByTestId(
			`product-card-${mockProduct.products[0].id}`
		).parentElement;
		if (!productContainer) throw new Error("Product container not found");

		// Test drag start
		fireEvent.dragStart(productContainer);
		expect(mockOnDragStart).toHaveBeenCalledWith(
			mockProduct.products[0],
			mockProduct.id
		);

		// Test drag end
		fireEvent.dragEnd(productContainer);
		expect(mockOnDragEnd).toHaveBeenCalled();
	});

	/**
	 * Test visual feedback during drag
	 */
	it("should show visual feedback when dragging", () => {
		render(
			<ProductRow
				row={mockProduct}
				onTemplateChange={mockOnTemplateChange}
				onDragStart={mockOnDragStart}
				onDragEnd={mockOnDragEnd}
				isDragging={true}
				draggedProductId={mockProduct.products[0].id}
			/>
		);

		const productContainer = screen.getByTestId(
			`product-card-${mockProduct.products[0].id}`
		).parentElement;
		if (!productContainer) throw new Error("Product container not found");

		expect(productContainer).toHaveClass("opacity-50");
	});

	/**
	 * Test alignment classes
	 */
	it("should apply correct alignment classes", () => {
		const alignments: RowAlignment[] = ["LEFT", "CENTER", "RIGHT"];

		alignments.forEach((alignment) => {
			const { container } = render(
				<ProductRow
					row={{ ...mockProduct, template: alignment }}
					onTemplateChange={mockOnTemplateChange}
					onDragStart={mockOnDragStart}
					onDragEnd={mockOnDragEnd}
					isDragging={false}
				/>
			);

			const flexContainer = container.querySelector(".flex");
			expect(flexContainer).toHaveClass(
				alignment === "LEFT"
					? "justify-start"
					: alignment === "CENTER"
						? "justify-center"
						: "justify-end"
			);
		});
	});

	/**
	 * Test product card width classes
	 */
	it("should apply correct width classes based on product count", () => {
		const products = [
			{ ...mockProduct.products[0], id: "1" },
			{ ...mockProduct.products[0], id: "2" },
			{ ...mockProduct.products[0], id: "3" },
		];

		const { container } = render(
			<ProductRow
				row={{ ...mockProduct, products }}
				onTemplateChange={mockOnTemplateChange}
				onDragStart={mockOnDragStart}
				onDragEnd={mockOnDragEnd}
				isDragging={false}
			/>
		);

		const productContainers = container.querySelectorAll("[draggable]");
		productContainers.forEach((container) => {
			expect(container).toHaveClass("w-1/3");
		});
	});
});
