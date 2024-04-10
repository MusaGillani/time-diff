"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { CardStack, defaultBreakObj } from "./ui/card-stack";

const time = z.object({
  hour: z.coerce.number().gte(0, "non zero").max(24),
  minute: z.coerce.number().gte(0, "non zero").max(59),
});

const afkBreak = z
  .array(
    z
      .object({
        away: time,
        back: time,
      })
      .optional()
  )
  .min(1);

const schema = z.object({
  here: time,
  afkBreak,
  leaving: time,
});

export type FormSchema = z.infer<typeof schema>;

function TimeForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      afkBreak: [defaultBreakObj],
    },
  });

  function onSubmit(data: FormSchema) {}

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-8 w-2/5 mx-auto my-5"
        >
          <Label className="text-2xl">Here</Label>
          <div className="flex gap-x-5 ">
            <FormField
              control={form.control}
              name="here.hour"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="hour" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="here.minute"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="minutes" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <Label className="text-2xl">Breaks</Label>
          <CardStack control={form.control} />
          <Separator />
          <Label className="text-2xl">Leaving</Label>
          <div className="flex gap-x-5 ">
            <FormField
              control={form.control}
              name={`leaving.hour`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="hour" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`leaving.minute`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="minutes" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default TimeForm;
