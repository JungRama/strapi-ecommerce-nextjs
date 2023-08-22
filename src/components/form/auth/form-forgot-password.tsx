import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function FormForgotPassword() {
  return (
    <>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="johndoe@example.com" />
      </div>

      <Button>Send</Button>
    </>
  )
}