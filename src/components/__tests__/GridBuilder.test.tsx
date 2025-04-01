import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GridBuilder } from "../GridBuilder";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { useGridParams } from "../../hooks/useGridParams";
import { useProductGrid } from "../../hooks/useProductGrid";
import { Product, ProductRow, RowAlignment } from "../../types";

// Mock the hooks
vi.mock("../../hooks/useGridParams");
vi.mock("../../hooks/useProductGrid");

// Mock child components to focus on integration testing
vi.mock("../GridLoadingState", () => ({
	default: vi.fn(() => (
		<div data-testid="grid-loading-state">Loading Mock</div>
	)),
}));

vi.mock("../GridErrorState", () => ({
	default: vi.fn(({ message }) => (
		<div data-testid="grid-error-state">{message}</div>
	)),
}));

vi.mock("../GridEmptyState", () => ({
	default: vi.fn(() => <div data-testid="grid-empty-state">Empty Mock</div>),
}));

vi.mock("../GridStats", () => ({
	default: vi.fn(() => <div data-testid="grid-stats">Stats Mock</div>),
}));

vi.mock("../ProductGrid", () => ({
	default: vi.fn(() => <div data-testid="product-grid">Grid Mock</div>),
}));

/**
 * Creates a new QueryClient for testing
 * @returns QueryClient instance with default test configuration
 */
const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});

/**
 * Wrapper component that provides necessary context for testing
 * @param children - React components to wrap
 * @returns Wrapped components with test context
 */
const wrapper = ({ children }: { children: React.ReactNode }) => {
	const testQueryClient = createTestQueryClient();
	return (
		<QueryClientProvider client={testQueryClient}>
			{children}
		</QueryClientProvider>
	);
};

describe("GridBuilder Integration", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	/**
	 * Test URL parameter error handling
	 */
	it("should handle URL parameter errors", () => {
		const errorMessage = "Invalid URL parameters";
		vi.mocked(useGridParams).mockReturnValue({
			productIds: [],
			rowCount: 0,
			error: errorMessage,
		});

		vi.mocked(useProductGrid).mockReturnValue({
			products: [],
			rows: [],
			isLoading: false,
			isFetching: false,
			error: null,
			displayedProductCount: 0,
			hasLimitedProducts: false,
			updateRowTemplate: vi.fn(),
		});

		render(<GridBuilder />, { wrapper });
		expect(screen.getByText(errorMessage)).toBeInTheDocument();
	});

	/**
	 * Test state transitions
	 */
	it("should handle state transitions correctly", () => {
		const mockProducts: Product[] = [
			{
				id: "1",
				name: "Product 1",
				price: { amount: 100, currency: "USD" },
				image: "https://example.com/product1.jpg",
			},
		];

		const mockRows: ProductRow[] = [
			{
				id: "row-1",
				products: mockProducts,
				template: "LEFT" as RowAlignment,
			},
		];

		// Initial loading state
		vi.mocked(useGridParams).mockReturnValue({
			productIds: ["1"],
			rowCount: 1,
			error: null,
		});

		vi.mocked(useProductGrid).mockReturnValue({
			products: [],
			rows: [],
			isLoading: true,
			isFetching: false,
			error: null,
			displayedProductCount: 0,
			hasLimitedProducts: false,
			updateRowTemplate: vi.fn(),
		});

		const { rerender } = render(<GridBuilder />, { wrapper });
		expect(screen.getByTestId("grid-loading-state")).toBeInTheDocument();

		// Transition to loaded state with data
		vi.mocked(useProductGrid).mockReturnValue({
			products: mockProducts,
			rows: mockRows,
			isLoading: false,
			isFetching: false,
			error: null,
			displayedProductCount: 1,
			hasLimitedProducts: false,
			updateRowTemplate: vi.fn(),
		});

		rerender(<GridBuilder />);
		expect(screen.getByTestId("product-grid")).toBeInTheDocument();
		expect(screen.getByTestId("grid-stats")).toBeInTheDocument();
	});

	/**
	 * Test background update handling
	 */
	it("should show update banner during background updates", () => {
		vi.mocked(useGridParams).mockReturnValue({
			productIds: ["1"],
			rowCount: 1,
			error: null,
		});

		vi.mocked(useProductGrid).mockReturnValue({
			products: [],
			rows: [],
			isLoading: false,
			isFetching: true,
			error: null,
			displayedProductCount: 0,
			hasLimitedProducts: false,
			updateRowTemplate: vi.fn(),
		});

		render(<GridBuilder />, { wrapper });
		expect(screen.getByTestId("updating-banner")).toBeInTheDocument();
	});

	/**
	 * Test component composition
	 */
	it("should compose components correctly when data is loaded", () => {
		vi.mocked(useGridParams).mockReturnValue({
			productIds: ["1"],
			rowCount: 1,
			error: null,
		});

		vi.mocked(useProductGrid).mockReturnValue({
			products: [
				{
					id: "1",
					name: "Test",
					price: { amount: 100, currency: "USD" },
					image: "test.jpg",
				},
			],
			rows: [{ id: "row-1", products: [], template: "LEFT" }],
			isLoading: false,
			isFetching: false,
			error: null,
			displayedProductCount: 1,
			hasLimitedProducts: false,
			updateRowTemplate: vi.fn(),
		});

		render(<GridBuilder />, { wrapper });

		// Check if main container is rendered
		expect(screen.getByTestId("grid-builder")).toBeInTheDocument();

		// Check if child components are rendered in the correct order
		const mainContainer = screen.getByTestId("grid-builder");
		expect(
			mainContainer.querySelector("[data-testid='grid-stats']")
		).toBeInTheDocument();
		expect(
			mainContainer.querySelector("[data-testid='product-grid']")
		).toBeInTheDocument();
	});
});
