import React from "react";
import { Product } from "../types";

interface ProductCardProps {
	product: Product;
}

/**
 * Displays a single product card with image, name, and price
 * @param product - The product data to display
 */
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	return (
		<div
			className="bg-white rounded-lg shadow-md overflow-hidden"
			data-testid={`product-card-${product.id}`}
		>
			<img
				src={product.image}
				alt={product.name}
				className="w-full h-48 object-cover"
			/>
			<div className="p-4">
				<h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
				<p className="text-xl font-bold text-blue-600">
					${product.price.amount.toFixed(2)}
				</p>
			</div>
		</div>
	);
};
