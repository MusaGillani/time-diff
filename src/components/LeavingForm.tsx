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
        className="flex flex-col gap-y-8 w-full my-5"
      >
        <Card
          id={"Leaving"}
          index={breakFields + 2}
          totalCards={breakFields + 2}
          key={"Leaving"}
        >
          <div className="flex flex-col gap-y-3 border-2 border-slate-300 rounded-lg p-5 justify-between h-full">
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
