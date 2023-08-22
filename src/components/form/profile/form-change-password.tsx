import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function FormChangePassword({ trigger }: { trigger: JSX.Element }) {

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          { trigger }
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div>
            <Label htmlFor="current-password">Current Password</Label>
            <Input type="password" id="current-password" placeholder="Enter min. 8 character" />
          </div>

          <div>
            <Label htmlFor="new-password">Password</Label>
            <Input type="password" id="new-password" placeholder="Enter min. 8 character" />
          </div>
          
          <div>
            <Label htmlFor="reenter-new-password">Re-enter New Password</Label>
            <Input type="password" id="reenter-new-password" placeholder="Re-enter your new password" />
          </div>

          <DialogFooter>
            <Button>
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}