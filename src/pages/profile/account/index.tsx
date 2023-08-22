import ProfileLayout from "@/components/layouts/profile-layout";
import FormChangePassword from "@/components/form/profile/form-change-password";
import FormAccount from "@/components/form/profile/form-account";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Key } from "lucide-react";

export default function Transaction() {
  return (
    <ProfileLayout>
      <div className="grid grid-cols-12 gap-[15px] lg:gap[30px]">
        <div className="col-span-12 md:col-span-8 lg:col-span-8">
          <FormAccount></FormAccount>
        </div>

        <div className="col-span-12 md:col-span-4 lg:col-span-4">
          <Alert>
            <Key className="h-4 w-4" />
            <AlertTitle>Want to change your password?</AlertTitle>
            <AlertDescription>
              <FormChangePassword trigger={
                <span className="underline cursor-pointer mr-1">Click here</span>
              }></FormChangePassword>
               to change your password. Be careful with this action.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </ProfileLayout>
  )
}