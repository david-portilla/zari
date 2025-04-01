import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProductGrid from "../ProductGrid";
import { Product, ProductRow, RowAlignment } from "../../types";

// Mock the ProductRow component
vi.mock("../ProductRow", () => ({
	default: vi.fn(({ row, onTemplateChange }) => (
		<div data-testid={`product-row-${row.id}`}>
			<div
				className={`flex ${row.template === "LEFT" ? "justify-start" : row.template === "CENTER" ? "justify-center" : "justify-end"}`}
			>
				{row.products.map((product: Product) => (
					<span key={product.id}>{product.name}</span>
				))}
			</div>
			<select
				data-testid={`template-select-${row.id}`}
				value={row.template}
				onChange={(e) =>
					onTemplateChange(row.id, e.target.value as RowAlignment)
				}
			>
				<option value="LEFT">Left</option>
				<option value="CENTER">Center</option>
				<option value="RIGHT">Right</option>
			</select>
		</div>
	)),
}));

// Mock the useDragAndDrop hook
const mockHandleDragStart = vi.fn();
const mockHandleDragEnd = vi.fn();
const mockHandleDragOver = vi.fn();
const mockHandleDrop = vi.fn();

// Sample product for drag state
const mockDraggedProduct = {
	id: "1",
	name: "Product 1",
	price: { amount: 100, currency: "USD" },
	image: "product1.jpg",
};

vi.mock("../../hooks/useDragAndDrop", () => ({
	useDragAndDrop: () => ({
		dragState: {
			isDragging: true,
			draggedProduct: mockDraggedProduct,
			sourceRowId: "row-1",
		},
		handleDragStart: mockHandleDragStart,
		handleDragEnd: mockHandleDragEnd,
		handleDragOver: mockHandleDragOver,
		handleDrop: mockHandleDrop,
	}),
}));

// Mock the useRowDragAndDrop hook
const mockRowDragStart = vi.fn();
const mockRowDragEnd = vi.fn();
const mockRowDragOver = vi.fn();
const mockRowDrop = vi.fn();

vi.mock("../../hooks/useRowDragAndDrop", () => ({
	useRowDragAndDrop: () => ({
		rowDragState: {
			isDragging: false,
			sourceRowId: null,
		},
		handleRowDragStart: mockRowDragStart,
		handleRowDragEnd: mockRowDragEnd,
		handleRowDragOver: mockRowDragOver,
		handleRowDrop: mockRowDrop,
	}),
}));

describe("ProductGrid", () => {
	const mockRows: ProductRow[] = [
		{
			id: "row-1",
			products: [
				{
					id: "1",
					name: "Product 1",
					price: { amount: 100, currency: "USD" },
					image: "product1.jpg",
				},
			],
			template: "LEFT" as RowAlignment,
		},
		{
			id: "row-2",
			products: [
				{
					id: "2",
					name: "Product 2",
					price: { amount: 200, currency: "USD" },
					image: "product2.jpg",
				},
			],
			template: "CENTER" as RowAlignment,
		},
	];

	const mockOnTemplateChange = vi.fn();
	const mockOnUpdateRows = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
	});

	/**
	 * Test basic rendering
	 */
	it("should render all rows", () => {
		render(
			<ProductGrid
				rows={mockRows}
				onTemplateChange={mockOnTemplateChange}
				onUpdateRows={mockOnUpdateRows}
			/>
		);

		// Check if all rows are rendered
		mockRows.forEach((row) => {
			expect(screen.getByTestId(`product-row-${row.id}`)).toBeInTheDocument();
		});
	});

	/**
	 * Test template change handling
	 */
	it("should handle template changes", () => {
		render(
			<ProductGrid
				rows={mockRows}
				onTemplateChange={mockOnTemplateChange}
				onUpdateRows={mockOnUpdateRows}
			/>
		);

		const select = screen.getByTestId(`template-select-row-1`);
		fireEvent.change(select, { target: { value: "RIGHT" } });

		expect(mockOnTemplateChange).toHaveBeenCalledWith("row-1", "RIGHT");
	});

	/**
	 * Test drag and drop functionality
	 */
	it("should handle drag and drop events", () => {
		render(
			<ProductGrid
				rows={mockRows}
				onTemplateChange={mockOnTemplateChange}
				onUpdateRows={mockOnUpdateRows}
			/>
		);

		const row1 = screen.getByTestId("product-row-row-1");
		const row2 = screen.getByTestId("product-row-row-2");

		// Simulate drag over
		fireEvent.dragOver(row1);
		expect(mockRowDragOver).toHaveBeenCalled();

		// Simulate drop
		fireEvent.drop(row2);
		expect(mockHandleDrop).toHaveBeenCalledWith("row-2");
	});

	/**
	 * Test row alignment classes
	 */
	it("should apply correct alignment classes", () => {
		render(
			<ProductGrid
				rows={mockRows}
				onTemplateChange={mockOnTemplateChange}
				onUpdateRows={mockOnUpdateRows}
			/>
		);

		// Check LEFT alignment
		const row1 = screen.getByTestId("product-row-row-1");
		expect(row1.querySelector(".flex")).toHaveClass("justify-start");

		// Check CENTER alignment
		const row2 = screen.getByTestId("product-row-row-2");
		expect(row2.querySelector(".flex")).toHaveClass("justify-center");
	});
});
