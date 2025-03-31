import { Link } from "react-router";

export const Header = () => {
	return (
		<header className="mb-8 text-center">
			<Link to="/">
				<h1 className="text-4xl font-bold">ZARI Store</h1>
			</Link>
			<p className="text-lg">Customizable grid ecommerce</p>
		</header>
	);
};
