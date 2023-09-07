import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ValidationFormRegister,
  ValidationFormRegisterSchema,
} from "@/components/validations/auth-validation";

import UseErrorHandler from "@/lib/use-error-handler";
import { signUpWithCredential } from "@/services/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import GoogleAuthButton from "./google-auth-button";

export default function FormRegister() {
  const { handleRejection } = UseErrorHandler();

  const {
    register,
    handleSubmit,
    reset: resetFormRegister,
    formState: { errors },
  } = useForm<ValidationFormRegisterSchema>({
    resolver: zodResolver(ValidationFormRegister),
  });

  const [showConfirmEmailAlert, setShowConfirmEmailAlert] = useState(false);

  const onRegisterWithCredential: SubmitHandler<
    ValidationFormRegisterSchema
  > = async (data) => {
    try {
      await signUpWithCredential({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      resetFormRegister();

      setShowConfirmEmailAlert(true);
    } catch (error) {
      handleRejection(error);
    }
  };

  return (
    <>
      {showConfirmEmailAlert && (
        <Alert variant={"default"} className="bg-green-600 text-white">
          <AlertTitle>Please confirm your email</AlertTitle>
          <AlertDescription className="text-sm">
            We have sent you a link to your email. Click the link to confirm
            your email. <br />
            <br />
            (In development email are sent to the mailtrap)
          </AlertDescription>
        </Alert>
      )}

      <form
        onSubmit={handleSubmit(onRegisterWithCredential)}
        className="space-y-4"
      >
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            {...register("name")}
            defaultValue={"rama"}
            id="name"
            type="text"
            placeholder="eg. John Doe"
          />
          {errors.name && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.name?.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            defaultValue={"jungrama.id@gmail.com"}
            type="email"
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
            defaultValue={"password"}
            type="password"
            id="password"
            placeholder="Enter min. 8 character"
          />
          {errors.password && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.password?.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            {...register("confirmPassword")}
            defaultValue={"password"}
            type="password"
            id="confirm-password"
            placeholder="Re-enter your password"
          />
          {errors.confirmPassword && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>

        <Button className="w-full" type="submit">
          Register
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
