"use client";
import React, { useRef } from "react";
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
import { FormControl, FormField, FormItem, FormMessage } from "./form";
import { Separator } from "@radix-ui/react-separator";
import { Input } from "./input";
import { triggerByKeyGenerate } from "@/lib/form";

export interface CardStackProps {
  control: UseFormReturn<FormSchema>["control"];
}

export const defaultBreakObj = {
  away: {
    hour: -1,
    minute: -1,
  },
  back: {
    hour: -1,
    minute: -1,
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

  const cards = useRef([
    {
      id: "break.0",
      ...defaultBreakObj,
    },
  ]);

  const flipNext = () => {
    const newArray = [...breakFields.fields!]; // create a copy of the array
    newArray.unshift(newArray.pop()!); // move the last element to the front
    cards.current = newArray;
  };

  return (
    <div className="relative h-96 w-full">
      {cards.current.map((_, index) => {
        const key = "break." + index;
        return (
          <Card
            id={key}
            index={index}
            totalCards={cards.current.length}
            key={key}
          >
            <div className="border-2 border-slate-300 rounded-lg p-5 ">
              <Label className="text-xl">Away</Label>
              <div className="flex gap-x-5 ">
                <FormField
                  control={control}
                  name={`afkBreak.${index}.away.hour`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="hour" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`afkBreak.${index}.away.minute`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="minutes"
                          className="grow"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Separator />
              <Label className="text-xl">Back</Label>
              <div className="flex gap-x-5 ">
                <FormField
                  control={control}
                  name={`afkBreak.${index}.back.hour`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} placeholder="hour" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`afkBreak.${index}.back.minute`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="minutes"
                          className="grow"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex gap-x-3">
              <Button
                type="button"
                className="grow"
                onClick={() => {
                  breakFields.append(defaultBreakObj);
                  triggerByKey(`afkBreak[${index}]`);
                  flipNext();
                }}
              >
                Next
              </Button>
              {index > 0 && (
                <Button
                  className="grow"
                  onClick={() => breakFields.remove(index)}
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
  const SCALE_FACTOR = scaleFactor || 0.06;
  return (
    <motion.div
      key={id}
      className="absolute dark:bg-black bg-white h-80 w-full rounded-3xl p-4 shadow-xl border border-neutral-200 dark:border-white/[0.1]  shadow-black/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
      style={{
        transformOrigin: "top center",
      }}
      animate={{
        top: index * CARD_OFFSET,
        // FIXME: fix animation scale for cards
        scale: 1 - (index / totalCards) * SCALE_FACTOR,
        zIndex: totalCards + index, //  decrease z-index for the cards that are behind
      }}
    >
      {children}
    </motion.div>
  );
};
