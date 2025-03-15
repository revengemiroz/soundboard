"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link2, Loader2 } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),

  url: z.string().url({
    message: "Please enter a valid URL.",
  }),
});

type RequestSoundModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RequestSoundModal({
  open,
  onOpenChange,
}: RequestSoundModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const requestSound = useMutation(api.requestSound.requestSound);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    try {
      await requestSound(values);
      toast("Sound requested successfully!");
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }

    setIsSubmitting(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request a Meme Sound</DialogTitle>
          <DialogDescription>
            Found a hilarious meme sound that's missing from our collection? Let
            us know!
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sound Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Oh No No No Laugh" {...field} />
                  </FormControl>
                  <FormDescription>
                    What's this meme sound commonly called?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL to Meme</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Link2 className="h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Link to a YouTube video, TikTok, or other source with the
                    sound.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
