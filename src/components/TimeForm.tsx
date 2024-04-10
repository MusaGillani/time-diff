"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { CardStack, defaultBreakObj } from "./ui/card-stack";
import { TimeInput } from "./TimeInput";
import { useCtrlCmdEnter } from "@/hooks/useCtrlCmdEnter";

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

  function onSubmit(data: FormSchema) {
    console.log("data :>> ", data);
  }

  useCtrlCmdEnter(form.handleSubmit(onSubmit));

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-8 w-2/5 mx-auto my-5"
        >
          <TimeInput
            label="Here"
            nameHour="here.hour"
            nameMinute="here.minute"
          />
          <Separator />
          <Label className="text-2xl">Breaks</Label>
          <CardStack control={form.control} />
          <Separator />
          <TimeInput
            label="Leaving"
            nameHour="leaving.hour"
            nameMinute="leaving.minute"
          />

          <Button type="submit">Submit</Button>
          <Label className="text-center text-muted-foreground">
            tip{" "}
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>Enter
            </kbd>{" "}
            to submit
          </Label>
        </form>
      </Form>
    </div>
  );
}

export default TimeForm;
