import { useState } from "react";
import { ProductRow, RowAlignment } from "../types";
import { useMutation } from "@tanstack/react-query";

/**
 * Response from the save grid API
 */
interface SaveGridResponse {
	id: string;
	name: string;
	rows: {
		id: string;
		templateId: string;
		products: string[];
	}[];
}

/**
 * Error response structure
 */
interface ErrorResponse {
	error: string;
}

/**
 * Validation result structure
 */
interface ValidationResult {
	isValid: boolean;
	errors: string[];
}

/**
 * Custom hook for saving grid configurations
 * Handles validation, transformation, and API submission
 *
 * @returns Functions and state for saving grid
 */
export const useSaveGrid = () => {
	const [validationErrors, setValidationErrors] = useState<string[]>([]);
	const apiUrl = import.meta.env.VITE_LOCAL_API_URL || "http://localhost:3001";

	/**
	 * Validates the grid to ensure all rows have products and templates
	 *
	 * @param rows - The rows to validate
	 * @returns Validation result with status and errors
	 */
	const validateGrid = (rows: ProductRow[]): ValidationResult => {
		const errors: string[] = [];

		// Check if there are any rows
		if (rows.length === 0) {
			errors.push("The grid must have at least one row to save");
			return { isValid: false, errors };
		}

		// Check each row for products and template
		rows.forEach((row, index) => {
			// Check if row has products
			if (row.products.length === 0) {
				errors.push(
					`Row ${index + 1} has no products. All rows must have at least one product.`
				);
			}

			// Check if row has a template assigned
			if (!row.template) {
				errors.push(
					`Row ${index + 1} has no template assigned. All rows must have a template.`
				);
			}
		});

		return {
			isValid: errors.length === 0,
			errors,
		};
	};

	/**
	 * Transforms the frontend rows format to the API format
	 *
	 * @param rows - The rows in frontend format
	 * @returns Rows in API format
	 */
	const transformRowsForApi = (rows: ProductRow[]) => {
		return rows.map((row) => ({
			id: row.id,
			templateId: mapTemplateToTemplateId(row.template),
			products: row.products.map((product) => product.id),
		}));
	};

	/**
	 * Maps the frontend template enum to template IDs used in the API
	 *
	 * @param template - The template alignment
	 * @returns The template ID
	 */
	const mapTemplateToTemplateId = (template?: RowAlignment): string => {
		switch (template) {
			case "LEFT":
				return "template_001";
			case "CENTER":
				return "template_002";
			case "RIGHT":
				return "template_003";
			default:
				return "template_001"; // Default to LEFT if undefined (shouldn't happen with validation)
		}
	};

	/**
	 * Mutation for saving the grid
	 */
	const mutation = useMutation<
		SaveGridResponse,
		ErrorResponse,
		{ name: string; rows: ProductRow[] }
	>({
		mutationFn: async ({ name, rows }) => {
			// Validate the grid first
			const validation = validateGrid(rows);
			setValidationErrors(validation.errors);

			if (!validation.isValid) {
				throw { error: validation.errors.join(". ") };
			}

			// Transform rows for API format
			const transformedRows = transformRowsForApi(rows);

			// Store the grid
			const response = await fetch(`${apiUrl}/grids`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name,
					rows: transformedRows,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.error("Error saving grid:", errorData);
				throw errorData;
			}

			const responseData = await response.json();
			return responseData;
		},
	});

	/**
	 * Saves the grid with the given name and rows
	 *
	 * @param name - The name of the grid
	 * @param rows - The rows to save
	 */
	const saveGrid = (name: string, rows: ProductRow[]) => {
		mutation.mutate({ name, rows });
	};

	return {
		saveGrid,
		isLoading: mutation.isPending,
		isSuccess: mutation.isSuccess,
		error: mutation.error?.error || null,
		validationErrors,
		savedGrid: mutation.data,
	};
};
