import React from "react";
import { Product } from "../types";

interface ProductCardProps {
	product: Product;
}

/**
 * Displays a product card with image, name and price
 * @param product - The product to display
 */
export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const { name, price, image } = product;
	return (
		<div className="border rounded-lg overflow-hidden shadow-md p-4 bg-white">
			<div className="aspect-square overflow-hidden mb-2">
				<img
					src={image}
					alt={name}
					className="w-full h-full object-cover"
					loading="lazy"
				/>
			</div>
			<h3 className="font-semibold text-lg truncate">{name}</h3>
			<p className="text-gray-700 font-medium">${price.amount.toFixed(2)}</p>
		</div>
	);
};
