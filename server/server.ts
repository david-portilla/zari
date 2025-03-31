/**
 * Express server for providing mock API endpoints for ZARI store
 * Implements the product and grid endpoints
 */

import express, { Request, Response } from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { products, templates, grids, Grid } from "./mockData";

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

/**
 * GET /products endpoint
 * Returns product information based on the provided IDs
 */
app.get("/products", (req: Request, res: Response) => {
	try {
		const idsParam = req.query.ids as string;

		if (!idsParam) {
			return res.status(400).json({
				error: "Missing required parameter: ids",
			});
		}

		// Parse the ids parameter (format "id1,id2,...")
		let productIds: string[] = [];

		try {
			// Try to parse as JSON array
			productIds = JSON.parse(idsParam);
		} catch {
			// If not JSON, try to parse as comma-separated string
			productIds = idsParam.split(",").map((id) => id.trim());
		}

		if (!Array.isArray(productIds) || productIds.length === 0) {
			return res.status(400).json({
				error: "Invalid ids format. Expected array of product IDs",
			});
		}

		// Filter products based on the provided IDs
		const filteredProducts = products.filter((product) =>
			productIds.includes(product.id)
		);

		res.json(filteredProducts);
	} catch (error) {
		console.error("Error in /products endpoint:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

/**
 * GET /templates endpoint
 * Returns all available templates
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
 * Saves a grid configuration
 */
app.post("/grids", (req: Request, res: Response) => {
	try {
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

		res.status(201).json(newGrid);
	} catch (error) {
		console.error("Error in /grids endpoint:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

/**
 * GET /grids endpoint
 * Returns all saved grids
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
	console.log(`Server running on http://localhost:${PORT}`);
});
