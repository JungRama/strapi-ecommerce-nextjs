import Link from "next/link"
import NextImage from "@/components/next-image"
import FormLogin from "@/components/form/auth/form-login"

export default function RegisterPage() {
  return (
    <div className="flex">
      <div className="container relative my-20 md:my-0 min-h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/register"
          className={"fixed right-4 top-4 md:right-8 md:top-8"}
        >
          Register
        </Link>

        <div className="relative hidden h-full flex-col bg-muted text-white dark:border-r lg:flex">
          <NextImage src={'/images/bg-auth.png'} alt="bg-auth" width={1920} height={800} 
          className="object-cover w-full min-h-100vh" 
          classNames={
            {
              image: 'object-cover w-full min-h-[100vh]',
            }
          }></NextImage>
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

            <FormLogin></FormLogin>

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