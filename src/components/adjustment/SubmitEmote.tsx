/* eslint-disable @next/next/no-img-element */
import { type ManualAdjustment } from "@prisma/client";
import * as Dialog from "../ui/dialog";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { TypographyMuted } from "../ui/typography";
import { endpoints } from "~/constants/apiroutes";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { routes } from "~/constants/routes";
import * as Select from "../ui/select";
import { useEffect, useState } from "react";
import {
  type ContextGuild,
  useEmoteContextStore,
} from "~/app/store/emoteContextStore";
import { getGuildIcon, parseTetraApiError } from "~/lib/utils";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "../ui/form";
import wretch from "wretch";
import { WretchError } from "wretch/resolver";

interface Props {
  task: ManualAdjustment;
  modifiedBase64: string;
  isCorrectSize: boolean;
}

const formSchema = z.object({
  guildId: z.string(),
  emoteName: z
    .string()
    .min(2, "Ninumimum 2 characters")
    .max(32, "Maximum 32 characters")
    .refine(
      (value) => /^[a-zA-Z0-9_]{2,32}$/.test(value),
      "Emote names can only contain alphanumeric characters and underscores.",
    ),
});

type FormSchema = z.infer<typeof formSchema>;

export const SubmitEmote = ({ isCorrectSize, modifiedBase64, task }: Props) => {
  const router = useRouter();
  const userGuilds = useEmoteContextStore((s) => s.guilds);

  const form = useForm<FormSchema>({
    defaultValues: { emoteName: task.emoteName, guildId: task.guildId },
    resolver: zodResolver(formSchema),
  });

  const emoteName = form.watch("emoteName");
  const guildId = form.watch("guildId");

  useEffect(() => {
    const newGuild = userGuilds?.find((guild) => guild.id === guildId);
    if (!newGuild) return;
    setGuild(newGuild);
  }, [guildId, userGuilds]);

  const [guild, setGuild] = useState<ContextGuild>({
    id: task.guildId,
    name: task.guildName,
    icon: task.guildIcon,
  });

  const onSubmit = async (formData: FormSchema) => {
    try {
      const response: { message: string } = await wretch(
        endpoints.task(task.id),
      )
        .options({ credentials: "include" })
        .post({
          emote: modifiedBase64,
          name: formData.emoteName,
          guildId: formData.guildId,
        })
        .json();
      toast.success(response.message);
      router.replace(routes.panel + `?f=${task.id}`);
    } catch (error) {
      if (error instanceof WretchError) {
        const errorMessage = parseTetraApiError(error);
        form.setError("root", { message: `${error.status}: ${errorMessage}` });
      } else {
        form.setError("root", { message: "Uncaught error" });
      }
    }
  };

  return (
    <Dialog.Dialog>
      <Dialog.DialogTrigger disabled={!isCorrectSize} asChild>
        <Button size="lg" className="w-full">
          Review & Submit emote
        </Button>
      </Dialog.DialogTrigger>
      <Dialog.DialogContent className="max-h-screen overflow-y-auto">
        <Form.Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <Dialog.DialogHeader>
              <Dialog.DialogTitle>Review & Submit emote</Dialog.DialogTitle>
              <Dialog.DialogDescription>
                Click submit if you are ready. After clicking please wait until
                confirm popups.
              </Dialog.DialogDescription>
            </Dialog.DialogHeader>
            <Form.FormField
              control={form.control}
              name="guildId"
              render={({ field }) => (
                <Form.FormItem>
                  <Form.FormLabel>Server</Form.FormLabel>
                  <Select.Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <Form.FormControl>
                      <Select.SelectTrigger>
                        <Select.SelectValue placeholder="Select server" />
                      </Select.SelectTrigger>
                    </Form.FormControl>
                    <Select.SelectContent>
                      <Select.SelectGroup>
                        <Select.SelectLabel>
                          Available servers
                        </Select.SelectLabel>
                        {userGuilds?.map((guild) => (
                          <Select.SelectItem
                            key={guild.id + guild.name}
                            value={guild.id}
                          >
                            <div className="flex items-center justify-between gap-2">
                              {guild.icon && (
                                <img
                                  alt={`server icon for ${guild.name}`}
                                  className="h-5 w-5 rounded-full"
                                  src={getGuildIcon(guild.id, guild.icon, {
                                    size: 32,
                                  })}
                                />
                              )}
                              <p>{guild.name}</p>
                            </div>
                          </Select.SelectItem>
                        ))}
                      </Select.SelectGroup>
                    </Select.SelectContent>
                  </Select.Select>
                </Form.FormItem>
              )}
            />
            <Form.FormField
              control={form.control}
              name="emoteName"
              render={({ field }) => (
                <Form.FormItem>
                  <Form.FormLabel>Emote name</Form.FormLabel>
                  <Form.FormControl>
                    <Input placeholder="Name for emote" {...field} />
                  </Form.FormControl>
                  <Form.FormMessage />
                </Form.FormItem>
              )}
            />
            <div className="flex items-center justify-center gap-4 rounded-lg bg-radar from-neutral-100/50 to-white py-12">
              <img
                alt="emote preview"
                className="h-24 w-24 rounded-xl border object-contain shadow-xl"
                src={modifiedBase64}
              />
              <ArrowRightIcon />
              {guild.icon && (
                <img
                  alt="guild"
                  className="h-24 w-24 rounded-xl border object-contain shadow-xl"
                  src={getGuildIcon(guild.id, guild.icon, { size: 256 })}
                />
              )}
            </div>
            <TypographyMuted className="text-center">
              Are you sure you want to add <b>{emoteName}</b> emote to{" "}
              <b>{guild.name}</b>?
            </TypographyMuted>
            {form.formState.errors.root && (
              <Alert variant="destructive">
                <AlertTitle>Something went wrong</AlertTitle>
                <AlertDescription className="break-all">
                  {form.formState.errors.root.message}
                </AlertDescription>
              </Alert>
            )}
            <Dialog.DialogFooter className="flex-col justify-center">
              <Button
                disabled={
                  form.formState.isSubmitSuccessful ||
                  form.formState.isSubmitting
                }
                type="submit"
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </Dialog.DialogFooter>
          </form>
        </Form.Form>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
};
