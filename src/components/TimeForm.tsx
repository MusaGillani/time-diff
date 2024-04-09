"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MinusCircleIcon, PlusIcon } from "lucide-react";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

const time = z.object({ hour: z.number().max(24), minute: z.number().max(59) });

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

const defaultBreakObj = {
  away: {
    hour: 0,
    minute: 0,
  },
  back: {
    hour: 0,
    minute: 0,
  },
};

export type FormSchema = z.infer<typeof schema>;

function TimeForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      afkBreak: [defaultBreakObj],
    },
  });

  const breakFields = useFieldArray({
    control: form.control,
    name: "afkBreak",
  });

  function onSubmit(data: FormSchema) {}

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-2/5 mx-auto gap-y-4 my-5"
        >
          <Label className="text-2xl">Here</Label>
          <div className="flex gap-x-5 ">
            <FormField
              control={form.control}
              name="here.hour"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="here" />
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
                    <Input {...field} placeholder="here" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <div className="flex items-center gap-x-10">
            <Label className="text-2xl">Breaks</Label>
            <Button
              type="button"
              onClick={() => breakFields.append(defaultBreakObj)}
            >
              <PlusIcon />
            </Button>
          </div>
          {breakFields.fields.map((field, index) => (
            <div
              key={index}
              className="border-2 border-slate-300 rounded-lg p-5 "
            >
              <Label className="text-xl">Away</Label>
              <div className="flex gap-x-5 ">
                <FormField
                  control={form.control}
                  name={`afkBreak.${index}.away.hour`}
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
                  name={`afkBreak.${index}.away.minute`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="minutes"
                          className="grow"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator />
              <Label className="text-xl">Back</Label>
              <div className="flex gap-x-5 ">
                <FormField
                  control={form.control}
                  name={`afkBreak.${index}.back.hour`}
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
                  name={`afkBreak.${index}.back.minute`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="minutes"
                          className="grow"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {index > 0 && (
                <Button
                  className="my-5"
                  onClick={() => breakFields.remove(index)}
                  type="button"
                >
                  <MinusCircleIcon />
                </Button>
              )}
            </div>
          ))}
          <Separator />
          <Label className="text-2xl !mt-2">Leaving</Label>
          <div className="flex gap-x-5 ">
            <FormField
              control={form.control}
              name={`leaving.hour`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="here" />
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
                    <Input {...field} placeholder="here" />
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
