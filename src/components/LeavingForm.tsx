"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import EnterShortcut from "./EnterShortcut";
import { Form } from "./ui/form";
import { Card } from "./ui/card";
import TimeInput from "./TimeInput";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { timeSchema } from "@/lib/form";
import { z } from "zod";

export const leavingFormSchema = z.object({
  leaving: timeSchema,
});

export type LeavingFormSchema = z.infer<typeof leavingFormSchema>;

function LeavingForm() {
  const form = useForm<LeavingFormSchema>({
    resolver: zodResolver(leavingFormSchema),
  });

  function onSubmit(data: LeavingFormSchema) {
    throw new Error("implement leavingForm onSubmit");
  }

  // TODO: get from state machine
  const breakFields = -1;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-5 flex w-full flex-col gap-y-8"
      >
        <Card
          id={"Leaving"}
          index={breakFields + 2}
          totalCards={breakFields + 2}
          key={"Leaving"}
        >
          <div className="flex h-full flex-col justify-between gap-y-3 rounded-lg border-2 border-slate-300 p-5">
            <TimeInput
              label="Leaving"
              nameHour="leaving.hour"
              nameMinute="leaving.minute"
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

export default LeavingForm;
