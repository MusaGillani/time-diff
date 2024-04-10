"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "./button";
import {
  UseFieldArrayReturn,
  UseFormReturn,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { FormSchema } from "../TimeForm";
import { Label } from "./label";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { triggerByKeyGenerate } from "@/lib/form";
import { TimeInput } from "../TimeInput";

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

export interface CardProps extends React.PropsWithChildren {
  id: any;
  index: number;
  totalCards: number;
  offset?: number;
  scaleFactor?: number;
}
export const Card = ({
  id,
  index,
  offset,
  scaleFactor,
  totalCards,
  children,
}: CardProps) => {
  const CARD_OFFSET = offset || 10;
  // * Scale is 1 for index + 1 === totalCards
  // * Scale decreases by scaleFactor (by default 0.06) when index decreases by 1
  // * in other words the scale will be - 0.06 for each decrease in index by 1
  const scaleCalculated = calcScale(index + 1, totalCards, scaleFactor);
  return (
    <motion.div
      key={id}
      className="absolute dark:bg-black bg-white h-96 w-full rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
      style={{
        transformOrigin: "top center",
      }}
      animate={{
        top: index * CARD_OFFSET,
        scale: scaleCalculated,
        zIndex: totalCards + index, //  decrease z-index for the cards that are behind
      }}
    >
      {children}
    </motion.div>
  );
};

/// inverse of 1 - index * SCALE_FACTOR
function calcScale(point: number, x: number, scaleFactor?: number) {
  // using y = mx + b
  // m is SLOPE
  // b is Intercept

  const SLOPE = scaleFactor || 0.06;
  const Intercept = 1 - SLOPE * x;
  return SLOPE * point + Intercept;
}
