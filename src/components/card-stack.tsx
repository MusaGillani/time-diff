import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  UseFieldArrayReturn,
  UseFormReturn,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { FormSchema } from "./TimeForm";
import { triggerByKeyGenerate } from "@/lib/form";
import { TimeInput } from "./TimeInput";

export interface CardStackProps {
  control: UseFormReturn<FormSchema>["control"];
}

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

type Cards = UseFieldArrayReturn<FormSchema, "afkBreak">["fields"];

export const CardStack = ({ control }: CardStackProps) => {
  const { trigger, getValues } = useFormContext<FormSchema>();
  const triggerByKey = triggerByKeyGenerate(getValues, trigger);
  const breakFields = useFieldArray({
    control,
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
    <div className="relative w-full h-96">
      {breakFields.fields.map((_, index) => {
        const key = "break." + index;
        return (
          <Card
            id={key}
            index={index}
            totalCards={breakFields.fields.length}
            key={key}
          >
            <div className="flex flex-col gap-y-3 border-2 border-slate-300 rounded-lg p-5 ">
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
            <div className="flex gap-x-3 my-1">
              <Button
                type="button"
                className="grow"
                onClick={() => onNext(index)}
              >
                Next
              </Button>
              {index > 0 && (
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
    </div>
  );
};
