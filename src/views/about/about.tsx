import React from 'react';

const About: React.FC = () => {
	return (
		<div className="container">
			<div className="grid grid-cols-1 md:grid-cols-5">
				<div className="mt-5 pt-5 text-spaceGrey text-opacity-50 md:col-start-2 md:col-span-3">
					<p>
						Canadian Swimming Rankings is a graphing website that
						allows Swimmers and Coaches to take a closer look at the
						trends and insights from the results across all age
						groups, events and genders from Current & Previous
						Years.
					</p>
					<p>
						<b>
							All Data on this site has been provided by Christian
							Kaufmann, the owner of
							<a
								href="https://www.swimrankings.net"
								target="_blank"
								rel="noopener noreferrer"
								className="text-spaceGrey text-opacity-50 p-1"
							>
								swimrankings.net
							</a>
						</b>
						If you or your club are looking for Team Management
						software or Meet Management software, refer to
						<a
							href="https://www.swimrankings.net"
							target="_blank"
							rel="noopener noreferrer"
							className="text-spaceGrey text-opacity-50 p-1"
						>
							Splash Software
						</a>
						.
					</p>
					<p className="text-center text-3xl">
						Request Club / Missing Club
					</p>
					<p>
						If you do not see your <b>club</b> listed in the
						dropdown or your club is not within Canada. Email me and
						I can add your club and country to the list.
					</p>
					<p className="text-center">
						<a
							href="mailto:owenduncansnobel@gmail.com?subject=Canadian Swim Rankings: Request Club"
							className="text-spaceGrey text-opacity-50 text-lg md:text-xl"
						>
							owenduncansnobel@gmail.com
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};
export default About;
