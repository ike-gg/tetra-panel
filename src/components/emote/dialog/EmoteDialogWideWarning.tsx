import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

export const EmoteDialogWideWarning = () => {
  return (
    <Alert variant="warning" className="space-x-1.5">
      <AlertTriangle />
      <AlertTitle>Wide emote</AlertTitle>
      <AlertDescription>
        We detected that your emote is quite long. Please make sure to choose
        right fitting option listed below- that looks best for you!
      </AlertDescription>
    </Alert>
  );
};
