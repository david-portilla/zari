/**
 * API endpoint for getting products by IDs
 * Vercel serverless function for the /api/products endpoint
 */
import { products } from "./mockData.js";

/**
 * Serverless function to handle product requests
 * @param req - Vercel HTTP request
 * @param res - Vercel HTTP response
 */
export default async function handler(req, res) {
	// Enable CORS
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
	);

	// Handle OPTIONS request for CORS
	if (req.method === "OPTIONS") {
		res.status(200).end();
		return;
	}

	// Only allow GET requests
	if (req.method !== "GET") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		const { ids } = req.query;

		// Validate query parameter
		if (!ids) {
			return res.status(400).json({
				error: "Missing required parameter: ids",
			});
		}

		// Parse and validate product IDs
		const productIds = String(ids).split(",");

		// Filter products by ID
		const filteredProducts = products.filter((product) =>
			productIds.includes(product.id)
		);

		// Return filtered products
		return res.status(200).json(filteredProducts);
	} catch (error) {
		console.error("Error in products API:", error);
		return res.status(500).json({
			error: "Internal server error",
		});
	}
}
