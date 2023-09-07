import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ErrorCard(message: any) {
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
  );
}
