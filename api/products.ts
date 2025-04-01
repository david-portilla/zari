/**
 * API endpoint for getting products by IDs
 * Vercel serverless function for the /api/products endpoint
 */
import { VercelRequest, VercelResponse } from "@vercel/node";
import { products } from "./_mockData";

/**
 * Handle GET request to retrieve products by IDs
 * @param {VercelRequest} req - The request object
 * @param {VercelResponse} res - The response object
 * @returns {Promise<void>}
 */
export default async function handler(
	req: VercelRequest,
	res: VercelResponse
): Promise<void> {
	// Only allow GET requests
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" });
	}

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

		// Set CORS headers
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Methods", "GET");

		// Return the filtered products
		return res.status(200).json(filteredProducts);
	} catch (error) {
		console.error("Error in /api/products endpoint:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
}
