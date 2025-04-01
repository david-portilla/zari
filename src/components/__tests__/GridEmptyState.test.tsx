import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import GridEmptyState from "../GridEmptyState";

describe("GridEmptyState", () => {
	/**
	 * Test basic rendering
	 */
	it("should render empty state message", () => {
		render(<GridEmptyState />);

		// Check if the component renders with the correct test ID
		expect(screen.getByTestId("grid-empty-state")).toBeInTheDocument();

		// Check if the main heading is rendered
		expect(screen.getByText("No Products Found")).toBeInTheDocument();

		// Check if the explanation text is rendered
		expect(
			screen.getByText("No products were found with the specified IDs.")
		).toBeInTheDocument();

		// Check if the help text is rendered
		expect(
			screen.getByText(/Please check that server is running/, { exact: false })
		).toBeInTheDocument();

		// Check if the example link is rendered
		const exampleLink = screen.getByRole("link");
		expect(exampleLink).toHaveAttribute(
			"href",
			"http://localhost:3001/products?ids=prod_001,prod_002,prod_003"
		);
		expect(exampleLink).toHaveAttribute("target", "_blank");
		expect(exampleLink).toHaveAttribute("rel", "noopener noreferrer");
	});

	/**
	 * Test accessibility features
	 */
	it("should have proper accessibility attributes", () => {
		render(<GridEmptyState />);

		// Check if the emoji has proper aria-label
		const emojiSpan = screen.getByRole("img", { name: "Empty box" });
		expect(emojiSpan).toBeInTheDocument();
	});
});
