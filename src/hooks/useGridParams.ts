import { useSearchParams } from "react-router";

interface GridUrlParams {
	productIds: string[] | null;
	rowCount: number | null;
	error: string | null;
}

/**
 * Custom hook to parse and validate URL parameters for the product grid
 * Extracts product IDs and row count parameters from the URL
 * @returns Parsed parameters and any validation errors
 */
export const useGridParams = (): GridUrlParams => {
	const [searchParams] = useSearchParams();
	let error: string | null = null;

	// Parse product IDs parameter
	const productIdsParam = searchParams.get("productIds");
	const productIds = productIdsParam ? productIdsParam.split(",") : null;

	if (!productIdsParam) {
		error =
			"No product IDs specified in URL. <br> Suggested format: ?productIds=prod_001,prod_002,prod_003&rows=3...";
	}

	// Parse row count parameter
	const rowParam = searchParams.get("rows");
	let rowCount: number | null = null;

	if (rowParam !== null) {
		const parsedRowCount = parseInt(rowParam, 10);

		if (isNaN(parsedRowCount) || parsedRowCount <= 0) {
			error = "Invalid row parameter. Use a positive number.";
		} else {
			rowCount = parsedRowCount;
		}
	}

	return {
		productIds,
		rowCount,
		error,
	};
};
