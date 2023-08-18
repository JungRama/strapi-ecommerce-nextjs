import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import NextImage from "@/components/next-image"

export default function RegisterPage() {
  return (
    <div className="flex">
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/register"
          className={"absolute right-4 top-4 md:right-8 md:top-8"}
        >
          Register
        </Link>

        <div className="relative hidden h-full flex-col bg-muted text-white dark:border-r lg:flex">
          <NextImage src={'/images/bg-auth.png'} alt="bg-auth" width={1920} height={800} className="object-cover w-full"></NextImage>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Login to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your credential below to enter your account
              </p>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="johndoe@example.com" />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" placeholder="Enter your password" />
            </div>

            <Button>Login</Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <Button variant={'outline'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 186.69 190.5">
                <g transform="translate(1184.583 765.171)">
                  <path clip-path="none" mask="none"
                    d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
                    fill="#4285f4" />
                  <path clip-path="none" mask="none"
                    d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
                    fill="#34a853" />
                  <path clip-path="none" mask="none"
                    d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
                    fill="#fbbc05" />
                  <path
                    d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
                    fill="#ea4335" clip-path="none" mask="none" />
                </g>
              </svg>
               <span className="ml-2">Google</span>
            </Button>


            <p className="px-8 text-center text-sm text-muted-foreground">
              By create an account, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}