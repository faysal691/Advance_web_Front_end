import Link from "next/link"
import { Button } from "./ui/button"
import { deleteCookie, getCookie, hasCookie } from "cookies-next"
import { useRouter } from "next/router"

const Navbar = ({ setSidebarOpenStatus }) => {
	const router = useRouter()

	return (
		<nav className="bg-slate-100 dark:bg-slate-900 border-b">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<div className="flex space-x-2">
					{hasCookie("role") && getCookie("role").toString() == "2" && (
						<button
							data-collapse-toggle="navbar-default"
							type="button"
							className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							aria-controls="navbar-default"
							aria-expanded="false"
							onClick={() => setSidebarOpenStatus(prev => !prev)}
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="w-5 h-5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 17 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M1 1h15M1 7h15M1 13h15"
								/>
							</svg>
						</button>
					)}

					<a
						href="/"
						className="flex items-center space-x-3 rtl:space-x-reverse"
					>
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
							HMS
						</span>
					</a>
				</div>

				<div className="hidden w-full md:block md:w-auto" id="navbar-default">
					{!hasCookie("role") ? (
						<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
							<li>
								<Link
									href={"/auth/login"}
									className="text-blue-500 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2"
									aria-current="page"
								>
									Login
								</Link>
							</li>
							{/* <li>
								<Link
									href={"/auth/signup"}
									className="text-blue-500 bg-slate-100 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2"
									aria-current="page"
								>
									Sign Up
								</Link>
							</li> */}
						</ul>
					) : (
						<ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
							<li
								onClick={() => {
									deleteCookie("role")
									deleteCookie("email")
									deleteCookie("session")
								}}
							>
								<Link
									href={"/auth/login"}
									className="text-blue-500 hover:bg-blue-700 hover:text-white rounded-md px-3 py-2"
									aria-current="page"
								>
									Logout
								</Link>
							</li>
						</ul>
					)}
				</div>
			</div>
		</nav>
	)
}

export default Navbar
