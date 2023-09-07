import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

import UseErrorHandler from "@/lib/use-error-handler";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ValidationFormLogin,
  ValidationFormLoginSchema,
} from "@/components/validations/auth-validation";
import { useRouter } from "next/router";
import GoogleAuthButton from "./google-auth-button";

export default function FormLogin() {
  const router = useRouter();
  const { handleRejection } = UseErrorHandler();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationFormLoginSchema>({
    resolver: zodResolver(ValidationFormLogin),
  });

  const onLoginWithCredential: SubmitHandler<
    ValidationFormLoginSchema
  > = async (data) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result && !result.ok) {
        throw result.error;
      }

      if (router.query.callbackUrl) {
        router.push(router.query.callbackUrl as string);
      } else {
        router.push("/profile");
      }
    } catch (error) {
      handleRejection(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onLoginWithCredential)}
        className="space-y-4"
      >
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            type="text"
            id="email"
            placeholder="johndoe@example.com"
          />
          {errors.email && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.email?.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.password?.message}
            </p>
          )}
        </div>

        <div className="flex text-sm">
          <Link href={"/forgot-password"}>Forgot Password? Click Here</Link>
        </div>

        <Button type="submit" className="w-full my-3">
          Login
        </Button>
      </form>

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

      <GoogleAuthButton></GoogleAuthButton>
    </>
  );
}
