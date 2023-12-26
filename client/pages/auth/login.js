import {
	CardTitle,
	CardDescription,
	CardHeader,
	CardContent,
	CardFooter,
	Card,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { getCookies, setCookie, deleteCookie, getCookie } from "cookies-next"
import axios from "axios"

export default function login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("A4apple%")

	const router = useRouter()

	const handleLogin = async () => {
		try {
			// Make a POST request to your backend for authentication
			const response = await axios.post(
				"http://localhost:3000/auth/login",
				{
					email: email,
					password: password,
				},
				{
					headers: { "Content-Type": "application/x-www-form-urlencoded" },
					withCredentials: true,
				}
			)
			console.log("User Login", response)

			if (response.status == 201) {
				// Login successful, you may redirect or perform other actions
				setCookie("email", response.data.session.email)
				setCookie("role", response.data.session.role)
				setCookie("session", response.data.session)
				toast.success(response.data.message.message)
				console.log(response.data.message)

				router.push(
					`/${
						response.data.session.role == 2
							? "manager"
							: response.data.session.role == 3
							? "doctor"
							: response.data.session.role == 4
							? "nurse"
							: response.data.session.role == 5
							? "patient"
							: "patient"
					}/dashboard`
				)
			} else {
				// toast.error(response.data.message);
				// Handle authentication error
				console.error("Authentication failed")
			}
		} catch (error) {
			// toast.error(error.response.data.message);
			console.error("Error during login:", error)
		}
	}

	return (
		<section className="flex grow items-center justify-center">
			<div className="w-full max-w-md">
				{/* <div className="text-center mb-20 space-y-4">
					<h1 className="font-bold text-4xl bg-blue-600">HMS</h1>
					<p className="text-gray-500">
						Welcome to HMS. Please login to continue.
					</p>
				</div> */}
				<Card className="mx-auto w-full dark:bg-slate-900 p-6 rounded-lg shadow-lg">
					<CardHeader className="space-y-4">
						<CardTitle className="text-2xl py-1 bg-blue-600 text-center text-slate-50">
							Login
						</CardTitle>
						<CardDescription className="text-slate-50">
							Welcome to HMS. Please login to continue.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email" className="">
								Email
							</Label>
							<Input
								className="border-2 border-gray-200 p-2 rounded-md "
								id="email"
								placeholder="john@example.com"
								required
								type="email"
								onChange={e => {
									setEmail(e.target.value)
								}}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password" className="">
								Password
							</Label>
							<Input
								className="border-2 border-gray-200 p-2 rounded-md "
								id="password"
								required
								type="password"
								onChange={e => setPassword(e.target.value)}
							/>
						</div>
					</CardContent>
					<CardFooter className="flex justify-between items-center mt-4">
						<Button
							className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							onClick={handleLogin}
						>
							Sign In
						</Button>
						<Link
							href="/auth/signup"
							className="text-blue-500 hover:text-blue-800"
						>
							Sign Up?
						</Link>
					</CardFooter>
				</Card>
			</div>
		</section>
	)
}
