"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { Label } from "./ui/label";
import { format } from "@formkit/tempo";

const schema = z.object({
  here: z.date(),
  away: z.array(z.object({ time: z.date().optional() })).min(1),
  back: z.array(z.object({ time: z.date().optional() })).min(1),
  leaving: z.date(),
});

type FormSchema = z.infer<typeof schema>;

function TimeForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      away: [{}], // to show atleast one input field
      back: [{}],
    },
  });

  const awayFields = useFieldArray({
    control: form.control,
    name: "away",
  });
  const backFields = useFieldArray({
    control: form.control,
    name: "back",
  });

  function onSubmit(data: FormSchema) {}

  function formatTime(value: string | undefined) {
    if (!!value) return format(value, { time: "medium" });
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-2/5 mx-auto gap-y-4 my-2"
        >
          <Label className="text-2xl">Here</Label>
          <FormField
            control={form.control}
            name="here"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="here"
                    value={formatTime(field.value?.toISOString())}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-10">
            <Label className="text-2xl">Back</Label>
            <Button type="button" onClick={() => backFields.append({})}>
              <PlusIcon />
            </Button>
          </div>
          {backFields.fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`back.${index}.time`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="back"
                      value={formatTime(field.value?.toISOString())}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <div className="flex items-center gap-x-10">
            <Label className="text-2xl">Away</Label>
            <Button type="button" onClick={() => awayFields.append({})}>
              <PlusIcon />
            </Button>
          </div>
          {awayFields.fields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`away.${index}.time`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="away"
                      value={formatTime(field.value?.toISOString())}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Label className="text-2xl">Leaving</Label>
          <FormField
            control={form.control}
            name="leaving"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="leaving"
                    value={formatTime(field.value?.toISOString())}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default TimeForm;
