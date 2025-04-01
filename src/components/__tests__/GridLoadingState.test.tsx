import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import GridLoadingState from "../GridLoadingState";

describe("GridLoadingState", () => {
	/**
	 * Test basic rendering
	 */
	it("should render loading state with spinner and message", () => {
		render(<GridLoadingState data-testid="grid-loading-state" />);

		// Check if the component renders with the correct test ID
		expect(screen.getByTestId("grid-loading-state")).toBeInTheDocument();

		// Check if the loading message is rendered
		expect(screen.getByText("Loading products")).toBeInTheDocument();

		// Check if the spinner is rendered
		const spinner = screen
			.getByTestId("grid-loading-state")
			.querySelector(".animate-spin");
		expect(spinner).toBeInTheDocument();
		expect(spinner).toHaveClass("border-t-2", "border-r-2", "border-black");
	});

	/**
	 * Test styling and layout
	 */
	it("should have proper styling classes", () => {
		render(<GridLoadingState data-testid="grid-loading-state" />);

		const container = screen.getByTestId("grid-loading-state");
		expect(container).toHaveClass(
			"pt-12",
			"pb-20",
			"flex",
			"flex-col",
			"items-center",
			"justify-center"
		);

		const message = screen.getByText("Loading products");
		expect(message).toHaveClass(
			"text-xs",
			"uppercase",
			"tracking-wider",
			"font-light"
		);
	});
});
