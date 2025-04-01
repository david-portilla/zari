import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import GridEmptyState from "../GridEmptyState";

// Mock environment variables
beforeEach(() => {
	// Set up mock environment variable for testing
	import.meta.env.VITE_LOCAL_API_URL = "http://localhost:3001";
});

describe("GridEmptyState", () => {
	/**
	 * Test basic rendering
	 */
	it("should render the empty state message", () => {
		render(<GridEmptyState data-testid="grid-empty-state" />);

		expect(screen.getByTestId("grid-empty-state")).toBeInTheDocument();
		expect(screen.getByText("No Products Found")).toBeInTheDocument();
		expect(
			screen.getByText(
				"Add product IDs as URL parameters to start building your grid."
			)
		).toBeInTheDocument();
	});

	/**
	 * Test that it includes the API URL example
	 */
	it("should display the API URL example", () => {
		render(<GridEmptyState data-testid="grid-empty-state" />);

		const apiUrl = "http://localhost:3001";
		const link = screen.getByText(
			`${apiUrl}/products?ids=prod_001,prod_002,prod_003`
		);

		expect(link).toBeInTheDocument();
		expect(link.getAttribute("href")).toBe(
			`${apiUrl}/products?ids=prod_001,prod_002,prod_003`
		);
	});
});
