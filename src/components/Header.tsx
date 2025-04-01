import { Link } from "react-router";
import zariLogo from "../assets/ZARI-logo.png";

/**
 * Header component with Zara-style logo and title
 * @returns {JSX.Element} The rendered Header component
 */
export const Header = () => {
	return (
		<header className="bg-white pt-6 pb-1 mb-10">
			<div className="max-w-screen-xl mx-auto px-8">
				<div className="flex justify-between items-center">
					<div className="w-44">
						<Link to="/?productIds=prod_001,prod_002,prod_003&rows=2">
							<img src={zariLogo} alt="ZARI" className="w-full" />
						</Link>
					</div>
					<div className="text-right">
						<h1 className="text-base uppercase tracking-wider font-light">
							ZARI Store
						</h1>
						<p className="text-[11px] text-gray-500 tracking-wide mt-0.5">
							Customizable grid ecommerce by:
							<a
								href="https://davidportilla.com/"
								className="font-medium text-black"
								target="_blank"
								rel="noopener noreferrer"
							>
								David Portilla
							</a>
						</p>
					</div>
				</div>
			</div>
		</header>
	);
};
