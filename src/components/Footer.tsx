/**
 * Footer component that displays copyright information and social media links
 * @returns {JSX.Element} The rendered Footer component
 */
export const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="mt-8 border-t border-gray-100 pt-6 pb-8">
			<div className="max-w-screen-xl mx-auto px-6">
				<div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
					<div className="text-center md:text-left">
						<p className="text-xs uppercase tracking-wider font-light mb-2">
							Created by{" "}
							<a
								href="https://davidportilla.com"
								target="_blank"
								rel="noopener noreferrer"
								className="hover:underline"
								aria-label="Visit David Portilla's website"
							>
								David Portilla
							</a>
						</p>
						<p className="text-xs font-light">
							© {currentYear} All rights reserved
						</p>
					</div>
					<div>
						<nav aria-label="Social media links">
							<ul className="flex gap-6 list-none">
								<li>
									<a
										href="https://www.linkedin.com/in/davidportilla/"
										target="_blank"
										rel="noopener noreferrer"
										className="text-xs uppercase tracking-wider font-light hover:underline"
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
										className="text-xs uppercase tracking-wider font-light hover:underline"
										aria-label="Visit David Portilla's GitHub profile"
									>
										GitHub
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</footer>
	);
};
