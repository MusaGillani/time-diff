"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import EnterShortcut from "./EnterShortcut";
import { Form } from "./ui/form";
import { Card } from "./ui/card";
import TimeInput from "./TimeInput";
import { Button } from "./ui/button";
import { z } from "zod";
import { timeSchema } from "@/lib/form";
import { useStateStore } from "@/state/provider";
import { FormTypes } from "@/state/store";

export const hereFormSchema = z.object({
  here: timeSchema,
});

export type HereFormSchema = z.infer<typeof hereFormSchema>;

function HereForm() {
  const { here, saveHere, totalCards, formName } = useStateStore((store) => ({
    here: store.here,
    saveHere: store.saveHere,
    totalCards: store.breaks.length + 2,
    formName: store.form,
  }));

  const form = useForm<HereFormSchema>({
    resolver: zodResolver(hereFormSchema),
    defaultValues: { here },
  });

  function onSubmit(data: HereFormSchema) {
    saveHere(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-5 flex w-full flex-col gap-y-8"
      >
        <Card id={"Here"} index={0} totalCards={totalCards} key={"Here"}>
          <div className="flex h-full flex-col justify-between gap-y-3 rounded-lg border-2 border-slate-300 p-5">
            <TimeInput
              label="Here"
              nameHour="here.hour"
              nameMinute="here.minute"
            />
            <Button type="submit">Next</Button>
          </div>
        </Card>
        {formName === FormTypes.HERE && (
          <EnterShortcut
            shortCut={form.handleSubmit(onSubmit)}
            text={"to add breaks"}
          />
        )}
      </form>
    </Form>
  );
}

export default HereForm;
