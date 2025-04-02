/**
 * API endpoint for managing grid configurations
 * Vercel serverless function for the /api/grids endpoint
 */
import { grids } from "./mockData.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Handle requests to manage grid configurations
 * Supports GET (fetch all grids) and POST (create a new grid)
 * @param {VercelRequest} req - The request object
 * @param {VercelResponse} res - The response object
 * @returns {Promise<void>}
 */
export default async function handler(req, res) {
	// Set CORS headers
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");

	// Handle preflight requests
	if (req.method === "OPTIONS") {
		res.status(200).end();
		return;
	}

	// Handle GET request to fetch all grids
	if (req.method === "GET") {
		try {
			res.status(200).json(grids);
			return;
		} catch (error) {
			console.error("Error in GET /api/grids endpoint:", error);
			res.status(500).json({ error: "Internal server error" });
			return;
		}
	}

	// Handle POST request to create a new grid
	if (req.method === "POST") {
		try {
			console.log("Received grid save request:", req.body);
			const gridData = req.body;

			// Validate the request body
			if (!gridData || !gridData.name || !Array.isArray(gridData.rows)) {
				res.status(400).json({
					error: "Invalid grid data. Required fields: name, rows",
				});
				return;
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
				res.status(400).json({
					error:
						"Invalid row data. Each row must have a templateId and 1-3 products",
				});
				return;
			}

			// Create a new grid with a unique ID
			const newGrid = {
				id: uuidv4(),
				name: gridData.name,
				rows: gridData.rows.map((row) => ({
					...row,
					id: row.id || uuidv4(),
				})),
			};

			// Save the grid to the in-memory array
			// Note: In a real serverless environment, this will reset between invocations
			// A database would be needed for persistence
			grids.push(newGrid);
			console.log("Grid saved successfully:", newGrid);

			res.status(201).json(newGrid);
			return;
		} catch (error) {
			console.error("Error in POST /api/grids endpoint:", error);
			res.status(500).json({ error: "Internal server error" });
			return;
		}
	}

	// If we reach here, the HTTP method is not supported
	res.status(405).json({ error: "Method not allowed" });
}
