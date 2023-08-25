import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export function ErrorCard(message: any | unknown) {
  return (
    <Alert variant={"default"}>
      <div className="flex items-center">
        <AlertCircleIcon></AlertCircleIcon>
        <div className="ml-3">
          <AlertTitle>Something went wrong: </AlertTitle>
          <AlertDescription>{JSON.stringify(message)}</AlertDescription>
        </div>
      </div>
    </Alert>
  )
}