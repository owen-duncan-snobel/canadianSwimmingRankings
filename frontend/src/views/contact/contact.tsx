import React from 'react';
const logo = require('../../images/favicon.ico');

const Contact: React.FC = () => {
	return (
		<div className="container mx-auto">
			<div className="text-center mt-5 pt-5 text-spaceGrey text-opacity-50 block">
				<span className="text-sm md:text-lg block p-2">
					Owen Duncan-Snobel
				</span>
				<a
					className="text-sm md:text-lg  p-2 text-spaceGrey text-opacity-50"
					href="mailto:owenduncansnobel@gmail.com"
				>
					owenduncansnobel@gmail.com
				</a>
				<a
					href="https://github.com/owen-duncan-snobel"
					rel="noopener noreferrer"
					target="_blank"
					className="text-sm md:text-lg block p-2 text-spaceGrey text-opacity-50"
				>
					github.com/owen-duncan-snobel
				</a>

				<a
					href="https://github.com/owen-duncan-snobel/canadianSwimmingRankings"
					rel="noopener noreferrer"
					target="_blank"
					className="text-sm md:text-lg block p-2 text-spaceGrey text-opacity-50"
				>
					github.com/owen-duncan-snobel/canadianSwimmingRankings
				</a>

				<img
					className="mx-auto"
					src={logo.default}
					width="50"
					height="50"
					alt="Canadian Swimming Rankings Logo"
				/>
			</div>
		</div>
	);
};
export default Contact;
