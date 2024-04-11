"use client";

import { timeSchema, triggerByKeyGenerate } from "@/lib/form";
import TimeInput from "./TimeInput";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";

export const breakFormSchema = z.object({
  afkBreak: z
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

export const defaultBreakObj = {
  away: {
    hour: 0,
    minute: 0,
  },
  back: {
    hour: 0,
    minute: 0,
  },
};

function BreakForm() {
  const form = useForm<BreakFormSchema>({
    resolver: zodResolver(breakFormSchema),
    defaultValues: {
      afkBreak: [defaultBreakObj],
    },
  });
  const triggerByKey = triggerByKeyGenerate(form.getValues, form.trigger);
  const breakFields = useFieldArray({
    control: form.control,
    name: "afkBreak",
  });

  const onNext = (index: number) => {
    breakFields.append(defaultBreakObj);
    triggerByKey(`afkBreak[${index}]`);
  };

  const removeCard = (index: number) => {
    breakFields.remove(index);
  };

  return (
    <Form {...form}>
      <form>
        {breakFields.fields.map((_, index) => {
          const key = "break." + index;
          return (
            <Card
              id={key}
              index={index + 1}
              totalCards={breakFields.fields.length + 1}
              key={key}
            >
              <div className="flex flex-col gap-y-3 rounded-lg border-2 border-slate-300 p-5 ">
                <TimeInput
                  label="Away"
                  timeLabels
                  nameHour={`afkBreak.${index}.away.hour`}
                  nameMinute={`afkBreak.${index}.away.minute`}
                />
                <TimeInput
                  label="Away"
                  timeLabels
                  nameHour={`afkBreak.${index}.back.hour`}
                  nameMinute={`afkBreak.${index}.back.minute`}
                />
              </div>
              <div className="my-4 flex gap-x-3">
                <Button
                  type="button"
                  className="grow"
                  onClick={() => onNext(index)}
                >
                  Next
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
              </div>
            </Card>
          );
        })}
      </form>
    </Form>
  );
}

export default BreakForm;
