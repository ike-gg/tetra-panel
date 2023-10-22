/* eslint-disable @next/next/no-img-element */
import { type ManualAdjustment } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { TypographyMuted } from "../ui/typography";
import { useFeedback } from "~/hooks/useFeedback";
import { endpoints } from "~/constants/apiroutes";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { routes } from "~/constants/routes";

interface Props {
  task: ManualAdjustment;
  modifiedBase64: string;
  isCorrectSize: boolean;
}

export const SubmitEmote = ({ isCorrectSize, modifiedBase64, task }: Props) => {
  const { error, loading, setError, setLoading, success } = useFeedback();

  const router = useRouter();

  const submitEmote = async () => {
    setLoading(true);
    try {
      const body = {
        emote: modifiedBase64,
      };
      const request = await fetch(endpoints.task(task.id), {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const { error, message } = (await request.json()) as {
        error: string;
        message: string;
      };

      if (!request.ok) {
        setError(`${request.status}: ${error}`);
      }

      if (request.ok) {
        toast.success("Emote added!", { description: message });
        router.replace(routes.panel + `?f=${task.id}`);
      }
    } catch (error) {
      setError(String(error));
    }
  };

  return (
    <Dialog>
      <DialogTrigger disabled={!isCorrectSize} asChild>
        <Button size="lg" className="w-full">
          Review & Submit emote
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Review & Submit emote</DialogTitle>
          <DialogDescription>
            Click submit if you are ready. After clicking please wait until
            confirm popups.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-radar flex items-center justify-center gap-4 rounded-lg from-neutral-100/50 to-white py-12">
          <img
            alt="emote preview"
            className="h-24 w-24 rounded-xl border object-contain shadow-xl"
            src={modifiedBase64}
          />
          <ArrowRightIcon />
          <img
            alt="guild"
            className="h-24 w-24 rounded-xl border object-contain shadow-xl"
            src={task.guildIcon!}
          />
        </div>
        <TypographyMuted className="text-center">
          Are you sure you want to add <b>{task.emoteName}</b> emote to{" "}
          <b>{task.guildName}</b>?
        </TypographyMuted>
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <DialogFooter className="flex-col justify-center">
          {!success && (
            <Button disabled={loading} onClick={submitEmote}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
