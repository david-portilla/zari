export const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="mt-8 text-center">
			<div className="text-center">
				<p className="mb-2">
					Created by{" "}
					<a
						href="https://davidportilla.com"
						target="_blank"
						rel="noopener noreferrer"
						className="font-medium"
						aria-label="Visit David Portilla's website"
					>
						David Portilla
					</a>
				</p>
				<p className="text-sm ">© {currentYear} All rights reserved</p>
			</div>
			<div>
				<nav aria-label="Social media links">
					<ul className="list-none">
						<li>
							<a
								href="https://www.linkedin.com/in/davidportilla/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm"
								aria-label="Visit David Portilla's LinkedIn profile"
							>
								LinkedIn
							</a>
						</li>
						<li>
							<a
								href="https://github.com/david-portilla"
								target="_blank"
								rel="noopener noreferrer"
								className="text-sm"
								aria-label="Visit David Portilla's GitHub profile"
							>
								GitHub
							</a>
						</li>
					</ul>
				</nav>
			</div>
		</footer>
	);
};
