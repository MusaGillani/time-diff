"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import EnterShortcut from "./EnterShortcut";
import { Form } from "./ui/form";
import { Card } from "./ui/card";
import TimeInput from "./TimeInput";
import { Button } from "./ui/button";
import { timeSchema } from "@/lib/form";
import { z } from "zod";
import { useStateStore } from "@/state/provider";
import { Steps } from "@/state/store";

export const leavingFormSchema = z.object({
  leaving: timeSchema,
});

export type LeavingFormSchema = z.infer<typeof leavingFormSchema>;

function LeavingForm() {
  const { leaving, saveLeaving, totalCards, step } = useStateStore((store) => ({
    leaving: store.leaving,
    saveLeaving: store.saveLeaving,
    totalCards: store.breaks.length + 2,
    step: store.step,
  }));

  const form = useForm<LeavingFormSchema>({
    resolver: zodResolver(leavingFormSchema),
    defaultValues: { leaving },
  });

  function onSubmit(data: LeavingFormSchema) {
    saveLeaving(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-5 flex w-full flex-col gap-y-8"
      >
        <Card
          id={"Leaving"}
          index={totalCards}
          totalCards={totalCards}
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
        {step === Steps.LEAVING && (
          <EnterShortcut
            shortCut={form.handleSubmit(onSubmit)}
            text={"to submit"}
          />
        )}
      </form>
    </Form>
  );
}

export default LeavingForm;
