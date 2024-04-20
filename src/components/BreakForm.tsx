"use client";

import { defaultBreakObj, timeSchema, triggerByKeyGenerate } from "@/lib/form";
import TimeInput from "./TimeInput";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { useStateStore } from "@/state/provider";
import EnterShortcut from "./EnterShortcut";
import { Steps } from "@/state/store";

// TODO: add validation to check time is after Here entry
// use isAfter helper form tempo
export const breakFormSchema = z.object({
  breaks: z
    .array(
      z
        .object({
          away: timeSchema,
          back: timeSchema,
        })
        .optional(),
    )
    .min(1),
});

export type BreakFormSchema = z.infer<typeof breakFormSchema>;

function BreakForm() {
  const { breaks, saveBreaks, totalCards, step } = useStateStore((store) => ({
    breaks: store.breaks,
    saveBreaks: store.saveBreaks,
    totalCards: store.breaks.length + 3,
    step: store.step,
  }));

  const form = useForm<BreakFormSchema>({
    resolver: zodResolver(breakFormSchema),
    defaultValues: () => {
      return Promise.resolve({ breaks });
    },
  });

  const triggerByKey = triggerByKeyGenerate(form.getValues, form.trigger);
  const breakFields = useFieldArray({
    control: form.control,
    name: "breaks",
  });

  const onNext = (index: number) => {
    breakFields.append(defaultBreakObj);
    triggerByKey(`breaks[${index}]`);
  };

  const removeCard = (index: number) => {
    breakFields.remove(index);
  };

  function onSubmit(data: BreakFormSchema) {
    saveBreaks(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {breakFields.fields.map((_, index) => {
          const key = "breaks." + index;
          return (
            <Card id={key} index={index + 1} totalCards={totalCards} key={key}>
              <div className="flex flex-col gap-y-3 rounded-lg border-2 border-slate-300 p-5 ">
                <TimeInput
                  label="Away"
                  timeLabels
                  nameHour={`breaks.${index}.away.hour`}
                  nameMinute={`breaks.${index}.away.minute`}
                />
                <TimeInput
                  label="Back"
                  timeLabels
                  nameHour={`breaks.${index}.back.hour`}
                  nameMinute={`breaks.${index}.back.minute`}
                />
              </div>
              <div className="my-4 flex gap-x-3">
                <Button
                  type="button"
                  className="grow"
                  onClick={() => onNext(index)}
                >
                  Add another
                </Button>
                {index + 1 > 1 && (
                  <Button
                    className="grow"
                    onClick={() => removeCard(index)}
                    type="button"
                  >
                    Remove
                  </Button>
                )}
              </div>{" "}
              <Button type="submit" className="w-full">
                Next
              </Button>
            </Card>
          );
        })}
        {step === Steps.BREAKS && (
          <EnterShortcut
            shortCut={form.handleSubmit(onSubmit)}
            text={"to add leaving"}
          />
        )}
      </form>
    </Form>
  );
}

export default BreakForm;
