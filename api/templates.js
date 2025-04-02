/**
 * API endpoint for getting all available templates
 * Vercel serverless function for the /api/templates endpoint
 */
import { templates } from "./mockData.js";

/**
 * Handle GET request to retrieve all available templates
 * @param {VercelRequest} req - The request object
 * @param {VercelResponse} res - The response object
 * @returns {Promise<void>}
 */
export default async function handler(req, res) {
	// Only allow GET requests
	if (req.method !== "GET") {
		res.status(405).json({ error: "Method not allowed" });
		return;
	}

	try {
		// Set CORS headers
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Methods", "GET");

		// Return all templates
		res.status(200).json(templates);
	} catch (error) {
		console.error("Error in /api/templates endpoint:", error);
		res.status(500).json({ error: "Internal server error" });
	}
}
