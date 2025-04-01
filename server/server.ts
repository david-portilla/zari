/**
 * Express server for providing mock API endpoints for ZARI store
 * Implements RESTful endpoints for managing products, templates, and grid layouts
 *
 * @module server
 */

import express, { Request, Response } from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { products, templates, grids, Grid } from "./mockData";

const app = express();
const PORT = 3001;

// Middleware configuration
app.use(cors());
app.use(express.json());

/**
 * GET /products endpoint
 * Returns products by IDs, supports filtering with query parameter
 *
 * @route GET /products
 * @param {string} ids - Comma-separated list of product IDs to filter by
 * @returns {Product[]} Array of matching products
 * @throws {400} If ids parameter is missing or invalid
 * @throws {500} If server encounters an error
 */
app.get("/products", (req: Request, res: Response) => {
	try {
		const { ids } = req.query;

		// Validate the presence of the ids parameter
		if (!ids) {
			return res.status(400).json({ error: "Missing required parameter: ids" });
		}

		// Parse and validate the ids parameter
		const productIds = String(ids).split(",");
		if (!Array.isArray(productIds) || productIds.length === 0) {
			return res.status(400).json({
				error: "Invalid ids format. Expected comma-separated product IDs",
			});
		}

		// Filter products by ID
		const filteredProducts = products.filter((product) =>
			productIds.includes(product.id)
		);

		// Return the filtered products
		res.json(filteredProducts);
	} catch (error) {
		console.error("Error in /products endpoint:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

/**
 * GET /templates endpoint
 * Returns all available templates for grid row alignment
 *
 * @route GET /templates
 * @returns {Template[]} Array of all available templates
 * @throws {500} If server encounters an error
 */
app.get("/templates", (_req: Request, res: Response) => {
	try {
		res.json(templates);
	} catch (error) {
		console.error("Error in /templates endpoint:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

/**
 * POST /grids endpoint
 * Saves a new grid configuration
 *
 * @route POST /grids
 * @param {Grid} body - Grid configuration without ID
 * @returns {Grid} Created grid with generated ID
 * @throws {400} If grid data is invalid or missing required fields
 * @throws {500} If server encounters an error
 */
app.post("/grids", (req: Request, res: Response) => {
	try {
		console.log("Received grid save request:", req.body);
		const gridData = req.body as Omit<Grid, "id">;

		// Validate the request body
		if (!gridData || !gridData.name || !Array.isArray(gridData.rows)) {
			return res.status(400).json({
				error: "Invalid grid data. Required fields: name, rows",
			});
		}

		// Validate that all rows have a templateId and products
		const invalidRow = gridData.rows.find(
			(row) =>
				!row.templateId ||
				!Array.isArray(row.products) ||
				row.products.length === 0 ||
				row.products.length > 3
		);

		if (invalidRow) {
			return res.status(400).json({
				error:
					"Invalid row data. Each row must have a templateId and 1-3 products",
			});
		}

		// Create a new grid with a unique ID
		const newGrid: Grid = {
			id: uuidv4(),
			name: gridData.name,
			rows: gridData.rows.map((row) => ({
				...row,
				id: row.id || uuidv4(),
			})),
		};

		// Save the grid (in a real app, this would be saved to a database)
		grids.push(newGrid);
		console.log("Grid saved successfully:", newGrid);

		res.status(201).json(newGrid);
	} catch (error) {
		console.error("Error in /grids endpoint:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

/**
 * GET /grids endpoint
 * Returns all saved grid configurations
 *
 * @route GET /grids
 * @returns {Grid[]} Array of all saved grids
 * @throws {500} If server encounters an error
 */
app.get("/grids", (_req: Request, res: Response) => {
	try {
		res.json(grids);
	} catch (error) {
		console.error("Error in GET /grids endpoint:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
