import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function login() {
  
  return (
    (<div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-bold text-4xl">HMS</h1>
          <p className="text-gray-500">Welcome to HMS. Please login to continue.</p>
        </div>
        <Card className="mx-auto w-full bg-[#ffffff] p-6 rounded-lg shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Please enter your credentials to access your account.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="border-2 border-gray-200 p-2 rounded-md"
                id="email"
                placeholder="john@example.com"
                required
                type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                className="border-2 border-gray-200 p-2 rounded-md"
                id="password"
                required
                type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center mt-4">
            <Button
              className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Sign In
            </Button>
            <Link className="text-blue-500 hover:text-blue-800" href="#">
              Forgot password?
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>)
  );
}
