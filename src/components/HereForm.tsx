"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import EnterShortcut from "./EnterShortcut";
import { Form } from "./ui/form";
import { Card } from "./ui/card";
import TimeInput from "./TimeInput";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { z } from "zod";
import { timeSchema } from "@/lib/form";

export const hereFormSchema = z.object({
  here: timeSchema,
});

export type HereFormSchema = z.infer<typeof hereFormSchema>;

function HereForm() {
  const form = useForm<HereFormSchema>({
    resolver: zodResolver(hereFormSchema),
  });

  function onSubmit(data: HereFormSchema) {
    throw new Error("implement hereForm onSubmit");
  }

  // TODO: get from state machine
  const breakFields = -1;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-5 flex w-full flex-col gap-y-8"
      >
        <Card id={"Here"} index={0} totalCards={breakFields + 2} key={"Here"}>
          <div className="flex h-full flex-col justify-between gap-y-3 rounded-lg border-2 border-slate-300 p-5">
            <TimeInput
              label="Here"
              nameHour="here.hour"
              nameMinute="here.minute"
            />
            <Button type="submit">Next</Button>
          </div>
        </Card>
        <Separator />
        <EnterShortcut
          shortCut={form.handleSubmit(onSubmit)}
          text={"to go next"}
        />
      </form>
    </Form>
  );
}

export default HereForm;
