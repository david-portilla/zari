import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductGrid from "../ProductGrid";
import { Product, ProductRow, RowAlignment } from "../../types";

// Mock the ProductRowComponent to isolate ProductGrid testing
vi.mock("../ProductRow", () => ({
	default: vi.fn(({ row }) => (
		<div data-testid={`mocked-row-${row.id}`}>
			{row.products.map((product: Product) => (
				<span key={product.id}>{product.name}</span>
			))}
		</div>
	)),
}));

describe("ProductGrid", () => {
	const mockProducts: Product[] = [
		{
			id: "1",
			name: "Product 1",
			price: {
				amount: 100,
				currency: "USD",
			},
			image: "https://example.com/product1.jpg",
		},
		{
			id: "2",
			name: "Product 2",
			price: {
				amount: 200,
				currency: "USD",
			},
			image: "https://example.com/product2.jpg",
		},
	];

	const mockRows: ProductRow[] = [
		{
			id: "row-1",
			products: [mockProducts[0]],
			template: "LEFT" as RowAlignment,
		},
		{
			id: "row-2",
			products: [mockProducts[1]],
			template: "RIGHT" as RowAlignment,
		},
	];

	const mockTemplateChange = vi.fn();

	/**
	 * Test basic rendering
	 */
	it("should render product grid with rows", () => {
		render(
			<ProductGrid rows={mockRows} onTemplateChange={mockTemplateChange} />
		);

		// Check if the component renders with the correct test ID
		expect(screen.getByTestId("product-grid")).toBeInTheDocument();

		// Check if all rows are rendered
		mockRows.forEach((row) => {
			expect(screen.getByTestId(`mocked-row-${row.id}`)).toBeInTheDocument();
		});

		// Check if products are rendered within rows
		expect(screen.getByText("Product 1")).toBeInTheDocument();
		expect(screen.getByText("Product 2")).toBeInTheDocument();
	});

	/**
	 * Test empty rows handling
	 */
	it("should render empty grid when no rows provided", () => {
		render(<ProductGrid rows={[]} onTemplateChange={mockTemplateChange} />);

		// Check if the container is rendered but empty
		const grid = screen.getByTestId("product-grid");
		expect(grid).toBeInTheDocument();
		expect(grid.children).toHaveLength(0);
	});

	/**
	 * Test styling and layout
	 */
	it("should have proper styling classes", () => {
		render(
			<ProductGrid rows={mockRows} onTemplateChange={mockTemplateChange} />
		);

		const grid = screen.getByTestId("product-grid");
		expect(grid).toHaveClass("space-y-4");

		// Check if row containers have margin bottom
		const rowContainers = grid.children;
		Array.from(rowContainers).forEach((container) => {
			expect(container).toHaveClass("mb-8");
		});
	});
});
