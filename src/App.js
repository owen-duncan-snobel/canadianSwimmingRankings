import React, { useState } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	NavLink,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//import Swimmer from './routes/swimmer/swimmer';
import Swimmers from './views/swimmers/swimmers';
import About from './views/about/about';
import Contact from './views/contact/contact';
import Clubs from './views/clubs/clubs';
import logo from './images/favicon.ico';

function App() {
	const [navbarOpen, setNavbarOpen] = useState(false);
	return (
		<Router>
			<nav className="ml-2 mt-4">
				{/** Medium breakpoint and up Menu Bar */}
				<div className="flex items-center justify-between md:justify-start no-underline">
					<NavLink exact to="/" style={{ textDecoration: 'none' }}>
						{/** Logo and text visible md-up */}
						<div className="hidden md:block text-spaceGrey text-xl font-medium text-opacity-60 pr-4">
							{/* Logo */}
							<img
								src={logo}
								width="35"
								height="35"
								className="inline"
								alt="Canadian Swimming Rankings Logo"
							/>
							Canadian Swimming Rankings
						</div>

						{/** Only Logo Visible to md */}
						<div className="md:hidden text-spaceGrey text-xl text-opacity-70">
							{/* Logo */}
							<img
								src={logo}
								width="35"
								height="35"
								className="inline"
								alt="Canadian Swimming Rankings Logo"
							/>
						</div>
					</NavLink>

					<div className="md:hidden m-6">
						<button onClick={() => setNavbarOpen(!navbarOpen)}>
							<svg
								className="stroke-current text-gray-900 w-6 h-6 align-bottom"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<line x1="3" y1="12" x2="21" y2="12"></line>
								<line x1="3" y1="6" x2="21" y2="6"></line>
								<line x1="3" y1="18" x2="21" y2="18"></line>
							</svg>
						</button>
					</div>

					<div className="text-sm font-semibold hidden md:block justify-center">
						<NavLink
							exact
							to="/swimmers"
							className="block sm:inline-block lg:mt-0 mr-4 text-gray-500 hover:text-gray-900"
							activeClassName="text-gray-900"
							style={{ textDecoration: 'none' }}
						>
							Swimmers
						</NavLink>

						<NavLink
							exact
							to="/clubs"
							className="block no-underline  sm:inline-block lg:mt-0 mr-4  text-gray-500 hover:text-gray-900"
							activeClassName="text-gray-900"
							style={{ textDecoration: 'none' }}
						>
							Clubs
						</NavLink>

						<NavLink
							exact
							to="/about"
							className="block  sm:inline-block lg:mt-0 mr-4 text-gray-500 hover:text-gray-900"
							activeClassName="text-gray-900"
							style={{ textDecoration: 'none' }}
						>
							About
						</NavLink>

						<NavLink
							exact
							to="/contact"
							className="block  sm:inline-block lg:mt-0 mr-4 text-gray-500 hover:text-gray-900"
							activeClassName="text-gray-900"
							style={{ textDecoration: 'none' }}
						>
							Contact
						</NavLink>
					</div>
				</div>

				{/** MOBILE MENU BAR */}
				<div
					className={
						'text-sm  font-semibold justify md:hidden pl-2' +
						' ' +
						(navbarOpen ? 'block' : 'hidden')
					}
				>
					<NavLink
						exact
						to="/swimmers"
						className="block lg:mt-0 mr-4 text-gray-500 hover:text-gray-900"
						activeClassName="text-gray-900"
						style={{ textDecoration: 'none' }}
					>
						Swimmers
					</NavLink>

					<NavLink
						exact
						to="/clubs"
						className="block  lg:mt-0 mr-4  text-gray-500 hover:text-gray-900"
						activeClassName="text-gray-900"
						style={{ textDecoration: 'none' }}
					>
						Clubs
					</NavLink>

					<NavLink
						exact
						to="/about"
						className="block lg:mt-0 mr-4 text-gray-500 hover:text-gray-900"
						activeClassName="text-gray-900"
						style={{ textDecoration: 'none' }}
					>
						About
					</NavLink>

					<NavLink
						exact
						to="/contact"
						className="block lg:mt-0 mr-4 text-gray-500 hover:text-gray-900"
						activeClassName="text-gray-900"
						style={{ textDecoration: 'none' }}
					>
						Contact
					</NavLink>
				</div>
			</nav>

			<Switch>
				<Route path="/swimmers">
					<Swimmers />
				</Route>
				<Route path="/clubs">
					<Clubs />
				</Route>
				<Route path="/about">
					<About />
				</Route>
				<Route path="/contact">
					<Contact />
				</Route>
				<Route path="/">
					<Swimmers />
				</Route>
			</Switch>
		</Router>
	);
}
export default App;
